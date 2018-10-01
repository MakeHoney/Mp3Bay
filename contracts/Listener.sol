pragma solidity ^0.4.23;

contract Listener {
    address etherAccount;
    string name;

    constructor (address _etherAccount, string _name) public {
        etherAccount = _etherAccount;
        name = _name;
    }
}