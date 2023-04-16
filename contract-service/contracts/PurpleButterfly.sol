// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./PurpleButterflyToken.sol";

/// @custom:security-contact laviniascmelo@gmail.com
contract PurpleButterfly is ERC721, ERC721Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    using ECDSA for bytes32;

    PurpleButterflyToken private _pbftk;

    constructor() ERC721("PurpleButterfly", "PBFLY") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
    }

    function getTokenAddress() public view returns (address) {
        return address(_pbftk);
    }

    function setTokenAddress(
        address tokenAddress
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pbftk = PurpleButterflyToken(tokenAddress);
    }

    mapping(uint256 => Post) public posts;
    mapping(uint256 => uint256) public likes;

    struct Post {
        string content;
        address author;
        uint256 parent;
    }

    event PostMinted(uint256 tokenId, address owner, string content);
    event PostLiked(uint256 indexed tokenId, address indexed liker);
    event CommentMinted(uint256 tokenId, address owner, string content, uint256 parent);
    event Log(bytes32 message);

    function mintPost(
        string memory content,
        bytes memory signature,
        bytes32 messageHash,
        uint256 tokenId
    ) public payable {
        require(!_exists(tokenId), "Token already minted");
        
        require(
            _pbftk.balanceOf(_msgSender()) >= 1 ether,
            "Not enough tokens to MINT"
        );
        
        require(!verifySignature(tokenId, messageHash, signature), "Invalid signature");
        _pbftk.chargeUser(_msgSender(), address(_pbftk), 1 ether);
        _mint(msg.sender, tokenId);


        posts[tokenId] = Post(content, _msgSender(), 0);
        likes[tokenId] = 0;

        emit PostMinted(tokenId, _msgSender(), content);
    }

    function createHash(uint256 tokenId) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(tokenId));
    }

    function verifySignature(
        uint256 tokenId,
        bytes32 messageHash,
        bytes memory signature
    ) public view returns (bool) {
        

        require(!_exists(tokenId), "Token ID already exists");
        bytes32 newMessageHash = createHash(tokenId);

        require(newMessageHash == messageHash, "Message hash does not match");

        address owner = address(this);
        address signer = messageHash.toEthSignedMessageHash().recover(
            signature
        );

        return signer == owner;
    }

    function likePost(uint256 tokenId) public {
        require(_exists(tokenId), "Invalid token");
        require(_msgSender() != ownerOf(tokenId), "Can't like own content");
        require(
            _pbftk.balanceOf(_msgSender()) > 0,
            "Not enough tokens to give a like"
        );

        address contentOwner = ownerOf(tokenId);
        _pbftk.chargeUser(_msgSender(), contentOwner, 1 ether);
        likes[tokenId] = likes[tokenId] + 1;
        emit PostLiked(tokenId, _msgSender());
    }

    function mintComment(
        string memory content,
        bytes memory signature,
        bytes32 messageHash,
        uint256 tokenId,
        uint256 parentTokenId
    ) public payable {
        require(!_exists(tokenId), "Token already minted");
        
        require(
            _pbftk.balanceOf(_msgSender()) >= 1 ether,
            "Not enough tokens to MINT"
        );
        
        require(!verifySignature(tokenId, messageHash, signature), "Invalid signature");
        _pbftk.chargeUser(_msgSender(), address(_pbftk), 1 ether);
        _mint(msg.sender, tokenId);


        posts[tokenId] = Post(content, _msgSender(), parentTokenId);
        likes[tokenId] = 0;

        emit CommentMinted(tokenId, _msgSender(), content, parentTokenId);
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
