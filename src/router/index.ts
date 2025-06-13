import React from 'react';
import { createBrowserRouter } from 'react-router';
import { AuthMiddleware } from 'src/config/middleware/AuthMiddleware';
import { GuestMiddleware } from 'src/config/middleware/GuestMiddleware';
import { ROLE } from 'src/utils/constant/path';

const router = createBrowserRouter([
	{
		path: '/',
		element: React.createElement(GuestMiddleware),
		children: [
			{
				path: "/",
				Component: React.lazy(() => import('src/pages/LandingPage')),
			},
			{
				path: '/login',
				Component: React.lazy(() => import('src/pages/LoginPage')),
			},
		],
	},
	{
		path: '/manager',
		element: React.createElement(AuthMiddleware, { requiredRoles: [ROLE.ADMIN] }),
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
		element: React.createElement(AuthMiddleware, { requiredRoles: [ROLE.USER] }),
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
