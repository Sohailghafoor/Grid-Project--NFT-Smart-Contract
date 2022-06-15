//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Base64.sol";

////////////////////////////////////////////////////////////
//              My NFT Contract
contract NFTmy is ERC721, ERC721Enumerable, Ownable, Pausable, ERC721URIStorage{
    
    using Counters for Counters.Counter ;
    Counters.Counter private _tokenIdCounter ;
    Counters.Counter private _box;

    uint256 public mintPrice;
   // uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    uint256 public max_box_Small;
    uint256 public max_box_Medium;
    uint256 public max_box_Large;
    uint256 public max_box_Ultra;
    uint256 public max_box_Mega;
    uint256 public number_of_Reserved;

    bool public isPublicMintEnabled = true;

    string internal baseTokenUri;

    address payable public withdrawWallet;

   // mapping(string => bool) private takenNames;
    mapping(uint256 => Attr) public attributes;
    //mapping(address => uint256) public walletMints;
    mapping(address => MintTypes) public addressToMints;
    mapping(uint => string) private ipfsURLs;
    mapping(uint256 => boxSize) box;
    uint256[] private boxs ;

// for MetaData Frozen
	bool public metadataIsFrozen = false;

struct MintTypes {
		uint256 _numberOfAuthorMintsByAddress;
		uint256 _numberOfMintsByAddress;
	}

struct boxSize {
        uint256 boxID;
        uint256 right;
        uint256 left;
        uint256 top;
        uint256 bottom;
}
struct Attr {
      // uint256 boxID_;
        string name;
        string description;
     //   string externallink;
        string uri; 
        string image;
}


   
    constructor() payable ERC721('MyNFT Collection', 'RP'){

        mintPrice = 0.00002 ether;
      //  totalSupply = 0;
        maxSupply = 300;
        maxPerWallet = 3;
        number_of_Reserved = 0;
        max_box_Small = 0;
        max_box_Medium = 0;
        max_box_Large = 0;
        max_box_Ultra = 0;
        max_box_Mega = 0;
        //set withdraw wallet address
    }

 function boxSizes(uint256 boxID, uint256  right, uint256  left, uint256  top, uint256  bottom) private {
    require(
            addressToMints[msg.sender]._numberOfMintsByAddress <=
			maxPerWallet,   
            'Exceeds maximum allowable mints'
		);   
        _box.increment();
        boxSize storage newBox = box[_box.current()];
        newBox.boxID = boxID;
        newBox.right = right;
        newBox.left = left;
        newBox.top = top;
        newBox.bottom = bottom;
        boxs.push(_box.current());
        
    }
    
    function getBoxSizes(uint256 id) public view returns (uint256 , uint256 , uint256 , 
                                                    uint256 , uint256 ){
        boxSize storage s = box[id];
        return (s.boxID, s.right, s.left, s.top, s.bottom);
    }

      //// for box Size and limit Read function uint256 count,
    function countBox(uint256 _small, uint256 _medium, uint256 _large, uint256 _ultra, uint256 _mega) public payable returns (uint256 count, uint256 small, uint256 medium, uint256 large, uint256 ultra, uint256 mega){   
    require(_small + _medium + _large + _ultra + _mega <=3, 'Exceeds Maximum Miniting Limit total You Can Minit Just 3 !');
    require(_small + max_box_Small <=100,'Exceeds maximum SMALL allowable mints');   
    require(_medium + max_box_Medium <=80,'Exceeds maximum MEDIUM allowable mints');   
    require(_large + max_box_Large <=60,'Exceeds maximum LARGE allowable mints');   
    require(_ultra + max_box_Ultra <=10,'Exceeds maximum ULTRA allowable mints');   
    require(_mega + max_box_Mega <=40,'Exceeds maximum MEGA allowable mints');   
    small = _small;
    medium = _medium;
    large = _large;
    ultra = _ultra;
    mega = _mega;
    count = _small + _medium + _large + _ultra + _mega;
  //  mintNFT(count,_small, _medium, _large, _ultra, _mega); //call mint function
    return (count,small, medium, large, ultra, mega);
    
   }
//set MetaFreez
	function freezeMetadata() external onlyOwner {  
		require(!metadataIsFrozen, 'Metadata is already frozen');
		metadataIsFrozen = true;
	}


//swt Mint Enabled
    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;

    }
    //baseURI
     function _baseURI() internal pure override returns (string memory) {
        return "www.my-site.com/";
    }
    
  
   
    // for minting NFT````````                              
    
    function mintNFT(uint256 count, uint256 small, uint256 medium, uint256 large, uint256 ultra, uint256 mega) public payable {
        require(isPublicMintEnabled, 'minting not enabled');
        require(
			count + addressToMints[msg.sender]._numberOfMintsByAddress <=
				maxPerWallet,
			'Exceeds maximum allowable mints'
		);   
		addressToMints[msg.sender]._numberOfMintsByAddress += count;

        //for checking Sum of these Box Are Less then Max Supply


        //require(walletMints[msg.sender] + count <= maxPerWallet, 'Exceed Max Wallet Mint Limit!');
        for (uint256 i = 0; i <count; i++) {
            _tokenIdCounter.increment();
            uint256 id = _tokenIdCounter.current();             
            assert(id > max_box_Small + max_box_Medium + max_box_Large + max_box_Ultra + max_box_Mega + number_of_Reserved &&
				id <= maxSupply);
                _safeMint(msg.sender, id);
              _setTokenURI(id,ipfsURLs[id]);
        }
        	  
         if( small > 0 && small < 2){
            max_box_Small += 1;
        }else if (small > 1 && small < 3)
        {
             max_box_Small += 1;
             max_box_Small += 1;
        }else if (small == 3){
            max_box_Small += 1;
             max_box_Small += 1;
             max_box_Small += 1;
        }
         if( medium > 0 && medium < 2){
            max_box_Medium += 1;
        }else if (medium > 1 && medium < 3)
        {
             max_box_Medium += 1;
             max_box_Medium += 1;
        }else if (medium == 3){
            max_box_Medium += 1;
             max_box_Medium += 1;
             max_box_Medium += 1;
        } if( large > 0 && large < 2){
            max_box_Large += 1;
        }else if (large > 1 && large < 3)
        {
             max_box_Large += 1;
             max_box_Large += 1;
        }else if (large == 3){
            max_box_Large += 1;
             max_box_Large += 1;
             max_box_Large += 1;
        } 
        if( ultra > 0 && ultra < 2){
            max_box_Ultra += 1;
        }else if (ultra > 1 && ultra < 3)
        {
             max_box_Ultra += 1;
             max_box_Ultra += 1;
        }else if (ultra == 3){
            max_box_Ultra += 1;
             max_box_Ultra += 1;
             max_box_Ultra += 1;
        } 
        if( mega > 0 && mega < 2){
            max_box_Mega += 1;
        }else if (mega > 1 && mega < 3)
        {
             max_box_Mega += 1;
             max_box_Mega += 1;
        }else if (mega == 3){
            max_box_Mega += 1;
             max_box_Mega += 1;
             max_box_Mega += 1;
        }

    }   /// For MetaData json full string
     
  //set UPDATE URI With Image and other name etc
     function UpdateNewURI(string memory newURIupdate, uint256 id, string memory name, string memory description, string memory externallink) public {
        require(!metadataIsFrozen, 'Metadata is permanently frozen');
        require(_exists(id), 'Token does not exit!');
        name = name;
        description = description;
    string memory uri = newURIupdate;
    string memory image = externallink;
        attributes[id] = Attr(name, description, uri, image);
        _setTokenURI(id,newURIupdate);
        
    }
//tokenURI

///
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // // The following functions are overrides required by Solidity.


    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
           //                     for metadta json file store on calling tokenURI
        
                     
function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        string memory json = Base64.encode(
            bytes(string(
                abi.encodePacked(
                    '{"name": "', attributes[tokenId].name, '",',
                   // '"image-data": "', getSvg(tokenId), '",',
                    '"attributes": [{"trait_type": "description", "value": ', (attributes[tokenId].description), '},',
                    '{"trait_type": "image", "value": ', (attributes[tokenId].image), '},',
               //     '{"trait_type": "boxID", "value": ', (attributes[tokenId].boxID_), '},',
                    '{"trait_type": "uri", "value": ', (attributes[tokenId].uri), '},'
                    ']}'
                )
            ))
        );
        return string(abi.encodePacked('data:application/json;base64,', json));

    }

            // for testing metadata json comment tokenURI function               //////////  
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
      function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'withdraw failed');
    }


    }
