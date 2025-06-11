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