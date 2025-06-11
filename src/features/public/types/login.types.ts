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
