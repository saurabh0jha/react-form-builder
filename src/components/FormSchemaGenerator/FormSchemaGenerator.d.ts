import { FC } from "react";
import "./FormSchemaGenerator.css";
import { TFormSchema, TManagedForm } from "../../types/globals";
interface IFormSchemaGeneratorProps {
    name: string;
    description: string;
    schema?: TFormSchema;
    onSchemaUpdate: (update: Partial<TManagedForm>) => void;
}
export declare const FormSchemaGenerator: FC<IFormSchemaGeneratorProps>;
export {};
