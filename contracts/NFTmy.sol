//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/////////////////////////////////////////////
//                          For image encode i am using Base64
// library Base64 {
//     string internal constant TABLE_ENCODE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
//     bytes  internal constant TABLE_DECODE = hex"0000000000000000000000000000000000000000000000000000000000000000"
//                                             hex"00000000000000000000003e0000003f3435363738393a3b3c3d000000000000"
//                                             hex"00000102030405060708090a0b0c0d0e0f101112131415161718190000000000"
//                                             hex"001a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132330000000000";

//     function encode(bytes memory data) internal pure returns (string memory) {
//         if (data.length == 0) return '';

//         // load the table into memory
//         string memory table = TABLE_ENCODE;

//         // multiply by 4/3 rounded up
//         uint256 encodedLen = 4 * ((data.length + 2) / 3);

//         // add some extra buffer at the end required for the writing
//         string memory result = new string(encodedLen + 32);

//         assembly {
//             // set the actual output length
//             mstore(result, encodedLen)

//             // prepare the lookup table
//             let tablePtr := add(table, 1)

//             // input ptr
//             let dataPtr := data
//             let endPtr := add(dataPtr, mload(data))

//             // result ptr, jump over length
//             let resultPtr := add(result, 32)

//             // run over the input, 3 bytes at a time
//             for {} lt(dataPtr, endPtr) {}
//             {
//                 // read 3 bytes
//                 dataPtr := add(dataPtr, 3)
//                 let input := mload(dataPtr)

//                 // write 4 characters
//                 mstore8(resultPtr, mload(add(tablePtr, and(shr(18, input), 0x3F))))
//                 resultPtr := add(resultPtr, 1)
//                 mstore8(resultPtr, mload(add(tablePtr, and(shr(12, input), 0x3F))))
//                 resultPtr := add(resultPtr, 1)
//                 mstore8(resultPtr, mload(add(tablePtr, and(shr( 6, input), 0x3F))))
//                 resultPtr := add(resultPtr, 1)
//                 mstore8(resultPtr, mload(add(tablePtr, and(        input,  0x3F))))
//                 resultPtr := add(resultPtr, 1)
//             }

//             // padding with '='
//             switch mod(mload(data), 3)
//             case 1 { mstore(sub(resultPtr, 2), shl(240, 0x3d3d)) }
//             case 2 { mstore(sub(resultPtr, 1), shl(248, 0x3d)) }
//         }

//         return result;
//     }

//     function decode(string memory _data) internal pure returns (bytes memory) {
//         bytes memory data = bytes(_data);

//         if (data.length == 0) return new bytes(0);
//         require(data.length % 4 == 0, "invalid base64 decoder input");

//         // load the table into memory
//         bytes memory table = TABLE_DECODE;

//         // every 4 characters represent 3 bytes
//         uint256 decodedLen = (data.length / 4) * 3;

//         // add some extra buffer at the end required for the writing
//         bytes memory result = new bytes(decodedLen + 32);

//         assembly {
//             // padding with '='
//             let lastBytes := mload(add(data, mload(data)))
//             if eq(and(lastBytes, 0xFF), 0x3d) {
//                 decodedLen := sub(decodedLen, 1)
//                 if eq(and(lastBytes, 0xFFFF), 0x3d3d) {
//                     decodedLen := sub(decodedLen, 1)
//                 }
//             }

//             // set the actual output length
//             mstore(result, decodedLen)

//             // prepare the lookup table
//             let tablePtr := add(table, 1)

//             // input ptr
//             let dataPtr := data
//             let endPtr := add(dataPtr, mload(data))

//             // result ptr, jump over length
//             let resultPtr := add(result, 32)

//             // run over the input, 4 characters at a time
//             for {} lt(dataPtr, endPtr) {}
//             {
//                // read 4 characters
//                dataPtr := add(dataPtr, 4)
//                let input := mload(dataPtr)

//                // write 3 bytes
//                let output := add(
//                    add(
//                        shl(18, and(mload(add(tablePtr, and(shr(24, input), 0xFF))), 0xFF)),
//                        shl(12, and(mload(add(tablePtr, and(shr(16, input), 0xFF))), 0xFF))),
//                    add(
//                        shl( 6, and(mload(add(tablePtr, and(shr( 8, input), 0xFF))), 0xFF)),
//                                and(mload(add(tablePtr, and(        input , 0xFF))), 0xFF)
//                     )
//                 )
//                 mstore(resultPtr, shl(232, output))
//                 resultPtr := add(resultPtr, 3)
//             }
//         }

