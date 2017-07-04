var Web3 = require('web3');
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
var txutils = lightwallet.txutils;
var config = require('./config');
var utils = require('./contract-utils');

var web3 = new Web3(
    new Web3.providers.HttpProvider(config.httpProvider)
);
// console.log(config.ethAddress);


var txOptions = {
    nonce: web3.toHex(web3.eth.getTransactionCount(config.ethAddress)),
    gasLimit: web3.toHex(800000),
    gasPrice: web3.toHex(20000000000),
    to: config.contractAddress
}

var rawTx = txutils.functionTx(config.contractInterface, 'vote', [2], txOptions);

utils.sendRaw(config.ethKey, rawTx);