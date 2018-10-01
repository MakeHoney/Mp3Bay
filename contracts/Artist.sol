pragma solidity ^0.4.23;

contract Artist {
    address etherAccount;
    string name;

    constructor (address _etherAccount, string _name) public {
        etherAccount = _etherAccount;
        name = _name;
    }

    function getArtistName() public view returns (string) {
        return name;
    }
}