import placeholderImg from '@shared/assets/img/placeholder.png';
import decorationImg from '@shared/assets/img/folder.png';

interface MonitoringSummaryProps {
	children: React.ReactNode;
}

const LoginSpace: React.FC<MonitoringSummaryProps> = ({ children }) => {
	return (
		<>
			<main className="size-full flex flex-col items-baseline gap-5 *:w-full">
				{children}
			</main>
			<aside className="bg-primary-500 size-full p-32 flex flex-col place-content-center gap-10 text-center rounded-2xl">
				<header>
					<h1 className="font-extrabold font-manrope text-[1.7rem] 2xl:text-3xl text-font-100">
						Certifica con total seguridad con Firmify
					</h1>
					<h2 className="font-normal 2xl:text-2xl text-xl text-font-100">
						Comletamente amigable y fácil de usar
					</h2>
				</header>
				<section className="relative">
					<img
						className="h-fit w-full rounded-md"
						src={placeholderImg}
						alt="placeholder firmify"
						id="login-img-background"
					/>
					<img
						className="absolute size-52 2xl:top-61 2xl:left-[39rem] top-38 left-[27rem] rotate-18"
						src={decorationImg}
						alt="decoration of placeholder"
					/>
				</section>

				<footer className="body-3 2xl:text-body-1 text-font-100">
					Con nuestro servicio, cumple tus metas y optimiza tu trabajo de forma eficiente.
					¡No esperes más y solicita tus vacaciones ahora!
				</footer>
			</aside>
		</>
	);
};

export default LoginSpace;
