import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';

import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function UserlistScreen(props) {
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listUsers());
		return () => {};
	}, [dispatch]);

	const deleteHandler = (e) => {
		if (window.confirm('Confirm Delete User?')) {
			dispatch(deleteUser(e._id));
			window.location.reload();
		}
	};
	return (
		<div>
			<h1>Users</h1>
			{loading && <LoadingBox></LoadingBox>}
			{error && <MessageBox variant="danger">{error}</MessageBox>}
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>IS ADMIN</th>
							<th>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.isAdmin ? 'YES' : 'NO'}</td>
								<td>
									<button
										type="button"
										className="button_in_order_page"
										onClick={() => deleteHandler(user)}
									>
										Delete User
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

export default UserlistScreen;
