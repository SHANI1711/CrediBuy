const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

AWS.config.update({
	region: process.env.REGION,
	accessKeyId: process.env.ACCESSKEYID,
	secretAccessKey: process.env.SECRETKEY,
	sessionToken: process.env.SESSIONTOCKEN,
});

const client = new AWS.SecretsManager({ region: 'us-east-1' });

async function getSecretsFromAWS() {
	const data = await client
		.getSecretValue({ SecretId: 'mongo-connection-string' })
		.promise();
	if ('SecretString' in data) {
		return JSON.parse(data.SecretString);
	} else {
		return Buffer.from(data.SecretBinary, 'base64').toString('ascii');
	}
}

module.exports = getSecretsFromAWS;
