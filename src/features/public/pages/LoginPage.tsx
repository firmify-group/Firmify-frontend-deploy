import LoginSpace from '@feature/public/components/organisms/LoginSpace.tsx';
import HeaderIcon from '@feature/public/components/atoms/HeaderIcon.tsx';
import FormLogin from '@feature/public/components/molecules/FormLogin';
import InputLogin from '@feature/public/components/atoms/InputLogin';
import { InputsForm } from '@feature/public/types/login.const.ts';

const LoginPage: React.FC = () => {
	return (
		<LoginSpace>
			<HeaderIcon />
			<section className="size-full flex flex-col place-content-center px-32 2xl:px-52 gap-9">
				<header className="h-fit w-full gap-3 flex flex-col">
					<h1 className="header-2  2xl:header-1  text-font-1000">
						Bienvenido de vuelta <span className="emoji">👋</span>
					</h1>
					<p className="font-manrope 2xl:header-6 leading-normal font-normal text-font-800">
						Hoy es un nuevo día. Inicia sesión para empezar a gestionar tus documentos.
					</p>
				</header>
				<FormLogin>
					{InputsForm.map((input) => (
						<InputLogin
							key={input.name}
							label={input.label}
							name={input.name}
							placeholder={input.placeholder}
							type={input.type}
							pattern={input.pattern}
							minLength={input.minLength}
							maxLength={input.maxLength}
							alert={input.alert}
						/>
					))}
				</FormLogin>
			</section>
		</LoginSpace>
	);
};

export default LoginPage;
