import { v4 as uuidv4 } from 'uuid';
import { EInputTypes, TInputElementSchema } from "../types/globals";
import * as yup from "yup";


const defaultSchema = {
    id: "",
    name: "Enter Input name ...",
    label: "Add a label",
    type: EInputTypes.TEXT,
    placeholder: "Enter any placeholder ...",
    hidden: false,
    required: false,
    maxLength: 100,
    isValid: true,
};

export const getElementSchema = (type = EInputTypes.TEXT, initialValues: TInputElementSchema = { ...defaultSchema }): TInputElementSchema => {

    switch (type) {
        case EInputTypes.TEXT:
            return Object.assign({}, {
                id: initialValues.id || uuidv4(),
                name: initialValues.name || "Enter Input name ...",
                label: initialValues.label || "Add a label",
                type: EInputTypes.TEXT,
                placeholder: initialValues.placeholder || "Enter any placeholder ...",
                hidden: initialValues.hidden || false,
                required: initialValues.required || false,
                maxLength: 100,
                isValid: true,
            });
        case EInputTypes.NUMBER:
            return Object.assign({}, {
                id: initialValues.id || uuidv4(),
                name: initialValues.name || "Enter Input name ...",
                label: initialValues.label || "Add a label",
                type: EInputTypes.NUMBER,
                placeholder: initialValues.placeholder || "Enter any placeholder ...",
                hidden: initialValues.hidden || false,
                required: initialValues.required || false,
                min: 1,
                max: 100,
                postfix: "Years",
                isValid: true,
            });
        case EInputTypes.SELECT:
            return Object.assign({}, {
                id: initialValues.id || uuidv4(),
                name: initialValues.name || "Enter Input name ...",
                label: initialValues.label || "Add a label",
                type: EInputTypes.SELECT,
                hidden: initialValues.hidden || false,
                required: initialValues.required || false,
                list: [],
                isValid: true,

            });
        default:
            return Object.assign({}, { ...defaultSchema });
    }

}


export const getValidationSchema = (type = EInputTypes.TEXT) => {

    switch (type) {
        case EInputTypes.TEXT:
            return yup.object().shape({
                name: yup.string().required(),
                label: yup.string().required(),
                type: yup.string().oneOf(["text"]).required(),
                placeholder: yup.string().required(),
                hidden: yup.boolean().required(),
                required: yup.boolean().required(),
                maxLength: yup.number().positive().required()
            });
        case EInputTypes.NUMBER:
            return yup.object().shape({
            name: yup.string().required(),
            label: yup.string().required(),
            type: yup.string().oneOf(["number"]).required(),
            placeholder: yup.string().required(),
            hidden: yup.boolean().required(),
            required: yup.boolean().required(),
            min: yup.number().positive().required(),
            max: yup.number().positive().required(),
            postfix: yup.string().required(),
        });
        case EInputTypes.SELECT:
            return yup.object().shape({
                name: yup.string().required(),
                label: yup.string().required(),
                type: yup.string().oneOf(["select"]).required(),
                hidden: yup.boolean().required(),
                required: yup.boolean().required(),
                list: yup.array().required()
            });
        default:
            return yup.object().shape({
                name: yup.string().required(),
                label: yup.string().required(),
                type: yup.string().oneOf(["text"]).required(),
                placeholder: yup.string().required(),
                hidden: yup.boolean().required(),
                required: yup.boolean().required(),
                maxLength: yup.number().positive().required()
            });
    }
}