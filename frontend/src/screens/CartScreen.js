import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/CartScreen.css';
function CartScreen(props) {
	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;

	const productId = props.match.params.id;
	const qty = props.location.search
		? Number(props.location.search.split('=')[1])
		: 1;
	const dispatch = useDispatch();
	const removeFromCartHandler = (productId) => {
		dispatch(removeFromCart(productId));
	};
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, []);

	const checkoutHandler = () => {
		// cartItems.map((item) => dispatch(removeFromCart(item.product)));
		props.history.push('/signin?redirect=shipping');
	};

	return (
		<div className="cart_outer_div">
			<div className="cart-list">
				<ul className="cart-list-container">
					<li>
						<h3>Your Cart</h3>
						<div> Unit Price</div>
					</li>
					{cartItems.length === 0 ? (
						<div>Your Cart is empty</div>
					) : (
						cartItems.map((item) => (
							<li>
								<Link to={'/product/' + item.product}>
									<div className="cart-image">
										<img
											src={item.image}
											alt="product"
										/>
									</div>
								</Link>

								<div className="cart-name">
									<div>
										<Link
											className="product_name_in_cart"
											to={'/product/' + item.product}
										>
											{item.name}
										</Link>
									</div>
									<div className="qty_and_delete_div">
										<div className="quantity_title">Qty:</div>

										<select
											value={item.qty}
											onChange={(e) =>
												dispatch(addToCart(item.product, e.target.value))
											}
										>
											{[...Array(5).keys()].map((x) => (
												<option
													key={x + 1}
													value={x + 1}
												>
													{x + 1}
												</option>
											))}
										</select>
										<button
											type="button"
											className="delete_button"
											onClick={() => removeFromCartHandler(item.product)}
										>
											Delete
										</button>
									</div>
								</div>
								<div className="cart-price">${item.price}</div>
							</li>
						))
					)}
				</ul>
			</div>
			<div className="cart-action">
				<div className="total_and_tax_in_cart">
					<h3>
						Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${' '}
						{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
					</h3>
					<span className="tax_info_in_cart">
						Taxes will be added at next step.
					</span>
				</div>

				<div className="checkout_btn_div">
					<button
						onClick={() => checkoutHandler()}
						className="checkout_btn_in_cart"
						disabled={cartItems.length === 0}
					>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartScreen;
