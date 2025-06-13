import type { FETCH_STATUS } from "../constant/API";


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

export type InputsFormType = {
	name: string;
	label: string;
	type: string;
	placeholder: string;
	pattern: string;
	maxLength: number;
	minLength: number;
	alert: string;
};

export type Slot = {
	children: React.ReactNode;
};

export type AuthMiddlewareProps = {
	requiredRoles?: string[];
	redirectPath?: string;
};

export type FetchStatus = (typeof FETCH_STATUS)[keyof typeof FETCH_STATUS]
export type RequestBody = BodyInit | Record<string, unknown> | null | undefined