import { FC } from "react";

import { TFormSchema } from "../../types/globals";

interface IFormGeneratorProps {
  schema?: TFormSchema;
}

export const BlankFormGenerator: FC<IFormGeneratorProps> = (props) => {

  return (
      <div className="blank-form-generator">
        {props.schema ? null : "Add Section"}
      </div>
  );
};
