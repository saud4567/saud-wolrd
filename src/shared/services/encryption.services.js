const crypto = require('crypto');
const sharedConstants = require("shared/constants");
const fs = require("fs");

const encryptionServices = {};

const aeskey = crypto
	.createHash('sha512')
	.update(sharedConstants.appConfig.encryption.secretKey)
	.digest('hex')
	.substring(0, 32);

const encryptionIV = crypto
	.createHash('sha512')
	.update(sharedConstants.appConfig.encryption.secretIv)
	.digest('hex')
	.substring(0, 16);

// service_name: encryptData
// service_description: data encryption
encryptionServices.encryptData = (data) => {

	Object.keys(data).forEach((key) => {

		if (sharedConstants.masterConstants.ENCRYPTION_DECRYPTION_KEYS.indexOf(key) !== -1) {

			const cipher = crypto.createCipheriv('aes-256-cbc', aeskey, encryptionIV)
			data[key] = cipher.update(data[key], 'utf8', 'base64');
			data[key] += cipher.final('base64');
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

				let decipher = crypto.createDecipheriv('aes-256-cbc', aeskey, encryptionIV);
				d[key] = decipher.update(d[key], 'base64', 'utf8');
				d[key] += decipher.final('utf8');
			}

		});
	});
	return data;
};

// Generate a pair of RSA keys for request payload
encryptionServices.generateRSAKeysForRequest = () => {

	const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: 'spki',
			format: 'pem'
		},
		privateKeyEncoding: {
			type: 'pkcs8',
			format: 'pem'
		}
	});

	// // Creating public and private key files
	fs.writeFileSync(sharedConstants.appConfig.app.requestPublicKey, publicKey);
	fs.writeFileSync(sharedConstants.appConfig.app.requestPrivateKey, privateKey);

}

encryptionServices.encryptUsingRsaAlgorithm = (data) => {

	const publicKey = fs.readFileSync(
		sharedConstants.appConfig.app.requestPublicKey
	);

	// Simulate sender encrypting data in chunks with RSA
	const plainText = data;
	const chunkSize = 256; // Size that fits within RSA limitations
	const chunks = [];

	for (let i = 0; i < plainText.length; i += chunkSize) {
		const chunk = plainText.slice(i, i + chunkSize);
		const encryptedChunk = crypto.publicEncrypt(publicKey, Buffer.from(chunk, 'utf-8'));
		chunks.push(encryptedChunk.toString('base64'));
	}
	return chunks;

}

encryptionServices.decryptUsingRsaAlgorithm = async (data) => {

	const privateKey = fs.readFileSync(
		sharedConstants.appConfig.app.requestPrivateKey
	);
	// Simulate receiver decrypting data chunks with RSA
	const decryptedChunks = [];

	for (const encryptedChunk of data) {
		let bufferData = Buffer.from(encryptedChunk, 'base64');
		const decryptedChunk = crypto.privateDecrypt(privateKey, bufferData);
		decryptedChunks.push(decryptedChunk.toString('utf-8'));
	}

	const decryptedData = decryptedChunks.join('');


	return JSON.parse(decryptedData);

};

// Generate a pair of RSA keys for response payload
encryptionServices.generateRSAKeysForResponse = () => {
	const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: 'spki',
			format: 'pem'
		},
		privateKeyEncoding: {
			type: 'pkcs8',
			format: 'pem'
		}
	});

	// Creating public and private key files
	fs.writeFileSync("response_public_key", publicKey);
	fs.writeFileSync("response_private_key", privateKey);
};

module.exports = encryptionServices;
