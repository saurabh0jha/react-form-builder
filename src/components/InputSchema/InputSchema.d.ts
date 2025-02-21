import { FC } from "react";
import { TInputElementSchema } from "../../types/globals";
import "./InputSchema.css";
interface IInputSchemaProps {
    config?: TInputElementSchema;
    onChange: (newConfig: TInputElementSchema) => void;
    onRemove: (configId: string) => void;
}
export declare const InputSchema: FC<IInputSchemaProps>;
export {};
