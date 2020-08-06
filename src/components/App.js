import React, { Component } from 'react';
//import Web3 from 'web3'
//import Meme from '../abis/Meme.json'

import './App.css';
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'


//const ipfsClient = require('ipfs-http-client')
const IPFS = require('ipfs-api')
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

//const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
 
const myTheme = {
  // Theme object to extends default dark theme.
};

class App extends Component {

  // async componentWillMount(){
  //   await this.loadWeb3()
  //   await this.loadBlockchainData()
  //}

  //get the account
  //get the network
  // get the smart contracr
  // --- ABI : Meme.abi
  // ---> contract Address: networkData.address
  // get Meme Hash
  // async loadBlockchainData(){
  //   const web3 = window.web3
  //   const accounts = await web3.eth.getAccounts()
  //   this.setState({'account': accounts})
  //   const networkId = await web3.eth.net.getId()
  //   const networkData = Meme.networks[networkId]
  //   if(networkData){
  //     // fetch contract
  //     const abi = Meme.abi
  //     const address = networkData.address
  //     console.log(abi)
  //     console.log(address)
  //     const contract = new web3.eth.Contract(abi, address)
  //     this.setState({contract})
  //     const memeHash = await contract.methods.get().call()
  //     this.setState({memeHash})


  //   }else {
  //     window.alert('Smart Contarct not deployed to the network')
  //   }
  // }

  constructor(props){
    super(props);
    this.state = {
      'account': '',
      'contract': null,
      'buffer': null,
      'memeHash': 'QmadD5SvmNrSJuqhgjrA2NKLkGbYB5dDWECRmQLW9CSLFW'
    }
  }

      // async loadWeb3(){
      //   if(window.ethereum){
      //     window.web3 = new Web3(window.ethereum)
      //     await window.ethereum.enable()

      //   } if(window.web3){
      //     window.web3 = new Web3(window.web3.currentProvider)
      //   }else {
      //       window.alert('Plese use Metamask...')
      //   }
      // }

  captureFile = (event) => {
    event.preventDefault()
   // console.log("file Captured")
    // Process file for IPFS
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      console.log('buffer',Buffer(reader.result))
      this.setState({ 'buffer': Buffer(reader.result)})
    }
  }

  // Example Hash: QmadD5SvmNrSJuqhgjrA2NKLkGbYB5dDWECRmQLW9CSLFW
  // Example URL : https://ipfs.infura.io/ipfs/QmadD5SvmNrSJuqhgjrA2NKLkGbYB5dDWECRmQLW9CSLFW
  onSubmit = (event) => {
    event.preventDefault()
    console.log("Submiting the form...")
    ipfs.add(this.state.buffer, (error , result) => {
        console.log('IPFS Result', result)
        const memeHash = result[0].hash
        this.setState({memeHash})
        if(error){
          console.error(error)
          return
        }
        // step 2 : store file on blockchain
        // this.state.contract.methods.set(memeHash).send({from: this.state.account})
        // .then((r) => {
        //   this.setState({memeHash})
        // })
    })


  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            D-Edit
          </a>
          {/* <ul className="navbar-nav px-3" >
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-white">{this.state.account}</small>
            </li>
          </ul> */}
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`} alt='img' />
                </a>
                <p>&nbsp;</p>
                <h2>Change Image</h2>
                <form onSubmit={this.onSubmit} >
                  <input type='file' onChange={this.captureFile} />
                  <input type='submit' />
                </form>
               
              </div>
             
            </main>
          </div>
          <ImageEditor
    includeUI={{
      loadImage: {
        path: 'img/sampleImage.jpg',
        name: 'SampleImage'
      },
      theme: myTheme,
      menu: ['shape', 'filter'],
      initMenu: 'filter',
      uiSize: {
        width: '1000px',
        height: '700px'
      },
      menuBarPosition: 'bottom'
    }}
    cssMaxHeight={500}
    cssMaxWidth={700}
    selectionStyle={{
      cornerSize: 20,
      rotatingPointOffset: 70
    }}
    usageStatistics={true}
  />
        </div>
      </div>
    );
  }
}

export default App;
