const { assert } = require('chai');

const Meme = artifacts.require('Meme');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Meme', (accounts) => {
   let meme

//    before( async () => {
//        meme = Meme.deployed()
//    })
   
   describe('deployment', async () =>{
    meme = Meme.deployed()
       it('deployes successfully', async () =>{
        const address = meme.address
        assert.notEqual(address, '')
        assert.notEqual(address, 0x0)
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        console.log(address)
       })
   })

   describe('storage', async () => {
    meme = Meme.deployed()
       it('updates the memeHash', async () => {
        let memeHash
        memeHash = 'abc123'
        await meme.set(memeHash)
        const result = await meme.get()
        assert.equal(result, memeHash)
       })
   } )
})