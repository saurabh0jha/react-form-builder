import { EInputTypes, TInputElementSchema } from "../types/globals";
import * as yup from "yup";
export declare const getElementSchema: (type?: EInputTypes, initialValues?: TInputElementSchema) => TInputElementSchema;
export declare const getValidationSchema: (type?: EInputTypes) => yup.ObjectSchema<{
    name: string;
    label: string;
    type: "text";
    placeholder: string;
    hidden: NonNullable<boolean | undefined>;
    required: NonNullable<boolean | undefined>;
    maxLength: number;
}, yup.AnyObject, {
    name: undefined;
    label: undefined;
    type: undefined;
    placeholder: undefined;
    hidden: undefined;
    required: undefined;
    maxLength: undefined;
}, ""> | yup.ObjectSchema<{
    name: string;
    label: string;
    type: "number";
    placeholder: string;
    hidden: NonNullable<boolean | undefined>;
    required: NonNullable<boolean | undefined>;
    min: number;
    max: number;
    postfix: string;
}, yup.AnyObject, {
    name: undefined;
    label: undefined;
    type: undefined;
    placeholder: undefined;
    hidden: undefined;
    required: undefined;
    min: undefined;
    max: undefined;
    postfix: undefined;
}, ""> | yup.ObjectSchema<{
    name: string;
    label: string;
    type: "select";
    hidden: NonNullable<boolean | undefined>;
    required: NonNullable<boolean | undefined>;
    list: any[];
}, yup.AnyObject, {
    name: undefined;
    label: undefined;
    type: undefined;
    hidden: undefined;
    required: undefined;
    list: undefined;
}, "">;
