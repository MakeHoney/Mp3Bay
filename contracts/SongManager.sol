pragma solidity ^0.4.23;

import "./libraries/SongLib.sol";
import "./Manager.sol";

contract SongManager is Manager {

    event NewSong(uint songId, string title);

    SongLib.Song[] public songs;
    SongLib.Song[] public listenerSongList;
    mapping (address => uint) public listenerAccountToSongCount;

    mapping (uint => address) public songIdToArtistAccount;
    mapping (address => uint) public artistAccountToSongCount;


    modifier onlyArtist(address _artistAccount) {
        require(accountToArtistAddr[_artistAccount] != 0, "msg.sender isn't artist!");
        _;
    }

    modifier onlyListener(address _listenerAccount) {
        require(accountToListenerAddr[_listenerAccount] != 0, "msg.sender isn't listener!");
        _;
    }

    // TODO: memory <-> storage
    //       view / pure / external / internal

    function registerSong(address _ipfsHash, string _title) public onlyArtist(msg.sender) {
        // create a song
        Artist artist = Artist(accountToArtistAddr[msg.sender]);
        string memory artistName = artist.getArtistName();
        SongLib.Song memory song = SongLib.Song(_ipfsHash, artistName, _title);
        uint id = songs.push(song) - 1;

        // add song into artist' song list.
        songIdToArtistAccount[id] = msg.sender;
        artistAccountToSongCount[msg.sender]++;

        emit NewSong(id, _title);
    }

    function buySong(uint _id) public payable onlyListener(msg.sender) {
        // pay for music
        require(msg.value == 1 ether, "not enough or too much ether to buy a song!");
        address artistAccount = songIdToArtistAccount[_id];
        artistAccount.transfer(msg.value);

        // add song into listener' song list.
        // 같은 음악이 들어올 경우 예외처리 필요
        // 배열사용하지 말고 mapping으로 다시 짜기
        listenerSongList[listenerAccountToSongCount[msg.sender]++] = songs[_id];
    }

    // function getSongIdsByArtistId(uint _idx) public view returns (uint[]) {
    //     string memory name = getArtistNameByIndex(_idx);
    //     address artistAccount = artistNameToArtistAccount[name];
    //     uint[] memory songIds = new uint[](artistAccountToSongCount[artistAccount]);
    //     uint count = 0;

    //     for(uint i = 0; i < songs.length; i++) {
    //         if(songIdToArtistAccount[i] == artistAccount) {
    //             songIds[count++] = i;
    //         }
    //     }
    //     return songIds;
    // }

    function getSongIdsByArtistName(string _name) public view returns (uint[]) {
        address artistAccount = artistNameToArtistAccount[_name];
        uint[] memory songIds = new uint[](artistAccountToSongCount[artistAccount]);
        uint count = 0;

        for(uint i = 0; i < songs.length; i++) {
            if(songIdToArtistAccount[i] == artistAccount) {
                songIds[count++] = i;
            }
        }
        return songIds;
    }

    // 위에 songs 구조체 배열로도 동일 정보를 얻을 수 있음 (대신 메소드 사용할 시 원하는 정보만 return 가능)
    // 필요한 메소드인지 다시 생각
    function getSongBySongId(uint songId) public view returns (
        string,
        string
    ) {
        return (songs[songId].artistName, songs[songId].title);
    }
}