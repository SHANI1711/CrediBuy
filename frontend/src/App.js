import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './css/App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';
import Searchbox from './components/Searchbox';
import { useDispatch } from 'react-redux';
import { logout } from '../src/actions/userActions';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import UserlistScreen from './screens/UserlistScreen';

function App() {
	const userSignin = useSelector((state) => state.userSignin);

	const cart = useSelector((state) => state.cart);
	const { userInfo } = userSignin;

	const closeMenu = () => {
		document.querySelector('.sidebar').classList.remove('open');
	};
	const dispatch = useDispatch();

	const signoutHandler = (e) => {
		e.preventDefault();
		dispatch(logout());
	};

	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="row">
					<div>
						<Link to="/">
							<span className="first-half-logo">Credi</span>
							<span className="second-half-logo">Buy</span>
						</Link>
					</div>
					<div className="search_boc_and_other_options">
						<div className="search_bar_in_navbar">
							<Route
								render={({ history }) => (
									<Searchbox history={history}></Searchbox>
								)}
							></Route>
						</div>
						<div>
							<Link to="/cart">
								Cart
								<span className="numbrt_of_items_in_cart">
									{cart.cartItems.length}
								</span>
							</Link>

							{userInfo ? (
								<div className="dropdown">
									<Link to="#">
										{userInfo.name} <i className="fa fa-caret-down"></i>{' '}
									</Link>
									<ul className="dropdown-content">
										<li>
											<Link to="/profile">User Profile</Link>
										</li>
										<li>
											<Link to="/orderhistory">Order History</Link>
										</li>
										<li>
											<Link
												to="#signout"
												onClick={signoutHandler}
											>
												Sign Out
											</Link>
										</li>
									</ul>
								</div>
							) : (
								<Link to="/signin">Sign In</Link>
							)}

							{userInfo && userInfo.isAdmin && (
								<div className="dropdown">
									<Link to="#admin">
										Admin Functions <i className="fa fa-caret-down"></i>
									</Link>
									<ul className="dropdown-content">
										<li>
											<Link to="/products">Products</Link>
										</li>
										<li>
											<Link to="/orders">Orders</Link>
										</li>
										<li>
											<Link to="/userlist">Users</Link>
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>
				</header>
				<aside className="sidebar">
					<h3>Shopping Categories</h3>
					<button
						className="sidebar-close-button"
						onClick={closeMenu}
					>
						x
					</button>
				</aside>
				<main className="main">
					<div className="content">
						<Route
							path="/products"
							component={ProductsScreen}
						/>
						<Route
							path="/shipping"
							component={ShippingScreen}
						/>
						<Route
							path="/payment"
							component={PaymentScreen}
						/>
						<Route
							path="/placeorder"
							component={PlaceOrderScreen}
						/>
						<Route
							path="/orderhistory"
							component={OrderHistoryScreen}
						/>
						<Route
							path="/search/"
							component={HomeScreen}
						></Route>
						<Route
							path="/signin"
							component={SigninScreen}
						/>
						<Route
							path="/register"
							component={RegisterScreen}
						/>
						<Route
							path="/order/:id"
							component={OrderScreen}
						/>
						<Route
							path="/userlist"
							component={UserlistScreen}
						/>
						<Route
							path="/orders"
							component={OrdersScreen}
						/>
						<Route
							path="/product/:id"
							component={ProductScreen}
						/>
						<Route
							path="/cart/:id?"
							component={CartScreen}
						/>
						<Route
							path="/category/:id"
							component={HomeScreen}
						/>
						<Route
							path="/profile"
							component={ProfileScreen}
						/>
						<Route
							path="/"
							exact={true}
							component={HomeScreen}
						/>
					</div>
				</main>
				<footer className="footer">
					<div className="text_in_footer">
						All rights are reserved by CrediBuy.
					</div>
				</footer>
			</div>
		</BrowserRouter>
	);
}
export default App;
