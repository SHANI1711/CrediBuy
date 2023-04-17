import React, { useState, useEffect } from 'react';
import { logout, updateUserProfile, detailsUser } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import '../css/ProfileScreen.css';

function ProfileScreen(props) {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logout());
		props.history.push('/signin');
	};
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const {
		success: successUpdate,
		error: errorUpdate,
		loading: loadingUpdate,
	} = userUpdateProfile;

	useEffect(() => {
		if (!user) {
			dispatch({ type: USER_UPDATE_PROFILE_RESET });
			dispatch(detailsUser(userInfo._id));
		} else {
			setName(user.name);
			setEmail(user.email);
		}
	}, [dispatch, userInfo._id, user]);
	const submitHandler = (e) => {
		e.preventDefault();
		// dispatch update profile
		if (password !== confirmPassword) {
			alert('Password and Confirm Password Are Not Matched');
		} else {
			dispatch(
				updateUserProfile({
					name,
					email,
					password,
				})
			);
		}
	};

	return (
		<div>
			<form
				className="form"
				onSubmit={submitHandler}
			>
				<div>
					<h1 className="title_in_profile_management_screen">
						Profile Management
					</h1>
				</div>
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<>
						{loadingUpdate && <LoadingBox></LoadingBox>}
						{errorUpdate && (
							<MessageBox variant="danger">{errorUpdate}</MessageBox>
						)}
						{successUpdate && (
							<MessageBox variant="success">
								Profile Updated Successfully
							</MessageBox>
						)}
						<div>
							<label htmlFor="name">Name</label>
							<input
								id="name"
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<input
								id="email"
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="password">Change Password</label>
							<input
								id="password"
								type="password"
								placeholder="Enter password"
								onChange={(e) => setPassword(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor="confirmPassword">Confirm Change Password</label>
							<input
								id="confirmPassword"
								type="password"
								placeholder="Enter confirm password"
								onChange={(e) => setConfirmPassword(e.target.value)}
							></input>
						</div>

						<div>
							<label />
							<button
								className="profile_update_btn"
								type="submit"
							>
								Update
							</button>
						</div>
					</>
				)}
			</form>
		</div>
	);
}

export default ProfileScreen;
