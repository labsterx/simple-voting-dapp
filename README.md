# simple-voting-dapp
----------
This is a simple voting dapp that uses a mart contract on the Ethereum blockchain to allow people to vote via a web interface.

This project includes 3 parts: 

 - A smart contract written in Solidity.
 - Backend code written in Node.js (using Web3.js and other related modules) for deploying the smart contract as well to manually call the smart contract from the command line.
 - Frontend code written in HTML and JavaScript (using Web3.js and other libraries) as a web interface for users to vote and view the result.

**Requirements:**

 - To run the code, you need to have Node.js and NPM installed.
 - To run the front-end web interface, you need to have a METAMASK browser plugin installed to manage your Ethereum accounts.
 - This code use the Rinkeby testnet instead of the main Ehethreum blockchain. You need to have an account and some ethers on the Rinkeby testnet in order to vote.

**How to Set Up:**

 - Git clone and code.
 - Run "npm install" and "bower install".
 - Copy the config-example.js to config.js and modify the contents to use your own account address (make sure you have some ethers) and your private key for that account (For security, don't use a real account).

**How To manually deploy the contract:**

- Go to http://remix.ethereum.org/ and paste in ballot.sol (under the 'contract' directory). Click on the "contract details (bytecode, interface etc.) link on the right and then copy the Bytecode and Interface code and paste them in your config.js file. 
- Run "node contract/deployContract.js" to deploy your contract to the Rinkeby testnet. After seeing a transaction ID. Go to https://rinkeby.etherscan.io/ and paste in your TX code to do a search to find transaction details. In the detail page, you can find an address for your newly deployed contract. Copy the contract address and paste into your config.js
- To manually vote for a choice, run "node manual-vote.js". 
- To manually check vote results, run "node manual-check-votes.js"

**How to Use the Front-end**

- Edit index.html and change the following variables to the values that match your own contract: *contractAddress*, *contractInterface*.
- Make sure you have the METAMASK plugin installed and logged in in your browser and make sure it's connected to the Rinkeby Test Net. 
- Run a simple server from the project root directoy, such as "php -S localhost:8000" (using PHP) or "http-server" (using Node.js) and visit your page at the localhost address. (Simply opening that index.html in your browser might not work because by default the METAMASK plugin doesn't work with local file URLs)