import logoImg from '@shared/assets/img/logo.png';

const HeaderIcon: React.FC = () => {
	return (
		<header className="flex flex-row gap-2 h-fit p-5">
			<img className="size-16" src={logoImg} alt="logo firmify" />
			<div className="size-full flex flex-col items-start justify-center">
				<h1 className="font-bold font-manrope text-[1.4rem] 2xl:text-3xl text-font-1000">
					Firmify
				</h1>
				<h2 className="body-1 italic font-normal text-font-800">Certificaciones Web</h2>
			</div>
		</header>
	);
};

export default HeaderIcon;
