import type { InputProps } from 'src/utils/types/components.public';

const Input: React.FC<InputProps> = (props) => {
	return (
		<div className={props.decoration}>
			{props.label && (
				<label htmlFor={props.id} className="body-2 font-medium text-font-1000">
					{props.label}
				</label>
			)}
			<input
				type={props.type}
				id={props.id}
				name={props.name}
				className="body-3 base-input-slim text-font-900"
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
			/>
		</div>
	);
};

export default Input;
