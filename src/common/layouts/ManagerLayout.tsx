import { Fragment } from 'react/jsx-runtime';

const ManagerLayout: React.FC = () => {
	return (
		<>
			<nav className="h-full w-64 bg-font-100 rounded-xl shadow-2xl">
				<ul>
					<li>Inicio</li>
					<li>Solicitudes</li>
					<li>Funcionarios</li>
				</ul>
				<ul>
					<li>Cerrar sesión</li>
				</ul>
			</nav>
			<main className="flex flex-row h-full w-full">
				<header className="h-full w-64 bg-font-100 rounded-xl shadow-2xl">Titulo</header>
				<section className="h-full w-64 bg-font-100 rounded-xl shadow-2xl">Body</section>
			</main>
		</>
	);
};

export default ManagerLayout;
