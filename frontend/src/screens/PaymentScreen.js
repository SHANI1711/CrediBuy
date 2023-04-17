import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import '../css/PaymentScreen.css';

function PaymentScreen(props) {
	const [paymentMethod, setPaymentMethod] = useState('');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePayment({ paymentMethod }));
		props.history.push('placeorder');
	};
	return (
		<div>
			<CheckoutSteps
				step1
				step2
				step3
			></CheckoutSteps>
			<div>
				<form
					className="form"
					onSubmit={submitHandler}
				>
					<div>
						<h1>Payment Method</h1>
					</div>
					<div className="payment_options_radio">
						{/* <div>
							<input
								type="radio"
								id="paypal"
								value="PayPal"
								name="paymentMethod"
								onChange={(e) => setPaymentMethod(e.target.value)}
							></input>
							<label htmlFor="paypal">PayPal</label>
						</div> */}
						<div>
							<input
								type="radio"
								id="COD"
								value="COD"
								name="paymentMethod"
								onChange={(e) => setPaymentMethod(e.target.value)}
							></input>
							<label htmlFor="COD">Cash On Delivery</label>
						</div>
					</div>
					<div>
						<label />
						<button
							className="Button primary"
							type="submit"
						>
							Continue
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
export default PaymentScreen;
