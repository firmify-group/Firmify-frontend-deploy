import type { InputProps } from 'src/utils/types/components.public';

const Input: React.FC<InputProps> = (props) => {
	let inputValue: string | number | undefined;
	if (props.value instanceof Date) {
		inputValue = props.value.toISOString().slice(0, 10);
	} else if (props.value instanceof File) {
		inputValue = props.value.name;
	} else {
		inputValue = props.value;
	}

	return (
		<div className={props.decoration}>
			{props.label && (
				<label htmlFor={props.id} className="body-2 font-normal text-font-1000">
					{props.label}
				</label>
			)}
			<input
				type={typeof props.type === 'string' ? props.type : 'text'}
				id={props.id}
				disabled={props.disabled}
				name={props.name}
				className="body-3 base-input-slim text-font-900"
				placeholder={props.placeholder}
				value={inputValue}
				onChange={props.onChange}
				required={props.required}
			/>
		</div>
	);
};

export default Input;
