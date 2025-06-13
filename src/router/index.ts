import React from 'react';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				// path: "/", //Se redirecciona de forma automatica
				path: '/landing', //Se redirecciona de forma automatica
				Component: React.lazy(() => import('src/pages/LandingPage')),
			},
			{
				path: '/',
				Component: React.lazy(() => import('src/pages/LoginPage')),
			},
		],
	},
	{
		path: '/manager',
		children: [
			{
				Component: React.lazy(() => import('src/components/layout/ManagerLayout')),
				children: [
					{
						path: 'home',
						Component: React.lazy(() => import('src/pages/manager/HomePage')),
					},
					{
						path: 'requests',
						Component: React.lazy(() => import('src/pages/manager/RequestPage')),
					},
					{
						path: 'users',
						Component: React.lazy(() => import('src/pages/manager/UserPage')),
					},
				],
			},
		],
	},
	{
		path: '/client',
		children: [
			{
				Component: React.lazy(() => import('src/components/layout/ClientLayout')),
				children: [
					{
						path: 'process',
						Component: React.lazy(
							() => import('src/pages/client/HomeClientPage'),
						),
					},
				],
			},
		],
	},
]);

export default router;
