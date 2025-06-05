const ManagerLayout: React.FC<React.ReactNode> = (children) => {
	return (
		<div className="flex h-screen">
			<nav className="h-full w-64 container-base flex flex-col justify-between">
				<ul className="flex flex-col gap-4 p-4">
					<li className="font-link">Inicio</li>
					<li className="font-link">Solicitudes</li>
					<li className="font-link">Funcionarios</li>
				</ul>
				<ul className="p-4">
					<li className="font-link">Cerrar sesión</li>
				</ul>
			</nav>
			<main className="flex flex-col items-baseline size-full gap-5 *:w-full *:p-5 overflow-auto">
				{children}
			</main>
		</div>
	);
};

export default ManagerLayout;
