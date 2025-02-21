import * as yup from "yup";
import { TInputElementSchema } from "../../types/globals";
import "../../styles/index.css";
import "./FormPreview.css";
export declare const generateErrorConfig: (elements?: Record<string, TInputElementSchema>, elementsIds?: string[]) => Record<string, string>;
export declare const generateFormData: (elements?: Record<string, TInputElementSchema>, elementsIds?: string[]) => Record<string, string | number | boolean>;
export declare const generateValidationSchema: (elements?: Record<string, TInputElementSchema>, elementsIds?: string[]) => Record<string, any> | yup.ObjectSchema<{
    [x: string]: any;
}, yup.AnyObject, {
    [x: string]: any;
}, "">;
