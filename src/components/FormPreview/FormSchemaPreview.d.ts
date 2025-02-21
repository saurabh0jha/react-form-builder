import { FC } from "react";
import "./FormPreview.css";
import { TFormSchema } from "../../types/globals";
interface IFormPreviewProps {
    schema?: TFormSchema | null;
}
export declare const FormSchemaPreview: FC<IFormPreviewProps>;
export {};
