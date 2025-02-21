import { FC } from "react";
import "./FormPreview.css";

import { TFormSchema } from "../../types/globals";

interface IFormPreviewProps {
  schema?: TFormSchema | null;
}

export const FormSchemaPreview: FC<IFormPreviewProps> = (props) => {
  return (
    <div className="form-preview dashed-border">
      <h2 className="margin-top-0">Schema preview</h2>
      {props.schema ? JSON.stringify(props.schema, null, 2) : null}
    </div>
  );
};
