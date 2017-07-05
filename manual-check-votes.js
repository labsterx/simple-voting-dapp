var Web3 = require('web3');
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
var txutils = lightwallet.txutils;
var config = require('./config');
var myUtils = require('./contract-utils');
var async = require('async');

var web3 = new Web3(
	new Web3.providers.HttpProvider(config.httpProvider)
);

var contract = web3.eth.contract(config.contractInterface);
var instance = contract.at(config.contractAddress);

// instance.winningProposal.call(function(err, result) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('The Winner is No. ' + result.toNumber());
//     }
// });

var votes = {};
for (var i=0; i<config.nameList.length; i++) {
	var name = config.nameList[i];
	votes[name] = null;
}
async.forEachOf(config.nameList,
	function(name, i, callback) {
		instance.getVoteCount.call(i, function(err, result) {
			if(err) {
				console.log(err);
				callback();
			} else {
				// console.log(name + ': ' + result.toNumber());
				var n = result.toNumber();
				votes[name] = n;
				callback();
			}
		});
	},
	function(error) {
		// console.log(error);
		console.log(votes);
	}
);



