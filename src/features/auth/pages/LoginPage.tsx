import placeholderImg from '@shared/assets/img/placeholder.png';
import decorationImg from '@shared/assets/img/folder.png';
import logoImg from '@shared/assets/img/logo.png';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const LoginPage: React.FC = () => {
	return (
		<>
			<article className="size-full flex flex-col items-baseline gap-5 *:w-full *: ">
				<header className="flex flex-row gap-2 h-fit p-5">
					<img className="size-16" src={logoImg} alt="logo firmify" />
					<div className="size-full flex flex-col items-start justify-center">
						<h1 className="font-bold font-manrope text-[1.4rem] 2xl:text-3xl text-font-1000">
							Firmify
						</h1>
						<h2 className="body-1 italic font-normal text-font-800">
							Certificaciones Web
						</h2>
					</div>
				</header>
				<main className="size-full flex flex-col place-content-center px-32 2xl:px-52 gap-9">
					<header className="h-fit w-full gap-3 flex flex-col">
						<h1 className="header-2  2xl:header-1  text-font-1000">
							Bienvenido de vuelta <span className="emoji">👋</span>
						</h1>
						<p className="font-manrope 2xl:header-6 leading-normal font-normal text-font-800">
							Hoy es un nuevo día. Inicia sesión para empezar a gestionar tus
							documentos.
						</p>
					</header>
					<form
						className="flex flex-col gap-10 w-full h-fit **:body-1"
						onSubmit={(e) => e.preventDefault()}
						noValidate
					>
						<section className="w-full h-fit flex flex-col gap-4 ">
							<div className="flex flex-col gap-1  ">
								<label htmlFor="email" className="text-font-1000">
									Correo electrónico
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="base-input"
									placeholder="correo@ejemplo.com"
									required
									pattern="^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"
								/>
								<span className="text-red-500 text-sm hidden" id="email-error">
									Por favor ingresa un correo válido.
								</span>
							</div>
							<div className="flex flex-col gap-1">
								<label htmlFor="password" className="text-font-1000">
									Contraseña
								</label>
								<input
									type="password"
									id="password"
									name="password"
									className="base-input"
									placeholder="********"
									required
									minLength={6}
								/>
								<span className="text-red-500 text-sm hidden" id="password-error">
									La contraseña debe tener al menos 6 caracteres.
								</span>
							</div>
						</section>
						<button type="submit" className="button button-primary-IDLE">
							Iniciar sesión
						</button>
					</form>
					<footer className="flex gap-2 h-24 items-end">
						<ArrowLeftIcon className="size-6 text-font-900" />
						<span className="body-1 text-font-900">Volver a la pagina de inicio.</span>
					</footer>
				</main>
			</article>
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

export default LoginPage;
