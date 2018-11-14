pragma solidity ^0.4.23;

import "./libraries/SongLib.sol";
import "./Manager.sol";

/*
    TODO: memory <-> storage
    view / pure / external / internal

*/

contract SongManager is Manager {

    event SongCreated(uint songID, string title, address ipfsHash);

    SongLib.Song[] public songs;

    mapping (address => SongLib.MapSong) listenerAccountToSongs;
    mapping (address => uint) public listenerAccountToSongCount;
    mapping (uint => address) public songIDToArtistAccount;
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

    function registerSong(string _title, address _ipfsHash) public onlyArtist(msg.sender) {
        // 이미 존재하는 곡 exception handling
        Artist artist = Artist(accountToArtistAddr[msg.sender]);
        SongLib.Song memory song = SongLib.Song(artist.getName(), _title, artist.getID());
        uint id = songs.push(song) - 1;

        // add song into artist' song list.
        songIDToArtistAccount[id] = msg.sender;
        artistAccountToSongCount[msg.sender]++;

        emit SongCreated(id, _title, _ipfsHash);
    }

    function buySong(uint _id) public payable onlyListener(msg.sender) {
        // pay for music
        require(listenerAccountToSongs[msg.sender].songIDToSong[_id].artistID == 0, "the song already exsits!");
        require(msg.value == 1 ether, "not enough or too much ether to buy a song!");
        address artistAccount = songIDToArtistAccount[_id];
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
        listenerAccountToSongs[msg.sender].songIDToSong[_id] = songs[_id];
        listenerAccountToSongCount[msg.sender]++;
    }

    // is this needed?
    function getSongIDsByArtistID(uint _idx) public view returns (uint[]) {
        string memory name = getArtistNameByIndex(_idx);
        address artistAccount = artistNameToArtistAccount[name];
        uint[] memory songIDs = new uint[](artistAccountToSongCount[artistAccount]);
        uint count = 0;

        for(uint i = 0; i < songs.length; i++) {
            if(songIDToArtistAccount[i] == artistAccount) {
                songIDs[count++] = i;
            }
        }
        return songIDs;
    }

    function getSongIDsByArtistName(string _name) public view returns (uint[]) {
        address artistAccount = artistNameToArtistAccount[_name];
        uint[] memory songIDs = new uint[](artistAccountToSongCount[artistAccount]);
        uint count = 0;

        for(uint i = 0; i < songs.length; i++) {
            if(songIDToArtistAccount[i] == artistAccount) {
                songIDs[count++] = i;
            }
        }
        return songIDs;
    }

    // 필요한 메소드인지 다시 생각
    function getSongBySongID(uint songID) public view returns (
        string,
        uint,
        string
    ) {
        return (songs[songID].artistName, songs[songID].artistID, songs[songID].title);
    }

    // fallback
    function() public payable {
        revert();
    }
}
