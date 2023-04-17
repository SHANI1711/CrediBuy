const getSecretsFromAWS = require('./config');
var mongoose = require('mongoose');

const databaseConnection = async () => {
	try {
		const receivedData = await getSecretsFromAWS();
		const MONGO_URI = receivedData.MongoConnectionUri;

		await mongoose
			.connect(MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log('Connected to Database Successfully!!');
			})
			.catch((err) => {
				console.error(`Error connecting to the database. \n${err}`);
			});
	} catch (err) {
		console.log(err);
	}
};

module.exports = databaseConnection;
