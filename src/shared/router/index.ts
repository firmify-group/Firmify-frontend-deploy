import React from 'react';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{
				// path: "/", //Se redirecciona de forma automatica
				path: "/landing", //Se redirecciona de forma automatica
				Component: React.lazy(() => import('@feature/auth/pages/LandingPage.tsx')),

			},
			{
				path: '/',
				Component: React.lazy(() => import('@feature/auth/pages/LoginPage.tsx')),
			}

		]

	}

]);

export default router;
