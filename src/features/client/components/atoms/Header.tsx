import type { HeaderProps } from '@feature/admin/types/commun.type';

const Header: React.FC<HeaderProps> = (props) => {
	return (
		<header className="h-fit w-full container-base flex flex-col items-start justify-center gap-1">
			<h1 className="header-4 text-font-1000">{props.title}</h1>
			<p className="body-3 text-font-600">{props.subtitle}</p>
		</header>
	);
};

export default Header;
