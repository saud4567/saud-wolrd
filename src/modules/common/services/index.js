const encyptionDecryptionService = require("./encyptionDecryption.service");
const tradingPlatformUpdateService = require("./tradingPlatformUpdate.service");

const commonModuleServices = {
  encyptionDecryption: encyptionDecryptionService,
  tradingPlatformUpdate: tradingPlatformUpdateService,
};

module.exports = commonModuleServices;
