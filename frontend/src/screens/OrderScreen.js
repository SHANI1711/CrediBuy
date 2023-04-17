import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import axios from 'axios';

function OrderScreen(props) {
	const orderPay = useSelector((state) => state.orderPay);

	const [sdkReady, setSdkReady] = useState(false);
	const [clientID, setclientID] = useState('');

	useEffect(() => {
		if (!sdkReady)
			axios.get('/api/config/paypal').then((response) => {
				setSdkReady(true);
				setclientID(response.data);
			});
		return () => {};
	}, [sdkReady]);

	var { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
	const dispatch = useDispatch();

	useEffect(() => {
		if (successPay) {
			props.history.push('/profile');
		} else {
			dispatch(detailsOrder(props.match.params.id));
		}
		return () => {};
	}, [successPay]);

	const orderDetails = useSelector((state) => state.orderDetails);
	const userDetails = useSelector((state) => state.userSignin);

	const { userInfo } = userDetails;
	const { loading, order, error } = orderDetails;

	return loading ? (
		<div>loading.......</div>
	) : error ? (
		<div>{error}</div>
	) : (
		<div>
			<div className="placeorder">
				<div className="placeorder-info">
					<div>
						<h3>User Details</h3>
						<div>Name: {order.userName}</div>
						<div>Email: {order.userEmail}</div>
					</div>
					<div>
						<h3>Shipping</h3>
						<div>
							{order.shipping.address}, {order.shipping.city},
							{order.shipping.postalCode}, {order.shipping.country},
						</div>
						<div>
							{order.isDelivered
								? 'Delivered at ' + order.deliveredAt
								: 'Not Delivered.'}
						</div>
					</div>
					<div>
						<h3>Payment</h3>
						<div>Payment Method: {order.payment.paymentMethod}</div>
						<div>{order.isPaid ? 'Paid at ' + order.paidAt : 'Not Paid.'}</div>
					</div>
					<div>
						<ul className="cart-list-container">
							<li>
								<h3>Shopping Cart</h3>
								<div>Price</div>
							</li>
							{order.orderItems.length === 0 ? (
								<div>Cart is empty</div>
							) : (
								order.orderItems.map((item) => (
									<li key={item._id}>
										<div className="cart-image">
											<img
												src={item.image}
												alt="product"
											/>
										</div>
										<div className="cart-name">
											<div>
												<Link to={'/product/' + item.product}>{item.name}</Link>
											</div>
											<div>Qty: {item.qty}</div>
										</div>
										<div className="cart-price">${item.price}</div>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
				<div className="placeorder-action">
					<ul>
						{/* <li className="placeorder-actions-payment">
							{loadingPay && <CircularProgress />}
							{!order.isPaid &&
								(sdkReady ? (
									<PayPalButton
										amount={order.totalPrice}
										onSuccess={() =>
											alert('Your order has been placed successfully!')
										}
										options={{
											clientId: `${clientID}`,
										}}
									/>
								) : (
									<div>loading</div>
								))}
						</li> */}
						<li>
							<h3>Order Summary</h3>
						</li>
						<li>
							<div>Items</div>
							<div>${order.itemsPrice}</div>
						</li>
						<li>
							<div>Shipping</div>
							<div>${order.shippingPrice}</div>
						</li>
						<li>
							<div>Tax</div>
							<div>${order.taxPrice}</div>
						</li>
						<li>
							<div>Order Total</div>
							<div>${order.totalPrice}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
export default OrderScreen;
