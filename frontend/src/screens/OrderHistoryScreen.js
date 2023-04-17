import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { deleteOrder } from '../actions/orderActions';
import { toast } from 'react-toastify';

export default function OrderHistoryScreen(props) {
	const myOrderList = useSelector((state) => state.myOrderList);
	const { loading, error, orders } = myOrderList;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listMyOrders());
	}, [dispatch]);

	const deleteHandler = (order) => {
		const reloadAndShowToast = () => {
			toast.success('Your order has been deleted successfully!!', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		};
		reloadAndShowToast();
		dispatch(deleteOrder(order._id));
	};

	return (
		<div>
			<h1>Order History</h1>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>{order.totalPrice.toFixed(2)}</td>
								<td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
								<td>
									{order.isDelivered
										? order.deliveredAt.substring(0, 10)
										: 'No'}
								</td>
								<td>
									<button
										type="button"
										className="button_in_order_page"
										onClick={() => {
											props.history.push(`/order/${order._id}`);
										}}
									>
										Details
									</button>
									<button
										type="button"
										onClick={() => deleteHandler(order)}
										className="button_in_order_page"
									>
										Cancel Order
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
