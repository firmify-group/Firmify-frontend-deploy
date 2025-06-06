import logoImg from '@shared/assets/img/logo.png';
import homeEnable from '@shared/assets/icons/home-enable.png';
import homeDisable from '@shared/assets/icons/home-disable.png';
import exitEnable from '@shared/assets/icons/exit-enable.png';
import exitDisable from '@shared/assets/icons/exit-disable.png';
import reportEnable from '@shared/assets/icons/report-enable.png';
import reportDisable from '@shared/assets/icons/report-disable.png';
import cardGroupEnable from '@shared/assets/icons/card-group-enable.png';
import cardGroupDisable from '@shared/assets/icons/card-group-disable.png';

import { Outlet } from 'react-router';
import { useState } from 'react';

const ManagerLayout: React.FC = () => {
	const [selected, setSelected] = useState('Inicio');

	const menuItems = [
		{ label: 'Inicio', icon: homeEnable, iconDisabled: homeDisable },
		{ label: 'Solicitudes', icon: reportEnable, iconDisabled: reportDisable },
		{ label: 'Funcionarios', icon: cardGroupEnable, iconDisabled: cardGroupDisable },
	];

	return (
		<div className="flex size-full">
			<nav className="h-full w-72 container-base flex flex-col justify-between items-start gap-14">
				<header className="flex flex-row gap-2 size-fit">
					<img className="size-12" src={logoImg} alt="logo firmify" />
					<div className="size-full flex flex-col items-start justify-center">
						<h1 className="font-bold font-manrope text-xl text-font-1000">Firmify</h1>
						<h2 className="body-4 italic font-normal text-font-800">
							Certificaciones Web
						</h2>
					</div>
				</header>
				<main className="flex flex-col justify-start items-center size-full pl-1 gap-3">
					<p className="body-1 text-font-700 text-start w-full">MENU</p>
					<ul className="flex flex-col gap-2 w-full">
						{menuItems.map((item) => (
							<li key={item.label}>
								<button
									type="button"
									className={`font-link no-underline flex items-center gap-2 text-font-600 header-6 font-normal cursor-pointer transition-colors w-full text-left rounded-md py-2 px-3  ${
										selected === item.label
											? 'text-primary-500 header-6 font-semibold bg-[#E5F7FE] '
											: ''
									}`}
									onClick={() => setSelected(item.label)}
								>
									<img
										src={
											selected === item.label ? item.icon : item.iconDisabled
										}
										alt={item.label}
										className="size-5"
									/>
									{item.label}
								</button>
							</li>
						))}
					</ul>
				</main>
				<footer>
					<ul className="flex flex-col gap-4 w-full">
						<li>
							<button
								type="button"
								className={`font-link no-underline flex items-center gap-2 text-font-600 header-6 font-normal cursor-pointer transition-colors w-full text-left rounded-md py-2 px-3  ${
									selected === 'Cerrar sesión'
										? 'text-primary-500 header-6 font-semibold bg-[#E5F7FE]'
										: ''
								}`}
								onClick={() => setSelected('Cerrar sesión')}
							>
								<img
									src={selected === 'Cerrar sesión' ? exitEnable : exitDisable}
									alt="Cerrar sesión"
									className="size-5"
								/>
								<span>Cerrar sesión</span>
							</button>
						</li>
					</ul>
				</footer>
			</nav>
			<main className="flex flex-col items-baseline size-full gap-5 *:w-full *:p-5 overflow-auto">
				<Outlet />
			</main>
		</div>
	);
};

export default ManagerLayout;
