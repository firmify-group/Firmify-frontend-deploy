import React from 'react';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
	{
		path: '/',
		Component: React.lazy(() => import('../layouts/ManagerLayout')),
	},
]);

export default router;
