pragma solidity ^0.4.23;

import "./Manager.sol";
import "./Artist.sol";

contract SongManager is Manager {

    event NewSong(uint songId, string title);

    struct Song {
        address ipfsHash;
        string artistName;
        string title;
        // price;
    }

    Song[] public songs;

    mapping (uint => address) public songIdToArtistAccount;
    mapping (address => uint) public artistAccountToSongCount;
    mapping (uint => address) public songIdToListenerAccount;
    mapping (address => uint) public listenerAccountToSongCount;

    modifier onlyArtist(address _artistAccount) {
        require(accountToArtistAddr[_artistAccount] != 0, "msg.sender isn't Artist!");
        _;
    }

    // TODO: memory <-> storage
    //       view / pure / external / internal

    function registerSong(address _ipfsHash, string _title) public onlyArtist(msg.sender) {
        Artist artist = Artist(accountToArtistAddr[msg.sender]);
        string memory artistName = artist.getArtistName();
        Song memory song = Song(_ipfsHash, artistName, _title);
        uint id = songs.push(song) - 1;
        songIdToArtistAccount[id] = msg.sender;
        artistAccountToSongCount[msg.sender]++;

        emit NewSong(id, _title);
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

    // 위에 songs 구조체 배열로도 동일 정보를 얻을 수 있음 (대신 함수 사용할 시 원하는 정보만 return 가능)
    // 필요한 함수인지 다시 생각
    function getSongBySongId(uint songId) public view returns (
        string,
        string
    ) {
        return (songs[songId].artistName, songs[songId].title);
    }
}