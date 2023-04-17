import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function SigninScreen(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const userSignin = useSelector((state) => state.userSignin);
	const { loading, userInfo, error } = userSignin;
	const dispatch = useDispatch();
	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/';
	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
		return () => {
			//
		};
	}, [userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(signin(email, password));
	};
	return (
		<div>
			<form
				className="form"
				onSubmit={submitHandler}
			>
				<div>
					<h1 className="create_account_and_sign_in_title">Sign In</h1>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant="danger">{error}</MessageBox>}
				<div>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						placeholder="Enter email"
						required
						onChange={(e) => setEmail(e.target.value)}
					></input>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						placeholder="Enter password"
						required
						onChange={(e) => setPassword(e.target.value)}
					></input>
				</div>
				<div>
					<label />
					<button
						className="primary"
						type="submit"
					>
						Sign In
					</button>
				</div>
				<div>
					<label />
					<div>
						New to CrediBuy?{' '}
						<Link
							className="signup_and_signin_link"
							to={`/register?redirect=${redirect}`}
						>
							Create your account
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
}
export default SigninScreen;
