const ManagerLayout: React.FC = () => {
	return (
		<>
			<nav className="h-full w-64 container-base">
				<ul>
					<li>Inicio</li>
					<li>Solicitudes</li>
					<li>Funcionarios</li>
				</ul>
				<ul>
					<li>Cerrar sesión</li>
				</ul>
			</nav>
			<main className="flex flex-col items-baseline size-full gap-5 *:w-full *:p-5">
				<header className="h-24 container-base">Titulo</header>
				<section className="h-full container-base">Body</section>
			</main>
		</>
	);
};

export default ManagerLayout;
