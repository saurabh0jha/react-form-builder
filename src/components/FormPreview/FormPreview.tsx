import { FC } from "react";
import "./FormPreview.css";

import { TFormSchema } from "../../types/globals";

interface IFormPreviewProps {
  schema?: TFormSchema | null;
}

export const FormPreview: FC<IFormPreviewProps> = (props) => {
  return (
    <div className="form-preview dashed-border">
      {props.schema ? JSON.stringify(props.schema) : null}
    </div>
  );
};
