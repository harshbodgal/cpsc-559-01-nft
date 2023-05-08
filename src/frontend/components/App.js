import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
// import { BrowserRouter as Router} from 'react-router-dom';
import { FadeLoader } from 'react-spinners'
import Menu from './Menubar'
import Frontpage from './Frontpage';
import MyPurchases from './Purchases';
import SportsNews from './News';
import Sell from './Sell';
import MyListedItems from './My-items.js';
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
            <Route path="/" element={
              <Frontpage market={market} nft={nft} />
            } />
            {/* <Route path="/My-items" /> */}
              <Route path="/purchases" element={
                <MyPurchases  market={market} nft={nft} wallet={wallet} />} />
              <Route path="/news" element={
                <SportsNews/>} />
              <Route path="/Sell" element={
              <Sell market={market} nft={nft} />}/>
              <Route path="/My-items" element={
              <MyListedItems market={market} nft={nft} wallet={wallet}/>}/>
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
