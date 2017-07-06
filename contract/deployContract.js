var Web3 = require('web3');
var config = require('../config');
var myUtils = require('../contract-utils');

var web3 = new Web3(
    new Web3.providers.HttpProvider(config.httpProvider)
);
// console.log(config.ethAddress);

var rawTx = {
    nonce: web3.toHex(web3.eth.getTransactionCount(config.ethAddress)),
    gasLimit: web3.toHex(800000),
    gasPrice: web3.toHex(20000000000),
    data: '0x' + config.contractBytecode + '0000000000000000000000000000000000000000000000000000000000000006'
};

myUtils.sendRaw(config.ethKey, rawTx);