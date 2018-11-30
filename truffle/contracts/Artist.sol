pragma solidity ^0.4.23;

import "./Ownable.sol";

contract Artist is Ownable {
    string name;
    uint id;

    constructor (string _name, uint _id) public payable {
        name = _name;
        id = _id;
    }

    function getName() public view returns (string) {
        return name;
    }

    function getID() public view returns (uint) {
        return id;
    }

    function withdraw() external onlyOwner {
        address _contract = this;
        address owner = getOwner();
        owner.transfer(_contract.balance);
    }

    function checkBalance() external view onlyOwner returns (uint) {
        address _contract = this;
        return _contract.balance;
    }
}
