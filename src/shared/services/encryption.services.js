const aes256 = require('aes256');
const sharedConstants = require("shared/constants");

const encryptionServices = {};

// service_name: encryptData
// service_description: data encryption
encryptionServices.encryptData = (data) => {
	Object.keys(data).forEach((key) => {

		if (sharedConstants.masterConstants.ENCRYPTION_DECRYPTION_KEYS.indexOf(key) !== -1) {
			data[key] = aes256.encrypt("abc", data[key]);
		}

	});

	return data;
};

// service_name: decryptData
// service_description: data decyption
encryptionServices.decryptData = (data) => {

	data.map((d) => {
		Object.keys(d).forEach((key) => {

			if (sharedConstants.masterConstants.ENCRYPTION_DECRYPTION_KEYS.indexOf(key) !== -1) {
				d[key] = aes256.decrypt("abc", d[key]);
			}

		});
	});
	return data;
};

module.exports = encryptionServices;
