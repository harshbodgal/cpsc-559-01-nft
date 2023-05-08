import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { BrowserRouter as Router} from 'react-router-dom';
import { FadeLoader } from 'react-spinners'
import Menu from './Menubar'
import Frontpage from './Frontpage';
import Sell from './Sell';
import Items from './My-items.js';
import Purchases from './Purchases';
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'

import { useState } from 'react'
import { ethers } from 'ethers'
 
function App() {
  const [wallet, setWallet] = useState(null)
  const [display, setDisplay] = useState(true)
  const [nft, setNFT] = useState({})
  const [market, setMarket] = useState({})

  const web3Handler = async () => {
    const wallet = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setWallet(wallet[0])
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const sign = provider.getSigner()
    load(sign)
  
  }

  const load = async (sign) => {
    setMarket(new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, sign))
    setNFT(new ethers.Contract(NFTAddress.address, NFTAbi.abi, sign))
    setDisplay(false)
  }

  return (
    <BrowserRouter>
      <div>
        <Menu web3Handler={web3Handler} wallet={wallet} />
        <div>
          {display ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
                <FadeLoader loading={true} color='blue' />
                <p className='waiting'>Metamask Connecting...</p>
              </div>
          ) : (
          <Routes>                    
            <Route path="/Frontpage" element={
              <Frontpage market={market} nft={nft} />
            } />
            <Route path="/Sell" />
            <Route path="/My-items" />
            <Route path="/Purchases"/>         
          </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
