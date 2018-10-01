pragma solidity ^0.4.23;

import "./Artist.sol";
import "./Listener.sol";

contract Manager {
    mapping (address => address) accountToArtistAddr;
    mapping (address => address) accountToListenerAddr;

    function registerArtist(string _name) internal {
        accountToArtistAddr[msg.sender] = new Artist(msg.sender, _name);
    }

    function registerListener(string _name) internal {
        accountToListenerAddr[msg.sender] = new Listener(msg.sender, _name);
    }
}