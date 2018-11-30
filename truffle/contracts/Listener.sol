pragma solidity ^0.4.23;

import "./Ownable.sol";

contract Listener is Ownable {
    string name;

    constructor (string _name) public payable {
        name = _name;
    }

    function getName() public view returns (string) {
        return name;
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
