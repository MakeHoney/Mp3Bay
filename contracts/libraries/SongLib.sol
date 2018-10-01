pragma solidity ^0.4.23;

library SongLib {
    struct Song {
        address ipfsHash;
        string artistName;
        string title;
        // price;
    }
}