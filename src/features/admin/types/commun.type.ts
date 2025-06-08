export type HeaderProps = {
	title: string;
	subtitle?: string;
};


export type InputProps = {
	id?: string;
	name?: string;
	type?: string;
	placeholder?: string;
	decoration?: string;
	label?: string;
	value?: string | number;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
};