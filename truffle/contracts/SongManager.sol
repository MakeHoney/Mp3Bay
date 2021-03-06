pragma solidity ^0.4.23;

import "./SongLib.sol";
import "./Manager.sol";
import "./BayToken.sol";

/*
    TODO: memory <-> storage
    TODO: Addr이 필요한 프로퍼티인지 다시 생각해보고 리팩토링(삭제)
*/

contract SongManager is Manager {

    event SongCreated(uint indexed songID, string title, string ipfsHash);
    event SongSelling(uint indexed songID, address indexed artistAcc);

    SongLib.Song[] public songs;

    // Last uint represents state of songs
    // 0: unowned song
    // 1: owned song
    // 2: song posted on flee market
    mapping (address => mapping(uint => int256)) public listenerAccToSongs;

    mapping (address => uint) public listenerAccountToSongCount;
    mapping (address => uint) public listenerAccountToPostedSongCount;
    mapping (uint => address) public songIDToArtistAccount;
    mapping (address => uint) public artistAccountToSongCount;

    constructor(address _tokenAddr) Manager(_tokenAddr) public {}

    modifier onlyArtist(address _artistAccount) {
        require(accountToArtistAddr[_artistAccount] != 0, "msg.sender isn't artist!");
        _;
    }

    modifier onlyListener(address _listenerAccount) {
        require(accountToListenerAddr[_listenerAccount] != 0, "msg.sender isn't listener!");
        _;
    }

    function registerSong(string _title, string _ipfsHash) public onlyArtist(msg.sender) {
        // 이미 존재하는 곡 exception handling
        uint id = songs.length;
        Artist artist = Artist(accountToArtistAddr[msg.sender]);
        SongLib.Song memory song = SongLib.Song(id, artist.getName(), _title, artist.getID());
        songs.push(song);

        // add song into artist' song list.
        songIDToArtistAccount[id] = msg.sender;
        artistAccountToSongCount[msg.sender]++;

        // Offer token as rewards
        tokenAddr.transferFrom(owner, msg.sender, 10);

        emit SongCreated(id, _title, _ipfsHash);
    }

    function buySong(uint _id) public payable onlyListener(msg.sender) {
        // pay for music

        // wrong condition sentence (id == 100) need to be changed
        // require(listenerAccToSongs[msg.sender].songIDToSong[_id].id == 100, "the song already exsits!");
        // require(msg.value == 1 ether, "not enough or too much ether to buy a song!");
        address artistAccount = songIDToArtistAccount[_id];

        // Pay 100 token to artist
        tokenAddr.transferFrom(msg.sender, artistAccount, 100);

        // add song into listener' song list.
        listenerAccToSongs[msg.sender][_id] = 1;
        listenerAccountToSongCount[msg.sender]++;
    }

    function buySongFromFM (address seller, uint songID) public onlyListener(msg.sender) {
        require(listenerAccToSongs[seller][songID] == 2);
        require(listenerAccToSongs[msg.sender][songID] == 0);
        address artist = songIDToArtistAccount[songID];

        tokenAddr.transferFrom(msg.sender, seller, 20);
        tokenAddr.transferFrom(msg.sender, artist, 20);
        tokenAddr.transferFrom(msg.sender, owner, 10);

        listenerAccToSongs[seller][songID] = 0;
        listenerAccToSongs[msg.sender][songID] = 1;
        listenerAccountToSongCount[msg.sender]++;
        listenerAccountToPostedSongCount[seller]--;
    }

    function postingSongOnFM(uint songID) public onlyListener(msg.sender) {
        require(listenerAccToSongs[msg.sender][songID] == 1);
        listenerAccToSongs[msg.sender][songID] = 2;

        listenerAccountToSongCount[msg.sender]--;
        listenerAccountToPostedSongCount[msg.sender]++;
    }

    function removePosting(uint songID) public onlyListener(msg.sender) {
        require(listenerAccToSongs[msg.sender][songID] == 2);
        listenerAccToSongs[msg.sender][songID] = 1;

        listenerAccountToSongCount[msg.sender]++;
        listenerAccountToPostedSongCount[msg.sender]--;
    }

    // is this needed?
    // TODO: idx -> name -> acc를 idx -> acc로 개선하기
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

    function getSongIDsByListenerAcc(address listener, string memory str) public view returns (int256[]) {
        int256[] memory songIDs;
        int256 flag;
        uint count = 0;
        bytes memory conStr = bytes(str);
        if (keccak256(conStr) == keccak256("owned")) {
            songIDs = new int256[](listenerAccountToSongCount[listener]);
            flag = 1;
        } else if (keccak256(conStr) == keccak256("posted")) {
            songIDs = new int256[](listenerAccountToPostedSongCount[listener]);
            flag = 2;
        } else flag = 3;

        for(uint i = 0; i < songs.length; i++) {
            if(listenerAccToSongs[listener][i] == flag) {
                songIDs[count++] = int256(i);
            }
        }
        return songIDs;
    }

    // 필요한 메소드인지 다시 생각
    function getSongBySongID(uint songID) public view returns (
        string artistName,
        uint artistID,
        string title
    ) {
        return (songs[songID].artistName, songs[songID].artistID, songs[songID].title);
    }

    // fallback
    function() public payable {
        revert();
    }
}
