pragma solidity ^0.4.23;

contract Song {
    address artist;
    string title;

    constructor (address _artist, string _title) public {
        artist = _artist;
        title = _title;
    }
}