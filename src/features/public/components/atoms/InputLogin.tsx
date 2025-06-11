import type { InputsFormType } from '@feature/public/types/login.types.ts';

const InputLogin: React.FC<InputsFormType> = (props) => {
	return (
		<div className="flex flex-col gap-1  ">
			<label htmlFor="email" className="text-font-1000">
				{props.label}
			</label>
			<input
				id={props.name}
				className="base-input"
				placeholder={props.placeholder}
				required
				pattern={props.pattern}
				type={props.type}
				name={props.name}
				autoComplete={props.type}
				aria-describedby="email-error"
				aria-invalid="false"
				min={props.minLength}
				max={props.maxLength}
			/>
			<span
				className="text-red-500 text-sm hidden"
				id="email-error"
				role="alert"
				aria-live="polite"
			>
				{props.alert}
			</span>
		</div>
	);
};

export default InputLogin;
