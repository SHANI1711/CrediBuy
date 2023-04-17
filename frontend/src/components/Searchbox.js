import React, { useState, useEffect } from 'react';
import '../css/SearchBox.css';
export default function Searchbox(props) {
	const [searchKeyword, setSearchKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		props.history.replace(`/search/?q=${searchKeyword}`);
	};

	return (
		<div className="loading">
			<form onSubmit={submitHandler}>
				<input
					name="searchKeyword"
					placeholder="search product"
					className="search_input_field"
					onChange={(e) => {
						setSearchKeyword(e.target.value);
					}}
				/>
				<button
					className="submit_btn"
					type="submit"
				>
					Search
				</button>
			</form>
		</div>
	);
}
