pragma solidity ^0.4.23;

import "./libraries/SongLib.sol";
import "./Manager.sol";

    /* 
        TODO: memory <-> storage
        view / pure / external / internal

    */
    
contract SongManager is Manager {

    event NewSong(uint songId, string title);

    SongLib.Song[] public songs;

    mapping (address => SongLib.MapSong) listenerAccountToSongs;
    mapping (address => uint) public listenerAccountToSongCount;    
    mapping (uint => address) public songIdToArtistAccount;
    mapping (address => uint) public artistAccountToSongCount;

    constructor() public payable {}

    modifier onlyArtist(address _artistAccount) {
        require(accountToArtistAddr[_artistAccount] != 0, "msg.sender isn't artist!");
        _;
    }

    modifier onlyListener(address _listenerAccount) {
        require(accountToListenerAddr[_listenerAccount] != 0, "msg.sender isn't listener!");
        _;
    }
    
    function registerSong(address _ipfsHash, string _title) public onlyArtist(msg.sender) {
        // create a song
        // 이미 존재하는 곡 exception handling
        Artist artist = Artist(accountToArtistAddr[msg.sender]);
        SongLib.Song memory song = SongLib.Song(_ipfsHash, artist.getArtistName(), _title, artist.getID());
        uint id = songs.push(song) - 1;

        // add song into artist' song list.
        songIdToArtistAccount[id] = msg.sender;
        artistAccountToSongCount[msg.sender]++;

        emit NewSong(id, _title);
    }

    function buySong(uint _id) public payable onlyListener(msg.sender) {
        // pay for music
        require(listenerAccountToSongs[msg.sender].songIdToSong[_id].ipfsHash == 0, "the song already exsits!");
        require(msg.value == 1 ether, "not enough or too much ether to buy a song!");
        address artistAccount = songIdToArtistAccount[_id];
        artistAccount.transfer(msg.value);

        
        /*  error : The constructor should be payable if you send value.

        address _contract = this;
        uint fee = 10;
        uint toArtist = msg.value * (100 - fee) / 10;
        uint toPlatform = msg.value - toArtist;

        artistAccount.transfer(toArtist);
        _contract.transfer(toPlatform);
        */

        // add song into listener' song list.
        listenerAccountToSongs[msg.sender].songIdToSong[_id] = songs[_id];
        listenerAccountToSongCount[msg.sender]++;
    }

    // is this needed?
    function getSongIdsByArtistId(uint _idx) public view returns (uint[]) {
        string memory name = getArtistNameByIndex(_idx);
        address artistAccount = artistNameToArtistAccount[name];
        uint[] memory songIds = new uint[](artistAccountToSongCount[artistAccount]);
        uint count = 0;

        for(uint i = 0; i < songs.length; i++) {
            if(songIdToArtistAccount[i] == artistAccount) {
                songIds[count++] = i;
            }
        }
        return songIds;
    }

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

    // 필요한 메소드인지 다시 생각
    function getSongBySongId(uint songId) public view returns (
        string,
        string
    ) {
        return (songs[songId].artistName, songs[songId].title);
    }

    // fallback
    function() public payable {
        revert();
    }
}