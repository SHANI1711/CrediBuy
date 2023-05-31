const express = require('express');
const Order = require('../models/orderModel');
const { isAuth, isAdmin } = require('../util');
const axios = require('axios');

const router = express.Router();

router.get('/mine', isAuth, async (req, res) => {
	const orders = await Order.find({ user: req.user._id }).populate('user');
	res.send(orders);
});
router.get('/', isAuth, isAdmin, async (req, res) => {
	const orders = await Order.find({}).populate('user');
	res.send(orders);
});
router.put('/:id/pay', isAuth, async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.payment = {
			paymentMethod: 'paypal',
			paymentResult: {
				payerID: req.body.payer.payer_id,
				orderID: req.body.id,
				paymentID: req.body.purchase_units[0].payments.captures[0].id,
			},
		};
		const updatedOrder = await order.save();
		res.send({ message: 'Order Paid.', order: updatedOrder });
	}
	return res.status(500).send({ message: ' Error in Updating Order.' });
});

router.post('/', isAuth, async (req, res) => {
	const newOrder = new Order({
		orderItems: req.body.orderItems,
		user: req.user._id,
		shipping: req.body.shipping,
		payment: req.body.payment,
		itemsPrice: req.body.itemsPrice,
		taxPrice: req.body.taxPrice,
		shippingPrice: req.body.shippingPrice,
		totalPrice: req.body.totalPrice,
		userName: req.body.userName,
		userEmail: req.body.userEmail,
	});

	try {
		const newPlacedOrder = await newOrder.save();

		const apiMailUrl = `${process.env.API_GATEWAY_URL_FOR_EMAIL}sendemail`;

		try {
			await axios.post(apiMailUrl, {
				userEmail: newPlacedOrder.userEmail,
				subject: `Your order for ${newPlacedOrder.orderItems[0].name} has been placed succeddfully!!`,
				content: `
				Your order id is ${newPlacedOrder._id}.
				Total amout including tax is ${newPlacedOrder.totalPrice}.
				Your shipment will be delivered within a week.

				Thank you, team CrediBuy.
				`,
			});
		} catch (error) {
			console.log('Mail has been sent!!');
		}

		if (newPlacedOrder) {
			return res
				.status(201)
				.send({ message: 'New order placed', data: newPlacedOrder });
		}
	} catch (error) {
		return res.status(400).send(error.message);
	}
});
router.get('/:id', isAuth, async (req, res) => {
	const order = await Order.findOne({ _id: req.params.id });
	if (order) {
		res.send(order);
	} else {
		res.status(404).send('Order Not Found.');
	}
});
router.delete('/:id', isAuth, async (req, res) => {
	const deletedProduct = await Order.findById(req.params.id);
	const apiMailUrl =
		' https://18sn1hvoz1.execute-api.us-east-1.amazonaws.com/production/sendemail';

	try {
		await axios.post(apiMailUrl, {
			userEmail: deletedProduct.userEmail,
			subject: `Your order for ${deletedProduct.orderItems[0].name} is rejected/deleted !!`,
			content: `
				Your order id was ${deletedProduct._id}.
				Total amout including tax was ${deletedProduct.totalPrice}.
				Sorry for inconvinience caused.

				Thank you, team CrediBuy.
				`,
		});
	} catch {
		console.log('Rejection/ deletion Mail has been sent!!');
	}
	if (deletedProduct) {
		await deletedProduct.remove();
		res.send({ message: 'Product Deleted' });
	} else {
		res.send('Error in Deletion.');
	}
});

module.exports = router;
