var PurpleButterflyToken = artifacts.require('PurpleButterflyToken');

module.exports = function(deployer) {
  deployer.deploy(PurpleButterflyToken);
};