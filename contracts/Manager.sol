pragma solidity ^0.4.23;

import "./Ownable.sol";
import "./Artist.sol";
import "./Listener.sol";
import "./libraries/SongLib.sol";

contract Manager is Ownable {
    mapping (address => address) public accountToArtistAddr;
    mapping (address => address) public accountToListenerAddr;
    mapping (string => address) artistNameToArtistAccount;

    address[] public allArtistsAddrs;

    // TODO: addressing exception for same name of user
    function registerArtist(string _name) external {
        accountToArtistAddr[msg.sender] = new Artist(msg.sender, _name);
        allArtistsAddrs.push(accountToArtistAddr[msg.sender]);
        artistNameToArtistAccount[_name] = msg.sender;
    }

    function registerListener(string _name) external {
        accountToListenerAddr[msg.sender] = new Listener(msg.sender, _name);
    }

    // artist -> artists
    function getAllArtistAddrs() public view returns (address[]) {
        return allArtistsAddrs;
    }

    function getArtistNameByIndex(uint _idx) public view returns (string) {
        return Artist(allArtistsAddrs[_idx]).getArtistName();
    }
}