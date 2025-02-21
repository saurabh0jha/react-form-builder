import { FC, useState } from "react";
import "./ManagedForm.css";

import { TManagedForm } from "../../types/globals";
import { FormSchemaGenerator } from "../FormSchemaGenerator/FormSchemaGenerator";
import { FormPreview } from "../FormPreview/FormPreview";

interface IFormListingProps {
  managedForm?: TManagedForm;
}
const getBlankSchema = (): TManagedForm => {
  return {
    name: "A new managed form",
    createdAt: String(Date.now()),
    description: "A new managed form for getting user communication details",
    stats: {
      usageCount: 0,
      fieldCount: 0,
    },
    schema: {
      version: "1.0.0",
      elements: {},
    },
  };
};

export const ManagedForm: FC<IFormListingProps> = (props) => {
  const [managedForm, setManagedForm] = useState<TManagedForm>(
    props.managedForm || getBlankSchema()
  );

  const handleSchemaUpdate = (data: Partial<TManagedForm>) => {
    setManagedForm({ ...managedForm, ...data });
  };

  return (
    <div className="form-generator-container">
      <h2>Generate form</h2>
      <div className="form-generator">
        <FormSchemaGenerator
          name={managedForm.name}
          description={managedForm.description}
          schema={managedForm.schema}
          onSchemaUpdate={(data) => handleSchemaUpdate(data)}
        />
        <FormPreview schema={managedForm.schema} />
      </div>
    </div>
  );
};
