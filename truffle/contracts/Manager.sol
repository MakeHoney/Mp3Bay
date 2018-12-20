pragma solidity ^0.4.23;

import "./Ownable.sol";
import "./Artist.sol";
import "./Listener.sol";
import "./SongLib.sol";
import "./BayToken.sol";

contract Manager is Ownable {
    event ListenerCreated(address listenerAccount, address listenerAddr, string name);
    event ArtistCreated(uint indexed artistID, string name, string userInfoHash, address artistAccount, address artistAddr);

    mapping (address => address) public accountToArtistAddr;
    mapping (address => address) public accountToListenerAddr;
    mapping (string => address) artistNameToArtistAccount;

    address[] public allArtistsAddrs;

    constructor(address _tokenAddr) public payable {
        setTokenAddr(_tokenAddr);
        owner = getOwner();
    }

    BayToken public tokenAddr;
    address internal owner;

    function setTokenAddr(address _tokenAddr) public onlyOwner {
        tokenAddr = BayToken(_tokenAddr);
    }

    function sellToken(uint token) public payable {
        uint value = token;
        for(uint i = 0; i < 14; i++) {
            value = value * 10;
        }
        msg.sender.transfer(token);
        tokenAddr.transferFrom(msg.sender, owner, token);
    }

    function buyToken() public payable {
        require(msg.value > 0);
        uint token = msg.value;
        owner.transfer(msg.value);
        for(uint i = 0; i < 14; i++) {
            token = token / 10;
        }
        tokenAddr.transferFrom(owner, msg.sender, token);
    }

    function balanceOf() public view returns (uint256) {
        return tokenAddr.balanceOf(msg.sender);
    }

    // Artist
    // TODO: addressing exception for same name of user
    function registerArtist(string _name, string userInfoHash) external {
        accountToArtistAddr[msg.sender] = new Artist(_name, allArtistsAddrs.length);
        allArtistsAddrs.push(accountToArtistAddr[msg.sender]);
        artistNameToArtistAccount[_name] = msg.sender;
        emit ArtistCreated(allArtistsAddrs.length - 1, _name, userInfoHash, msg.sender, accountToArtistAddr[msg.sender]);
    }

    function getArtistByAcc(address _acc) public view returns (
        string name,
        uint id
    ) {
        address artistAddr = accountToArtistAddr[_acc];
        Artist artist = Artist(artistAddr);
        return (artist.getName(), artist.getID());
    }

    function getAllArtistsAddrs() public view returns (address[]) {
        return allArtistsAddrs;
    }

    function getArtistNameByIndex(uint _idx) public view returns (string) {
        return Artist(allArtistsAddrs[_idx]).getName();
    }

    // Listener
    function registerListener(string _name) external {
        accountToListenerAddr[msg.sender] = new Listener(_name);
        emit ListenerCreated(msg.sender, accountToListenerAddr[msg.sender], _name);
    }

    function getListenerByAcc(address _acc) public view returns (
        string name
    ) {
        address listenerAddr = accountToListenerAddr[_acc];
        Listener listener = Listener(listenerAddr);
        return listener.getName();
    }
}
