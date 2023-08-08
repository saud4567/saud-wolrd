const crypto = require('crypto');
const sharedConstants = require("shared/constants");

const encryptionServices = {};

// const aeskey = crypto
// 	.createHash('sha512')
// 	.update(sharedConstants.appConfig.encryption.secretKey)
// 	.digest('hex')
// 	.substring(0, 32);

// const encryptionIV = crypto
// 	.createHash('sha512')
// 	.update(sharedConstants.appConfig.encryption.secretIv)
// 	.digest('hex')
// 	.substring(0, 16);

// service_name: encryptData
// service_description: data encryption
// encryptionServices.encryptData = (data) => {

// 	Object.keys(data).forEach((key) => {

// 		if (sharedConstants.masterConstants.ENCRYPTION_DECRYPTION_KEYS.indexOf(key) !== -1) {

// 			const cipher = crypto.createCipheriv('aes-256-cbc', aeskey, encryptionIV)
// 			data[key] = cipher.update(data[key], 'utf8', 'base64');
// 			data[key] += cipher.final('base64');
// 		}

// 	});

// 	return data;
// };

// service_name: decryptData
// service_description: data decyption
// encryptionServices.decryptData = (data) => {

// 	data.map((d) => {
// 		Object.keys(d).forEach((key) => {

// 			if (sharedConstants.masterConstants.ENCRYPTION_DECRYPTION_KEYS.indexOf(key) !== -1) {

// 				let decipher = crypto.createDecipheriv('aes-256-cbc', aeskey, encryptionIV);
// 				d[key] = decipher.update(d[key], 'base64', 'utf8');
// 				d[key] += decipher.final('utf8');
// 			}

// 		});
// 	});
// 	return data;
// };

module.exports = encryptionServices;
