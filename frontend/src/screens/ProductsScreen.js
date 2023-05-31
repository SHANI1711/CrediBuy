import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	saveProduct,
	listProducts,
	deleteProdcut,
} from '../actions/productActions';
import '../css/ProductsScreen.css';

function ProductsScreen(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState('');
	const [description, setDescription] = useState('');
	const [uploading, setUploading] = useState(false);
	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	const productSave = useSelector((state) => state.productSave);
	const {
		loading: loadingSave,
		success: successSave,
		error: errorSave,
	} = productSave;

	const productDelete = useSelector((state) => state.productDelete);
	const { success: successDelete } = productDelete;
	const dispatch = useDispatch();

	useEffect(() => {
		if (successSave) {
			setModalVisible(false);
		}
		dispatch(listProducts());
		return () => {};
	}, [successSave, successDelete]);

	const openModal = (product) => {
		setModalVisible(true);
		setId(product._id);
		setName(product.name);
		setPrice(product.price);
		setDescription(product.description);
		setImage(product.image);
		setBrand(product.brand);
		setCategory(product.category);
		setCountInStock(product.countInStock);
	};

	const onImageChange = (e) => {
		setUploading(true);
		setImage(e.target.files[0]);
		setUploading(false);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('_id', id);
		formData.append('name', name);
		formData.append('price', price);
		formData.append('productImage', image);
		formData.append('brand', brand);
		formData.append('category', category);
		formData.append('countInStock', countInStock);
		formData.append('description', description);

		dispatch(saveProduct(formData));
	};
	const deleteHandler = (product) => {
		dispatch(deleteProdcut(product._id));
	};

	return (
		<div className="content content-margined">
			<div className="product-header">
				<h1 className="title_for_product_listing">All Listed Products</h1>
				<button
					className="button primary"
					onClick={() => openModal({})}
				>
					Add New Product
				</button>
			</div>
			{modalVisible && (
				<div className="update_product_form">
					<form onSubmit={submitHandler}>
						<div>
							<div>
								<h2 className="update_product_title">
									{' '}
									{id ? 'Update' : 'Create'} Product
								</h2>
							</div>
							<div>
								{loadingSave && <div>Loading...</div>}
								{errorSave && <div>{errorSave}</div>}
							</div>

							<div className="individual_div_in_update_product">
								<label
									htmlFor="name"
									className="field_label_in_form"
								>
									Name
								</label>
								<input
									type="text"
									name="name"
									value={name}
									id="name"
									required
									onChange={(e) => setName(e.target.value)}
								></input>
							</div>
							<div className="individual_div_in_update_product">
								<label
									htmlFor="price"
									className="field_label_in_form"
								>
									Price
								</label>
								<input
									type="number"
									min="1"
									name="price"
									value={price}
									id="price"
									required
									onChange={(e) => setPrice(e.target.value)}
								></input>
							</div>
							<div className="individual_div_in_update_product">
								<label
									htmlFor="image"
									className="field_label_in_form"
								>
									Image
								</label>

								<input
									type="file"
									name="productImage"
									id="productImage"
									required
									accept="image/png, image/gif, image/jpeg"
									onChange={onImageChange}
								/>
								{uploading && <div>Uploading...</div>}
							</div>
							<div className="individual_div_in_update_product">
								<label
									htmlFor="brand"
									className="field_label_in_form"
								>
									Brand
								</label>
								<input
									type="text"
									name="brand"
									value={brand}
									id="brand"
									required
									onChange={(e) => setBrand(e.target.value)}
								></input>
							</div>
							<div className="individual_div_in_update_product">
								<label
									htmlFor="countInStock"
									className="field_label_in_form"
								>
									Available Stock
								</label>
								<input
									type="text"
									name="countInStock"
									value={countInStock}
									id="countInStock"
									required
									onChange={(e) => setCountInStock(e.target.value)}
								></input>
							</div>
							<div className="individual_div_in_update_product">
								<label
									htmlFor="name"
									className="field_label_in_form"
								>
									Category
								</label>
								<input
									type="text"
									name="category"
									value={category}
									id="category"
									required
									onChange={(e) => setCategory(e.target.value)}
								></input>
							</div>
							<div className="individual_div_in_update_product">
								<label
									htmlFor="description"
									className="field_label_in_form"
								>
									Description
								</label>
								<textarea
									name="description"
									value={description}
									id="description"
									rows="10"
									onChange={(e) => setDescription(e.target.value)}
								></textarea>
							</div>
							<div className="individual_div_in_update_product">
								<div className="update_and_back_btn_div">
									<button
										type="submit"
										className="button primary"
									>
										{id ? 'Update' : 'Create'}
									</button>
									<button
										type="button"
										onClick={() => {
											setModalVisible(false);
										}}
										className="button primary"
									>
										Back
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			)}

			<div className="product-list">
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Price($)</th>
							<th>Category</th>
							<th>Brand</th>
							<th className="Action_btn_in_table">Action</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>{product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<button
										className="button"
										onClick={() => openModal(product)}
									>
										Edit
									</button>{' '}
									<button
										className="button"
										onClick={() => deleteHandler(product)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
export default ProductsScreen;
