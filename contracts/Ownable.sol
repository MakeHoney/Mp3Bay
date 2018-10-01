pragma solidity ^0.4.23;

contract Ownable {
    address owner;
    constructor() public payable {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Permission denied.");
        _;
    }
}