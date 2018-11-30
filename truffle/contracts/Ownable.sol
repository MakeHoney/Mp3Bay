pragma solidity ^0.4.23;

contract Ownable {
    address private owner;
    constructor() public payable {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Permission denied.");
        _;
    }

    function getOwner() internal view onlyOwner returns (address) {
        return owner;
    }
}
