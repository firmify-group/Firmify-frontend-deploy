import logoImg from 'src/assets/img/logo.png';
import { menuItemsAdmin, exitItem } from 'src/utils/constant/components';
import { useDispatch } from 'react-redux';
import { removeAuth } from 'src/store/auth';
import { Outlet, NavLink } from 'react-router';

const ManagerLayout: React.FC = () => {
	const dispatch = useDispatch();

	const handleExit = () => {
		dispatch(removeAuth());
	};
	return (
		<div className="flex size-full gap-4">
			<nav className="h-full w-72 container-base flex flex-col justify-between items-start gap-12">
				<header className="flex flex-row gap-2 size-fit">
					<img className="size-12" src={logoImg} alt="logo firmify" />
					<div className="size-full flex flex-col items-start justify-center">
						<h1 className="font-bold font-manrope text-xl text-font-1000">Firmify</h1>
						<h2 className="body-4 italic font-normal text-font-800">
							Certificaciones Web
						</h2>
					</div>
				</header>
				<main className="flex flex-col justify-start items-center size-full pl-1 gap-2">
					<p className="body-1 text-font-700 text-start w-full">MENU</p>
					<ul className="flex flex-col gap-2 w-full">
						{menuItemsAdmin.map((item) => (
							<li key={item.label}>
								<NavLink
									to={`/manager/${item.path}`}
									className={({ isActive }) =>
										`font-link no-underline flex items-center gap-2 text-font-900 header-6 font-normal cursor-pointer transition-colors w-full text-left rounded-l-md py-2 px-3 ${
											isActive
												? 'text-primary-500 header-6 font-semibold bg-[#E5F7FE] border-r-[2.5px] border-primary-500'
												: 'hover:bg-gray-50'
										}`
									}
								>
									{({ isActive }) => (
										<>
											<img
												src={isActive ? item.icon : item.iconDisabled}
												alt={item.label}
												className="size-5"
											/>
											{item.label}
										</>
									)}
								</NavLink>
							</li>
						))}
					</ul>
				</main>
				<footer>
					<ul className="flex flex-col gap-4 w-full">
						<li>
							<NavLink
								to={exitItem.path}
								onClick={handleExit}
								className={({ isActive }) =>
									`font-link no-underline flex items-center gap-2 text-font-900 header-6 font-normal cursor-pointer transition-colors w-full text-left rounded-md py-2 px-3 ${
										isActive
											? 'text-primary-500 header-6 font-semibold bg-[#E5F7FE]'
											: 'hover:bg-gray-50'
									}`
								}
							>
								{({ isActive }) => (
									<>
										<img
											src={isActive ? exitItem.icon : exitItem.iconDisabled}
											alt={exitItem.label}
											className="size-5"
										/>
										<span>{exitItem.label}</span>
									</>
								)}
							</NavLink>
						</li>
					</ul>
				</footer>
			</nav>
			<main className="flex flex-col items-baseline size-full gap-4 *:w-full">
				<Outlet />
			</main>
		</div>
	);
};

export default ManagerLayout;
