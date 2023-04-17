import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './css/index.css';
import App from './App';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<App />
		<ToastContainer
			position="top-right"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="light"
		/>
	</Provider>,
	document.getElementById('root')
);
