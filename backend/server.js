const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const databaseConnection = require('./databaseConnection');

const bodyParser = require('body-parser');
const userRouter = require('../backend/routers/userRouter');
const productRouter = require('../backend/routers/productRouter');
const orderRouter = require('../backend/routers/orderRouter');

const path = require('path');
dotenv.config();

const app = express();

app.use(
	cors({
		origin: true,
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
	})
);
app.use(express.static('frontend/build'));
process.env.AWS_SDK_LOAD_CONFIG = 1;
databaseConnection();

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Methods',
		'GET',
		'PUT',
		'POST',
		'DELETE',
		'OPTIONS'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	next();
});
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});
app.listen(5001, () => {
	console.log(`server started port  5001   `);
});

process.on('SIGTERM', () => {
	server.close(() => {
		console.log('Process terminated');
	});
});
