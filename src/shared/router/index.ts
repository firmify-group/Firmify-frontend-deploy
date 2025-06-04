import React from 'react';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
	{
		path: '/',
		Component: React.lazy(() => import('@feature/auth/pages/LoginPage.tsx')),
	},
]);

export default router;
