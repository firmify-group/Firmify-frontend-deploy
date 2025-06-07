import React from 'react';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				// path: "/", //Se redirecciona de forma automatica
				path: '/landing', //Se redirecciona de forma automatica
				Component: React.lazy(() => import('src/features/public/pages/LandingPage')),
			},
			{
				path: '/',
				Component: React.lazy(() => import('src/features/public/pages/LoginPage')),
			},
		],
	},
	{
		path: '/manager',
		children: [
			{
				Component: React.lazy(() => import('@shared/layouts/ManagerLayout.tsx')),
				children: [
					{
						path: 'home',
						Component: React.lazy(() => import('@feature/admin/pages/HomePage.tsx')),
					},
					{
						path: 'requests',
						Component: React.lazy(() => import('@feature/admin/pages/RequestPage.tsx')),
					},
					{
						path: 'users',
						Component: React.lazy(() => import('@feature/admin/pages/UserPage.tsx')),
					},
				],
			},
		],
	},
]);

export default router;
