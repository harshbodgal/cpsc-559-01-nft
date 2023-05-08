# cpsc-559-01-nft
This repo includes code for SPorts NFT Marketplace 
Team Members:
1)  Name    -   Harsh Bodgal
   CWID    -   885915231
   Email   -   harsh481997@csu.fullerton.edu


2)  Name    -   Apurva Umakant Gawande
   CWID    -   885897918
   Email   -   apurva.gawande@csu.fullerton.edu


3)  Name    -   Devashish Inampudi
   CWID    -   885187716
   Email   -   devashishinampudi@gmail.com


4)  Name    -   Pavan Kalyan Bera
   CWID    -   885196220
   Email   -   pavanbera@csu.fullerton.edu


Github Link to the Original Project (Starter Kit):
https://github.com/dappuniversity/starter_kit_2


Features and Functionalities -


1) Connection to Metamask Wallet
2) NFT listing
3) buy NFTs with eather
4) sell NFTs with eather
5) List of purchased NFTs
6) List of NFTs listed for sell by the user
7) List of latest Sports updates
8) Deployed 2 contracts on Hardhat
   1) NFT - reperesents collection of NFTs
   2) Marketplace - allows users to buy and sell them
9)Improved UI and created 6pages to enhance functionalities
10) Written tests for the contracts


Dependencies -


1) Node.js - https://www.nodejs.org/en - v17.0.1
   To install specific version of node, Use NVM
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   To check if NVM is installed properly or not : command -v nvm (returns nvm on successful installation)
   nvm install 17.0.1
   nvm use 17.0.1

2) HardHat - Smartcontract development framework
   npm install --save-dev hardhat@2.8.4
   If it shows any error related to previous Node/NPM version then run the following command : sudo npm cache clean --force

3)  Metamask - This turn browser to Crypto compatible browser
   Go to Metamask.io and download the browser extension and set it up.

4) run npm install

5) React Router DOM dependencies - It does not come with vanilla react
npm install react-router-dom@6

6) Ipfs http client - Will be used to upload content of the NFT to IPFS before we mint it using create and list nft form
npm install ipfs-http-client@56.0.1

7) OpenZeppelin contracts library - A library of bunch of secure pre-made contracts, patterns and implementations
npm install @openzeppelin/contracts@4.5.0




Folder Structure and content -

hardhat.config.js
Specify version of solidity/smart contracts and paths to smart contracts

backend
Smart contract source code, tests, deployment scripts

Front end
Client side application code - React components

package.json
Project specific dependencies



