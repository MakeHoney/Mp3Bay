pragma solidity ^0.4.23;

import "./Ownable.sol";
import "./Artist.sol";
import "./Listener.sol";
import "./libraries/SongLib.sol";

contract Manager is Ownable {
    mapping (address => address) public accountToArtistAddr;
    mapping (address => address) public accountToListenerAddr;
    mapping (string => address) artistNameToArtistAccount;

    address[] public allArtistsAddrs;

    // TODO: addressing exception for same name of user
    function registerArtist(string _name) external {
        // add account -> addr mapping
        accountToArtistAddr[msg.sender] = new Artist(msg.sender, _name);
        // artist address 배열에 추가
        allArtistsAddrs.push(accountToArtistAddr[msg.sender]);
        // add name -> account mapping
        artistNameToArtistAccount[_name] = msg.sender;
    }

    function registerListener(string _name) external {
        accountToListenerAddr[msg.sender] = new Listener(msg.sender, _name);
    }

    // 두 함수로 외부에서 반복문 돌며 string 차례로 반환
    // promise all ?
    // 외부에 배열 길이를 넘겨주기위한 메소드
    function getNumberOfArtist() public view returns (uint) {
        return allArtistsAddrs.length;
    }

    function getArtistNameByIndex(uint _idx) public view returns (string) {
        return Artist(allArtistsAddrs[_idx]).getArtistName();
    }

    // 두 함수로 외부에서 반복문 돌며 string 차례로 반환
    // artist name들을 얻은 후 Song manager의 getSongIdsByArtistName 사용
}