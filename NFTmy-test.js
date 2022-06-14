const { expect } = require('chai')
const { ethers } = require('hardhat')

describe("NFTmy", function () {

  let NFTmy, nftContract, owner, addr1, addr2, addr3, addrs

//address  ='0x11F8BFE6DAc774B7a1adDa5952a6382A4d274C19';
  beforeEach(async function(){
   this.timeout(100000); // 20 second timeout for setup

    NFTmy = await ethers.getContractFactory('NFTmy');
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    nftContract = await NFTmy.deploy();
  })

  describe('Deployment', function(){
    it('Right owner', async function(){
      expect(await nftContract.owner()).to.equal(owner.address)
    })
  })

    it('Should be Connect to Owner', async function(){
      expect(await
        nftContract.owner()).to.equal(addr1);
        
  })


    it('Should be Connect to Owner', async function(){
      expect(await
        nftContract.owner()).to.equal(addr2)
  })



  describe('freezeMetadata', function(){
     it('Right Owner Calling', async function(){
      expect( await
        nftContract.owner()).to.equal(owner.address)
          })

    it('Not Right Owner Calling', async function(){
     expect( 
       nftContract.owner()).to.equal(addr1);
         })
                    
   it('set freezeMetadata by owner is WHAT is status check', async function(){
    const expectedValue = true
    await  nftContract.connect(owner).freezeMetadata()
   expect( nftContract.freezeMetadata()).to.equal(expectedValue)
   })
   it('set freezeMetadata by owner is WHAT is status check', async function(){
    const expectedValue = false
    await  nftContract.connect(owner).freezeMetadata()
   expect( nftContract.freezeMetadata()).to.equal(expectedValue)
   })

    it('Function Caller is Owner', async function(){
          expect( await
           nftContract.connect(owner).freezeMetadata())
          })
    it('function Caller is NOT Owner', async function(){
            expect( await
             nftContract.connect(addr1).freezeMetadata())
            })
  
  
   it('set freezeMetadata by owner is True', async function(){
              const expectedValue = true
               await nftContract.connect(owner).freezeMetadata()
             expect(await nftContract.freezeMetadata()).to.equal(expectedValue)
             })
   it('set freezeMetadata by owner', async function(){
              const expectedValue = true
               await nftContract.connect(addr1).freezeMetadata()
             expect(await nftContract.metadataIsFrozen()).to.equal(expectedValue)
             })
          
        })


  
  //Should be reverted because 
  describe('setIsPublicMintEnabled', function(){
    it('Should be reverted because the caller is not Owner', async function(){
       expect( await
        nftContract.connect(addr1).setIsPublicMintEnabled(false),
        ).to.be.revertedWith('Ownable: caller is not the owner')
         })
     it('the caller is the Owner', async function(){
          expect( await
           nftContract.connect(owner).setIsPublicMintEnabled(false),
           )
          })
     it('set isPublicMintEnabled by owner', async function(){
         const expectedValue = true
          await nftContract.connect(owner).setIsPublicMintEnabled(expectedValue)
        expect(await nftContract.isPublicMintEnabled()).to.equal(expectedValue)
        })

        it('Should set isPublicMintEnabled by owner', async function(){
          const expectedValue = false
           await nftContract.connect(addr1).setIsPublicMintEnabled(expectedValue)
         expect(await nftContract.isPublicMintEnabled()).to.equal(expectedValue)
         })
        
         it('set isPublicMintEnabled by owner', async function(){
          const expectedValue = true
           await nftContract.connect(owner).setIsPublicMintEnabled(expectedValue)
         expect(await nftContract.isPublicMintEnabled()).to.equal(expectedValue)
         })
         
         it('set isPublicMintEnabled by owner', async function(){
          const expectedValue = false
           await nftContract.connect(owner).setIsPublicMintEnabled(expectedValue)
         expect(await nftContract.isPublicMintEnabled()).to.equal(expectedValue)
         })

  })

  describe('boxSizes', function(){
    it('Caller passing Right Expected Arrguments', async function(){
      const boxID = 11
      const right =10 
      const left =10
      const top =20
      const bottom =20  
       expect(  nftContract.connect(owner).boxSizes(boxID,right,left,top,bottom)
     ) })
   

          it('the caller is passing Right Arrguments', async function(){
            const boxID = 22
            const right =20 
            const left =20  
            const top =10
            const bottom =10    
            expect(nftContract.connect(addr1).boxSizes(boxID, right, left, top, bottom)
            )
                })
                it('this arrguments are Correct for box ID', async function(){
                  const boxID = 1.0
                  const right =10 
                  const left =10
                  const top =20
                  const bottom =20 
                   await (
                    nftContract.connect(owner).boxSizes(boxID,right,left,top,bottom)
                   )  })
          
          it('the caller is NOT passing Right Arrguments', async function(){
                  const boxID = 22
                //  const right =20 
                  const left =20  
                  const top =10
                  const bottom =10    
                     expect( nftContract.connect(owner).boxSizes(boxID,right,left,top,bottom))
                 
                      })
         it('the caller is Not passing Right Arrguments', async function(){
             const boxID = 12
            const right =20 
            const left =20  
            const top =.07
           const bottom =10 
           await   (  nftContract.connect(owner).boxSizes(boxID, right,left,top,bottom)
                    )

                      })
        
     it('this arrguments are not Correct for box ID', async function(){
      const boxID = .01
      const right =10 
      const left =10
      const top =20
      const bottom =20 
       await (
        nftContract.connect(owner).boxSizes(boxID,right,left,top,bottom)
       )  })
    

        })

          it('Caller passing Right Expected Arrguments', async function(){
            const boxID = 11
            const right =10 
            const left =10
            const top =20
            const bottom =20  
             expect(  nftContract.connect(owner).boxSizes(boxID,right,left,top,bottom)
           ) 
          })
         
      
            it('the caller is passing Right Arrguments', async function(){
                  const boxID = 22
                  const right =20 
                  const left =20  
                  const top =10
                  const bottom =10    
                  expect(nftContract.connect(addr1).boxSizes(boxID, right, left, top, bottom)
                  )
                      })
            it('this arrguments are Correct for box ID', async function(){
                        const boxID = 1.0
                        const right =10 
                        const left =10
                        const top =20
                        const bottom =20 
                         await (
                          nftContract.connect(owner).boxSizes(boxID,right,left,top,bottom)
                         )  })
                
           it('the caller is NOT passing Right Arrguments', async function(){
                        const boxID = 22
                      //  const right =20 
                        const left =20  
                        const top =10
                        const bottom =10    
                           expect( nftContract.connect(owner).boxSizes(boxID,right,left,top,bottom))
                       
                            })
          it('the caller is Not passing Right Arrguments', async function(){
                   const boxID = 12
                  const right =20 
                  const left =20  
                  const top =.07
                 const bottom =10 
                 await   (  nftContract.connect(owner).boxSizes(boxID, right,left,top,bottom)
                          )
      
                            })
              
           it('this arrguments are not Correct for box ID', async function(){
            const boxID = .01
            const right =10 
            const left =10
            const top =20
            const bottom =20 
             await (
              nftContract.connect(owner).boxSizes(boxID,right,left,top,bottom)
             )  
            })
            //setToken
describe('UpdateNewURI', function () {
              it('Should be updated tokenURI because the caller is owner', async function () {
                 expect(
                  nftContract.connect(owner).UpdateNewURI('url', '2', 'Ahmed', 'hii how r u', '@mysite.com'))
              })
          
              it('Should be reverted because the caller is not owner', async function () {
                expect (
                  nftContract.connect(addr1).UpdateNewURI('url', '2', 'Ahmed', 'hii how r u', '@mysite.com'))
              })
              it('Should be reverted because the caller is not owner', async function () {
                await (
                  nftContract.connect(addr1).UpdateNewURI('url', '2', 'Ahmed', 'hii how r u', '@mysite.com')
                ).to.be.revertedWith('caller is not the owner')
              })
              it('Should set the UpdateNewURI by owner', async function () {
                const baseurl = 'ipfs://test.url/'
                const name = 'SOHAIL'
                const id = 1
                const description = 'Hi i am here for NFT minting'
                const link = 'Sohail@icloud.com'
               await nftContract.connect(owner).UpdateNewURI(baseurl, id, name, description, link)
                
                await nftContract.connect(addr1).mintNFT(1, 1, 0, 0, 0, 0)
                await nftContract.connect(owner).mintNFT(1, 1, 0, 0, 0, 0)

          
                expect(await nftContract.tokenURI(0)).to.equal(baseurl + '0')
                expect(await nftContract.ownerOf(0)).to.equal(owner.address)

                expect(await nftContract.ownerOf(0)).to.equal(addr1.address)
              })
            })
          
      

 describe('mintNFT', function(){
   
  it('Should isPublicMintEnabled is True', async function () {
    await nftContract.connect(owner).isPublicMintEnabled()
  })
  it('Should isPublicMintEnabled is False Now No More Minting is Allowed', async function () {
    await nftContract.connect(addr1).isPublicMintEnabled()
  })
  it('arrguments for Minting boxs is Correct', async function(){
    const count = 3
    const small = 1
    const medium = 1 
    const large = 1
    const ultra = 0
    const mega = 0 
     await (
      nftContract.connect(owner).mintNFT(count, small, medium, large, ultra, mega)
     )  
    })
    it('arrguments for Minting boxs is Not Correct False on Condition one when it check count Value', async function(){
      const count = 5
      const small = 1
      const medium = 1 
      const large = 1
      const ultra = 1
      const mega = 1
       await (
        nftContract.connect(owner).mintNFT(count, small, medium, large, ultra, mega)
       )  
      })
      it('arrguments for Minting boxs is Correct', async function(){
        const count = 1
        const small = 1
        const medium = 0 
        const large = 0
        const ultra = 0
        const mega = 0 
         await (
          nftContract.connect(owner).mintNFT(count, small, medium, large, ultra, mega)
         )  
        })
        it('arrguments for Minting boxs is Not Correct False on Condition one when it check count Value', async function(){
          const count = 5
          const small = 1
          const medium = 1 
          const large = 0
          const ultra = 0
          const mega = 0
           await (
            nftContract.connect(owner).mintNFT(count, small, medium, large, ultra, mega)
           )  
          })


          ////

          it('arrguments for Minting boxs is not fullfiled require Check in one time just user can mint 3 or less then 3 SO Failed transcation', async function(){
            const count = 4
            const small = 1
            const medium = 1 
            const large = 1
            const ultra = 1
            const mega = 0 
             await (
              nftContract.connect(owner).mintNFT(count, small, medium, large, ultra, mega)
             )  
            })
            it('arrguments for Minting boxs is Not Correct False on Condition one when it check for minting', async function(){
              const count = .1
              const small = 1
              const medium = 2 
              const large = 3
              const ultra = 1
              const mega = 1
               await (
                nftContract.connect(owner).mintNFT(count, small, medium, large, ultra, mega)
               )  
              })
              it('arrguments for Minting boxs is Correct NULL mins Passing Zero', async function(){
                const count = 0 
                const small = 0
                const medium = 0 
                const large = 0
                const ultra = 0
                const mega = 0 
                 await (
                  nftContract.connect(owner).mintNFT(count, small, medium, large, ultra, mega)
                 )  
                })
                it('arrguments for Minting boxs is Not Correct False on Condition one Pass less parameter', async function(){
                  const count = 5
                  const small = 1
                  const medium = 1 
                  const large = 0
                 // const ultra = 0
                  const mega = 0
                   await (
                    nftContract.connect(owner).mintNFT(count, small, medium, large, mega)
                   )  
                  })
        it('Should mint tokenURI', async function () {
                    const baseurl = 'ipfs://test.url/'
                    nftContract.connect(owner).tokenURI(baseurl)      
                                 
                    await nftContract.connect(owner).mintNFT(1,1,0,0,0,0)
                   
              
                    expect(await nftContract.tokenURI(0)).to.equal(baseurl + 'id')
          })
                    it('Should mint tokenURI is equal on tokenURI 0', async function () {
                  expect(await nftContract.tokenURI(0)).to.equal(baseurl + 'id')

                  expect(await nftContract.ownerOf(0)).to.equal(addr1.address)
                  })
                  })

          ///

         
  describe('withdraw', function () {
    it('Should be reverted because the caller is not owner', async function () {
      await expect(
        nftContract.connect(addr1).withdraw(),
      ).to.be.revertedWith('caller is not the owner')
    })
    it('Should withdraw fund by the owner', async function () {
      await nftContract.connect(owner).withdraw()
    })
    it('Should withdraw fund by the owner Check MintEnabled', async function () {
      await nftContract.connect(owner).isPublicMintEnabled()
    })

    it('Should withdraw fund by the owner', async function () {
      await nftContract.connect(owner).isPublicMintEnabled()
      const overrides = {
        value: ethers.utils.parseEther('5'), // ether in this case MUST be a string
      }
      await nftContract.connect(addr1).mintNFT(1, overrides)
      const accountBalanceBeforeWithdraw = ethers.utils.formatEther(
        await nftContract.provider.getBalance(owner.address),
      )

      await nftContract.connect(owner).withdraw()
      const accountBalanceAfterWithdraw = ethers.utils.formatEther(
        await nftContract.provider.getBalance(owner.address),
      )

      expect(
        parseInt(accountBalanceAfterWithdraw) >
          parseInt(accountBalanceBeforeWithdraw),
      ).to.be.true
           
   })

  })
});
