import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import Rating from '../components/Rating';
import '../css/ProductScreen.css';

function ProductScreen(props) {
	const [qty, setQty] = useState(1);
	const userSignin = useSelector((state) => state.userSignin);

	const productList = useSelector((state) => state.productList);

	const [listName, setlistName] = useState(
		productList.data ? productList.data : 'NA'
	);

	const { userInfo } = userSignin;
	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(detailsProduct(props.match.params.id, listName));

		return () => {};
	}, []);

	const handleAddToCart = () => {
		window.dataLayer.push({
			event: 'addToCart',
			ecommerce: {
				currencyCode: 'EUR',
				add: {
					actionField: { list: listName },
					products: [
						{
							name: product.name,
							id: product.id,
							price: product.price,
							brand: product.brand,
							category: product.category,
							variant: product.description,
							quantity: qty,
						},
					],
				},
			},
		});

		props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
	};

	const datalayer = (product) => {};
	return (
		<div>
			<div className="back-to-result">
				<Link to="/">
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
					/>
					<span class="material-symbols-outlined">arrow_back</span>
				</Link>
			</div>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div>{error} </div>
			) : (
				<>
					{' '}
					{datalayer(product)}
					<div className="details">
						<div className="details-image">
							<img
								src={product.image}
								alt="product"
							></img>
						</div>
						<div className="details-info">
							<ul>
								<li>
									<div className="product_name_in_view_page">
										{product.name}
									</div>
								</li>
								<li>
									<a href="#reviews">
										<Rating
											rating={product.rating}
											numReviews={product.numReviews}
										></Rating>
									</a>
								</li>
								<li className="price_in_details_page">
									Price: ${product.price}
								</li>
								<li>
									Product description:
									<div className="product_description_in_details">
										{product.description}
									</div>
								</li>
							</ul>
						</div>
						<div className="details-action">
							<ul>
								<li>Price: ${product.price}</li>
								<li>
									Status:{' '}
									{product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
								</li>
								<li>
									Qty:{' '}
									<select
										value={qty}
										onChange={(e) => {
											setQty(e.target.value);
										}}
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
								</li>
								<li>
									<button
										onClick={handleAddToCart}
										className="button primary"
									>
										Add to Cart
									</button>
								</li>
							</ul>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
export default ProductScreen;
