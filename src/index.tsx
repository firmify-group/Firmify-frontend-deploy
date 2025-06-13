import React from 'react';
import reactDom from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import router from './router';
import { store } from './store';
import './assets/css/APP.css';

const rootEl = document.getElementById('root');

if (rootEl) {
	const root = reactDom.createRoot(rootEl);
	root.render(
		<React.StrictMode>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</React.StrictMode>,
	);
}
