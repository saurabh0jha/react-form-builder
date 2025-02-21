import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./ManagedForm.css";

import { TManagedForm } from "../../types/globals";
import { FormSchemaGenerator } from "../FormSchemaGenerator/FormSchemaGenerator";
import { FormSchemaPreview } from "../FormPreview/FormSchemaPreview";
import { successToast, warningToast } from "../../utilities/toastMessages";
import { saveManagedForm } from "../../api/endpoints";
import { useNavigate } from "react-router";

interface IFormListingProps {
  managedForm?: TManagedForm;
}
const getBlankSchema = (): TManagedForm => {
  return {
    id: uuidv4(),
    name: "A new managed form",
    createdAt: String(Date.now()),
    description: "A new managed form for getting user communication details",
    stats: {
      usageCount: 10,
      fieldCount: 0,
    },
    schema: {
      version: "1.0.0",
      elements: {},
    },
  };
};

export const ManagedForm: FC<IFormListingProps> = (props) => {
  const navigate = useNavigate();
  const [managedForm, setManagedForm] = useState<TManagedForm>(
    props.managedForm || getBlankSchema()
  );

  const handleSchemaUpdate = (data: Partial<TManagedForm>) => {
    const newManagedForm = { ...managedForm, ...data };
    const fields = Object.keys(newManagedForm.schema.elements).length;
    const stats = { ...newManagedForm.stats, fieldCount: fields };
    setManagedForm({ ...newManagedForm, stats });
  };

  const isValid = () => {
    const schemaElements = managedForm.schema.elements;
    const valid = Object.keys(schemaElements).reduce((acc, elementId) => {
      return acc && schemaElements[elementId].isValid;
    }, true);
    return valid;
  };

  return (
    <div className="form-generator-parent">
      <div className="form-generator-container">
        <h1>Generate form</h1>
        <div className="form-generator">
          <FormSchemaGenerator
            name={managedForm.name}
            description={managedForm.description}
            schema={managedForm.schema}
            onSchemaUpdate={(data) => handleSchemaUpdate(data)}
          />
          <FormSchemaPreview schema={managedForm.schema} />
        </div>
      </div>
      <footer>
        <div className="form-generator-footer">
          <div></div>
          <div className="generator-actions">
            <button
              className="primary long"
              onClick={async () => {
                if (Object.keys(managedForm.schema.elements).length === 0) {
                  warningToast("There are no inputs to add");
                } else if (isValid()) {
                  const resp = await saveManagedForm(managedForm);
                  if (resp.statusCode === 200) {
                    successToast("Successfully saved the form");
                    navigate("/forms");
                  }
                } else {
                  warningToast("Please correct the validation errors");
                }
              }}
            >
              Save
            </button>
            <button className="secondary long">Cancel</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
