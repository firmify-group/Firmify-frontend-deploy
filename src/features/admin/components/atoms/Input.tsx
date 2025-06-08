import type { InputProps } from '@feature/admin/types/commun.type';

const Input: React.FC<InputProps> = (props) => {
	return (
		<div className={props.decoration}>
			<label htmlFor={props.id} className="body-2 font-medium text-font-1000">
				Nombre de funcionario
			</label>
			<input
				type={props.type}
				id={props.id}
				name={props.name}
				className="body-3 base-input-slim text-font-900"
				placeholder={props.placeholder}
			/>
		</div>
	);
};

export default Input;
