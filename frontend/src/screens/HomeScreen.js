import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import '../css/HomeScreen.css';

function HomeScreen(props) {
	var queryparmas =
		props.location.search.split('q=')[
			props.location.search.split('q=').length - 1
		] || ' ';
	const [searchKeyword, setSearchKeyword] = useState('');
	const [sortOrder, setSortOrder] = useState('');
	const category = props.match.params.id ? props.match.params.id : '';
	const productList = useSelector((state) => state.productList);
	const { products, loading, error, data } = productList;
	const dispatch = useDispatch();

	useEffect(() => {
		setSearchKeyword(queryparmas);

		dispatch(listProducts(queryparmas, category));
		return () => {};
	}, [queryparmas, category]);

	// const submitHandler = (e) => {
	// 	e.preventDefault();
	// 	dispatch(listProducts(searchKeyword));
	// };
	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listProducts(searchKeyword, sortOrder));
	};
	const datalayer = (product) => {
		window.dataLayer.push({
			event: 'select_item',
			ecommerce: {
				items: [
					{
						item_name: product.name,
						item_id: product._id,
						item_brand: product.brand,
						item_category: product.category,
						item_variant: product.description,
						item_list_name: data,
						item_list_id: 1,
						index: products.indexOf(product) + 1,
						price: product.price,
					},
				],
			},
		});
		window.dataLayer.push({
			event: 'productClick',
			ecommerce: {
				click: {
					actionField: { list: data },
					products: [
						{
							name: product.name,
							id: product._id,
							price: product.price,
							brand: product.brand,
							category: product.category,
							variant: product.description,
							position: products.indexOf(product) + 1,
						},
					],
				},
			},
		});
	};

	return (
		<>
			{/* {category && <h2>{category}</h2>} */}

			<ul className="filter">
				<li>
					Sort products:{' '}
					<select
						name="sortOrder"
						value={sortOrder}
						onChange={sortHandler}
					>
						<option value="Newest">Latest products</option>
						<option
							value="lowest"
							default
						>
							Lowest Price
						</option>
						<option value="highest">Highest Price</option>
					</select>
				</li>
			</ul>
			{loading ? (
				<div>Loading Products...</div>
			) : error ? (
				<div>{error}</div>
			) : (
				<ul className="products">
					{products.map((product) => (
						<li key={product._id}>
							<div className="product">
								<Link
									to={'/product/' + product._id}
									onClick={() => {
										datalayer(product);
									}}
								>
									<div className="product_image_div">
										<img
											className="product-image"
											src={product.image}
											alt="product"
										/>
									</div>
								</Link>
								<div className="product_name_in_card">
									<Link
										to={'/product/' + product._id}
										onClick={() => {
											datalayer(product);
										}}
									>
										{product.name}
									</Link>
								</div>
								<div className="product-brand"> from {product.brand}</div>
								<div className="product-price">${product.price}</div>
								{/* <div className="product-rating"></div> */}
							</div>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
export default HomeScreen;
