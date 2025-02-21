export type TFormStats = {
    fieldCount: number;
    usageCount: number;
}

export enum EInputTypes {
    "TEXT"="text",
    "SELECT"="select",
    "NUMBER"="number"
}

export enum ESchemaInputTypes {
    "TEXT"="text",
    "SELECT"="select",
    "NUMBER"="number",
    "CHECKBOX" = "checkbox"
}

export type TValidations = {
    name: string;
    referenceValue: string | number | boolean | Array<string | number>;
}

export type TProperties = {
    name: string;
    value: string;
}

export type TTextInputElement = {
    value: string;
    onChange: (fieldName: string, value: string) => void
    id: string;
    name: string;
    label: string;
    placeholder: string;
    required?: boolean;
    maxLength?: number;
    hidden: boolean;
    error?: string;
}

export type TNumericInputElement = {
    value: number;
    onChange: (fieldName: string, value: number) => void
    id: string;
    name: string;
    label: string;
    placeholder: string;
    min?: number;
    max?: number;
    required: boolean;
    hidden: boolean;
    postfix?: string;
    error?: string;
}

export type TSelectInputElement = {
    value: string;
    onChange: (fieldName: string, value: string) => void
    id: string;
    name: string;
    label: string;
    list: {label: string; value: string}[]
    required: boolean;
    hidden: boolean;
    error?: string;
}

export type TCheckboxInputElement = {
    value: boolean;
    onChange: (fieldName: string, value: boolean) => void
    id: string;
    name: string;
    label: string;
    required: boolean;
    hidden: boolean;
    error?: string;
}

export type TInputElementSchema = {
    id: string;
    name: string;
    label: string;
    type: EInputTypes;
    hidden: boolean;
    required: boolean;
    placeholder?: string;
    list?: {label: string; value: string}[]
    postfix?: string;
    min?: number;
    max?: number;
    maxLength?: number;
}

export type TFormSchema = {
    version: "1.0.0",
    elements: Record<string, TInputElementSchema>,
};

export type TManagedForm = {
    name: string;
    createdAt: string;
    description: string;
    stats: TFormStats;
    schema: TFormSchema;
  };