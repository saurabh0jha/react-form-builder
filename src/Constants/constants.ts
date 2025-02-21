import { EInputTypes } from "../types/globals";

export const INPUT_TYPES = [{ label: "Text", value: EInputTypes.TEXT }, { label: "Select", value: EInputTypes.SELECT }, { label: "Number", value: EInputTypes.NUMBER }];

export const INPUT_PROPS_MAP = {
    [EInputTypes.TEXT]: {
        props: ["name", "type", "label", "placeholder"],
        validations: ["required", "maxLength"],
        additionalProps: ["hidden", "placeholder"],
    },
    [EInputTypes.SELECT]: {
        props: ["name", "type", "label"],
        validations: ["required"],
        additionalProps: ["hidden", "list"],
    },
    [EInputTypes.NUMBER]: {
        props: ["name", "type", "label", "placeholder"],
        validations: ["min", "max", "required"],
        additionalProps: ["hidden", "placeholder", "postfix"],
    },

};
export const PROPS = ["name", "type", "label", "placeholder"]
export const VALIDATIONS = ["min", "max", "required", "maxLength"];
export const OTHER_PROPS = ["hidden", "placeholder", "list", "postfix"];