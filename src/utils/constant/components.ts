import homeEnable from 'src/assets/icons/home-enable.png';
import homeDisable from 'src/assets/icons/home-disable.png';
import reportEnable from 'src/assets/icons/report-enable.png';
import reportDisable from 'src/assets/icons/report-disable.png';
import cardGroupEnable from 'src/assets/icons/card-group-enable.png';
import cardGroupDisable from 'src/assets/icons/card-group-disable.png';
import exitEnable from 'src/assets/icons/exit-enable.png';
import exitDisable from 'src/assets/icons/exit-disable.png';

export const InputsForm = [
	{
		name: 'email',
		label: 'Correo electrónico',
		type: 'email',
		placeholder: 'correo@ejemplo.com',
		pattern: '^[\\w.]+@([\\w.]+)\\.[\\w]{2,4}$',
		maxLength: 150,
		minLength: 0,
		alert: 'Por favor ingresa un correo válido.',
	},
	{
		name: 'password',
		label: 'Contraseña',
		type: 'password',
		placeholder: '********',
		pattern: '.*',
		maxLength: 150,
		minLength: 8,
		alert: 'Por favor ingresa un contraseña válido.',
	},
];

export const menuItemsClient = [
	{
		label: 'Inicio',
		path: 'process',
		icon: homeEnable,
		iconDisabled: homeDisable,
	},
];

export const exitItem = {
	label: 'Cerrar sesión',
	path: '/',
	icon: exitEnable,
	iconDisabled: exitDisable,
};

export const menuItemsAdmin = [
	{
		label: 'Inicio',
		path: 'home',
		icon: homeEnable,
		iconDisabled: homeDisable,
	},
	{
		label: 'Solicitudes',
		path: 'requests',
		icon: reportEnable,
		iconDisabled: reportDisable,
	},
	{
		label: 'Funcionarios',
		path: 'users',
		icon: cardGroupEnable,
		iconDisabled: cardGroupDisable,
	},
];

export const COLORS = [
	'#2563eb',
	'#16a34a',
	'#ea580c',
	'#db2777',
	'#7c3aed',
	'#f59e42',
	'#0ea5e9',
	'#f43f5e',
];
