pragma solidity ^0.4.23;

import "./Ownable.sol";
import "./Artist.sol";
import "./Listener.sol";
import "./SongLib.sol";

contract Manager is Ownable {
    event ListenerCreated(address listenerAccount, address listenerAddr, string name);
    event ArtistCreated(address artistAccount, address artistAddr, string name, uint indexed artistID, string pictureHash);

    mapping (address => address) public accountToArtistAddr;
    mapping (address => address) public accountToListenerAddr;
    mapping (string => address) artistNameToArtistAccount;

    address[] public allArtistsAddrs;

    // Artist
    // TODO: addressing exception for same name of user
    function registerArtist(string _name) external {
        accountToArtistAddr[msg.sender] = new Artist(_name, allArtistsAddrs.length);
        allArtistsAddrs.push(accountToArtistAddr[msg.sender]);
        artistNameToArtistAccount[_name] = msg.sender;
        emit ArtistCreated(msg.sender, accountToArtistAddr[msg.sender], _name);
    }

    function getArtistByAcc(address _acc) public view returns (
        string name,
        uint id
    ) {
        address artistAddr = accountToArtistAddr[_acc];
        Artist artist = Artist(artistAddr);
        return (artist.getName(), artist.getID());
    }

    function getAllArtistsAddrs() public view returns (address[]) {
        return allArtistsAddrs;
    }

    function getArtistNameByIndex(uint _idx) public view returns (string) {
        return Artist(allArtistsAddrs[_idx]).getName();
    }

    // Listener
    function registerListener(string _name) external {
        accountToListenerAddr[msg.sender] = new Listener(_name);
        emit ListenerCreated(msg.sender, accountToListenerAddr[msg.sender], _name);
    }

    function getListenerByAcc(address _acc) public view returns (
        string name
    ) {
        address listenerAddr = accountToListenerAddr[_acc];
        Listener listener = Listener(listenerAddr);
        return listener.getName();
    }
}
