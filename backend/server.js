const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
import userRouter from '../backend/routers.js/userRouter';
import productRouter from '../backend/routers.js/productRouter';
import orderRouter from '../backend/routers.js/orderRouter';

const cors = require('cors');
const databaseConnection = require('./databaseConnection');

import path from 'path';
dotenv.config();

const app = express();

const corsOptions = {
	origin: '*',
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.static('frontend/build'));

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
app.listen(process.env.PORT || 5001, () => {
	console.log(`server started port ${process.env.PORT || 5001}   `);
});

process.on('SIGTERM', () => {
	server.close(() => {
		console.log('Process terminated');
	});
});
