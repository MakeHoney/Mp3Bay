pragma solidity ^0.4.23;

contract Artist {
    address etherAccount;
    string name;
    uint id;
    
    modifier onlyOwner {
        require(msg.sender == etherAccount, "Permission denied");
        _;
    }

    constructor (address _etherAccount, string _name, uint _id) public payable {
        etherAccount = _etherAccount;
        name = _name;
        id = _id;
    }

    function getArtistName() public view returns (string) {
        return name;
    }

    function getID() public view returns (uint) {
        return id;
    }

    function withdraw() public onlyOwner {
        address _contract = this;
        etherAccount.transfer(_contract.balance);
    }

    function checkBalance() public view onlyOwner returns (uint) {
        address _contract = this;
        return _contract.balance;
    }
}