//         return result;
//     }
// }

////////////////////////////////////////////////////////////
//              My NFT Contract
contract NFTmy is ERC721, ERC721Enumerable, Ownable, Pausable, ERC721URIStorage{
    
    using Counters for Counters.Counter ;
    Counters.Counter private _tokenIdCounter ;

   // mapping(string => bool) private takenNames;
    //mapping(uint256 => Attr) public attributes;

    // struct Attr {
    //     string name;
    //     string description;
    //     uint8 boxID;
    //     uint8 external link;
    //     uint8 uri; 
    // }


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

    //mapping(address => uint256) public walletMints;
    mapping(address => MintTypes) public addressToMints;
    mapping(uint => string) private ipfsURLs;
    
// for MetaData Frozen
	bool public metadataIsFrozen = false;


     struct MintTypes {
		uint256 _numberOfAuthorMintsByAddress;
		uint256 _numberOfMintsByAddress;
	}

                        ///////////////// for metadata in tokenURI passing the Value
    // function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
    //     if (_i == 0) {
    //         return "0";
    //     }
    //     uint j = _i;
    //     uint len;
    //     while (j != 0) {
    //         len++;
    //         j /= 10;
    //     }
    //     bytes memory bstr = new bytes(len);
    //     uint k = len;
    //     while (_i != 0) {
    //         k = k-1;
    //         uint8 temp = (48 + uint8(_i - _i / 10 * 10));
    //         bytes1 b1 = bytes1(temp);
    //         bstr[k] = b1;
    //         _i /= 10;
    //     }
    //     return string(bstr);
    // }


    constructor() payable ERC721('MyNFT Collection', 'RP'){

        mintPrice = 0.002 ether;
      //  totalSupply = 0;
        maxSupply = 2000;
        maxPerWallet = 3;
        number_of_Reserved = 0;
        max_box_Small = 0;
        max_box_Medium = 0;
        max_box_Large = 0;
        max_box_Ultra = 0;
        max_box_Mega = 0;
        //set withdraw wallet address
    }
      //// for box Size and limit Read function uint256 count,
    function countBox(uint256 _small, uint256 _medium, uint256 _large, uint256 _ultra, uint256 _mega) public payable returns (uint256 count, uint256 small, uint256 medium,uint256 large, uint256 ultra, uint256 mega){   
    require(_small + _medium + _large + _ultra + _mega <=3, 'Exceeds Maximum Miniting Limit total You Can Minit Just 3 !');
    require(_small + max_box_Small <=1419,'Exceeds maximum SMALL allowable mints');   
    require(_medium + max_box_Medium <=350,'Exceeds maximum MEDIUM allowable mints');   
    require(_large + max_box_Large <=135,'Exceeds maximum LARGE allowable mints');   
    require(_ultra + max_box_Ultra <=4,'Exceeds maximum ULTRA allowable mints');   
    require(_mega + max_box_Mega <=30,'Exceeds maximum MEGA allowable mints');   
    small = _small;
    medium = _medium;
    large = _large;
    ultra = _ultra;
    mega = _mega;
    count = _small + _medium + _large + _ultra + _mega;
    mintNFT(count,_small, _medium, _large, _ultra, _mega);
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
    
    //set UPDATE URI With Image and other name etc
     function UpdateNewURI(string memory newURIupdate, uint256 id) public {
        require(!metadataIsFrozen, 'Metadata is permanently frozen');
        require(_exists(id), 'Token does not exit!');
        _setTokenURI(id,newURIupdate);
        //for metadata
 //attributes[tokenId] = Attr(_name, _desceription, _boxID, _externallink, _uri updated); pass these arrugments on calling mint

         
        
    }
    // token URI
   
   
    // for minting NFT
    function mintNFT(uint256 count, uint256 small, uint256 medium, uint256 large, uint256 ultra, uint256 mega) public payable {
        require(isPublicMintEnabled, 'minting not enabled');
      //  require(msg.value == quantity_ * mintPrice, 'wrong mint value');
       // require(totalSupply + count <= maxSupply, 'Sold Out');
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

    }

    /// For MetaData json full string
     


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
                    ///////////////////// for image read this function used
        
    // function getSvg(uint tokenId) private view returns (string memory) {
    //     string memory svg;
    //     svg = "<svg width='350px' height='350px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'> <path d='M11.55 18.46C11.3516 18.4577 11.1617 18.3789 11.02 18.24L5.32001 12.53C5.19492 12.3935 5.12553 12.2151 5.12553 12.03C5.12553 11.8449 5.19492 11.6665 5.32001 11.53L13.71 3C13.8505 2.85931 14.0412 2.78017 14.24 2.78H19.99C20.1863 2.78 20.3745 2.85796 20.5133 2.99674C20.652 3.13552 20.73 3.32374 20.73 3.52L20.8 9.2C20.8003 9.40188 20.7213 9.5958 20.58 9.74L12.07 18.25C11.9282 18.3812 11.7432 18.4559 11.55 18.46ZM6.90001 12L11.55 16.64L19.3 8.89L19.25 4.27H14.56L6.90001 12Z' fill='red'/> <path d='M14.35 21.25C14.2512 21.2522 14.153 21.2338 14.0618 21.1959C13.9705 21.158 13.8882 21.1015 13.82 21.03L2.52 9.73999C2.38752 9.59782 2.3154 9.40977 2.31883 9.21547C2.32226 9.02117 2.40097 8.83578 2.53838 8.69837C2.67579 8.56096 2.86118 8.48224 3.05548 8.47882C3.24978 8.47539 3.43783 8.54751 3.58 8.67999L14.88 20C15.0205 20.1406 15.0993 20.3312 15.0993 20.53C15.0993 20.7287 15.0205 20.9194 14.88 21.06C14.7353 21.1907 14.5448 21.259 14.35 21.25Z' fill='red'/> <path d='M6.5 21.19C6.31632 21.1867 6.13951 21.1195 6 21L2.55 17.55C2.47884 17.4774 2.42276 17.3914 2.385 17.297C2.34724 17.2026 2.32855 17.1017 2.33 17C2.33 16.59 2.33 16.58 6.45 12.58C6.59063 12.4395 6.78125 12.3607 6.98 12.3607C7.17876 12.3607 7.36938 12.4395 7.51 12.58C7.65046 12.7206 7.72934 12.9112 7.72934 13.11C7.72934 13.3087 7.65046 13.4994 7.51 13.64C6.22001 14.91 4.82 16.29 4.12 17L6.5 19.38L9.86 16C9.92895 15.9292 10.0114 15.873 10.1024 15.8346C10.1934 15.7962 10.2912 15.7764 10.39 15.7764C10.4888 15.7764 10.5866 15.7962 10.6776 15.8346C10.7686 15.873 10.8511 15.9292 10.92 16C11.0605 16.1406 11.1393 16.3312 11.1393 16.53C11.1393 16.7287 11.0605 16.9194 10.92 17.06L7 21C6.8614 21.121 6.68402 21.1884 6.5 21.19Z' fill='red'/> </svg>";
    //     return svg;
    // }   
        
        
                                //for metadta json file store on calling tokenURI
        
                    
    //      function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    //     string memory json = Base64.encode(
    //         bytes(string(
    //             abi.encodePacked(
    //                 '{"name": "', attributes[tokenId].name, '",',
    //                 '"image_data": "', getSvg(tokenId), '",',
    //                 '"attributes": [{"trait_type": "description", "value": ', uint2str(attributes[tokenId].desceription), '},',
    //                 '{"trait_type": "external link", "value": ', uint2str(attributes[tokenId].attack), '},',
    //                 '{"trait_type": "boxID", "value": ', uint2str(attributes[tokenId].boxID), '},',
    //                 '{"trait_type": "uri", "value": "', attributes[tokenId].uri, '"}',
    //                 ']}'
    //             )
    //         ))
    //     );
    //     return string(abi.encodePacked('data:application/json;base64,', json));
    // }    







            // for testing metadata json comment tokenURI function


    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return 
        super.tokenURI(tokenId);
    }

                    //////////  
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
