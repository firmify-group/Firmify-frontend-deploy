import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
	plugins: [pluginReact()],

	source: {
		define: {
			__API_URL__: JSON.stringify(process.env.REACT_APP_API_URL || 'http://localhost:8000'),
		},
	},


});
