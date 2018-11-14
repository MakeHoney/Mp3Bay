pragma solidity ^0.4.23;

library SongLib {
    struct Song {
        string artistName;
        string title;
        uint artistID;
        // uint price;
    }

    struct MapSong {
        mapping (uint => Song) songIDToSong;
    }
}
