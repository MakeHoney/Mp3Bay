pragma solidity ^0.4.23;

import "./Manager.sol";
import "./Artist.sol";

contract SongFactory is Manager {

    event NewSong(uint songId, string title);

    struct Song {
        address ipfsHash;
        string artist;
        string title;
        // price;
    }

    Song[] public songs;

    mapping (uint => address) public songToArtist;
    mapping (address => uint) artistSongCount;
    mapping (uint => address) public songToListener;
    mapping (address => uint) listenerSongCount;

    modifier onlyArtist(address _artistAccount) {
        require(accountToArtistAddr[_artistAccount] != 0, "msg.sender isn't Artist!");
        _;
    }

    // TODO: memory <-> storage

    function registerSong(address _ipfsHash, string _title) internal onlyArtist(msg.sender) {
        Artist artist = Artist(accountToArtistAddr[msg.sender]);
        string memory artistName = artist.getArtistName();
        uint id = songs.push(Song(_ipfsHash, artistName, _title)) - 1;
        songToArtist[id] = msg.sender;
        artistSongCount[msg.sender]++;
        
        emit NewSong(id, _title);
    }
}