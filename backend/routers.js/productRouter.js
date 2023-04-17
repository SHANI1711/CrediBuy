import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';
import config from '../config';
const dotenv = require('dotenv');
dotenv.config();
const AWS = require('aws-sdk');
const multer = require('multer');

const router = express.Router();

AWS.config.update({
	region: process.env.REGION,
	accessKeyId: process.env.ACCESSKEYID,
	secretAccessKey: process.env.SECRETKEY,
	sessionToken: process.env.SESSIONTOCKEN,
});
const s3 = new AWS.S3();

//get all products
router.get('/', async (req, res) => {
	const searchKeyword = req.query.searchKeyword || '';

	const sortOrder = req.query.sortOrder || '';
	const order =
		sortOrder === 'lowest'
			? { price: -1 }
			: sortOrder === 'highest'
			? { price: 1 }
			: sortOrder === 'Newest'
			? { _id: 1 }
			: { _id: -1 };

	const nameFilter = searchKeyword
		? { name: { $regex: searchKeyword, $options: 'i' } }
		: {};

	const products = await Product.find(nameFilter).sort(order);
	res.send(products);
});

//get product by ID
router.get('/:id', async (req, res) => {
	const product = await Product.findOne({ _id: req.params.id });
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: 'Product Not Found.' });
	}
});

//update product by ID
router.put('/:id', isAuth, isAdmin, async (req, res) => {
	const productId = req.params.id;
	const product = await Product.findById(productId);
	if (product) {
		product.name = req.body.name;
		product.price = req.body.price;
		product.image = req.body.image;
		product.brand = req.body.brand;
		product.category = req.body.category;
		product.countInStock = req.body.countInStock;
		product.description = req.body.description;
		const updatedProduct = await product.save();
		if (updatedProduct) {
			return res
				.status(200)
				.send({ message: 'Product Updated', data: updatedProduct });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Product.' });
});

//delete product
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
	const deletedProduct = await Product.findById(req.params.id);
	console;
	if (deletedProduct) {
		await deletedProduct.remove();
		res.send({ message: 'Product Deleted' });
	} else {
		res.send('Error in Deletion.');
	}
});

const memoryStorage = multer.memoryStorage();

const upload = multer({ storage: memoryStorage });

//create product listing
router.post(
	'/',
	// isAuth,
	// isAdmin,
	upload.single('productImage'),

	async (req, res) => {
		const bucketName = 'credi-buy-s3-buket';
		const params = {
			Bucket: bucketName,
			Key: Date.now() + Math.round(Math.random() * 1e9) + '-' + 'productImage',
			Body: req.file.buffer,
		};

		const product = new Product({
			name: req.body.name,
			price: req.body.price,
			brand: req.body.brand,
			category: req.body.category,
			countInStock: req.body.countInStock,
			description: req.body.description,
			rating: req.body.rating,
			numReviews: req.body.numReviews,
		});

		const data = await s3.upload(params).promise();

		product.image = data.Location;

		const newProduct = await product.save();
		if (newProduct) {
			return res
				.status(201)
				.send({ message: 'New Product Created', data: newProduct });
		}
		return res.status(500).send({ message: ' Error in Creating Product.' });
	}
);

export default router;
