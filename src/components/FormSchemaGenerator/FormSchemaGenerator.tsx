import { FC, useState } from "react";

import "./FormSchemaGenerator.css";

import {
  TFormSchema,
  TInputElementSchema,
  TManagedForm,
} from "../../types/globals";
import { InputSchema } from "../InputSchema/InputSchema";
import { TextInput } from "../Inputs/TextInput";
import { getElementSchema } from "../../utilities/elementSchema";

interface IFormSchemaGeneratorProps {
  name: string;
  description: string;
  schema?: TFormSchema;
  onSchemaUpdate: (update: Partial<TManagedForm>) => void;
}

export const FormSchemaGenerator: FC<IFormSchemaGeneratorProps> = (props) => {
  const [elementSchemas, setElementSchemas] = useState<
    Record<string, TInputElementSchema>
  >(props.schema?.elements || {});
  const [name, setName] = useState(props.name || "");
  const [description, setDescription] = useState(props.description || "");

  const addBlankElement = () => {
    const blankElementSchema = getElementSchema();
    const newElementSchemas = {
      ...elementSchemas,
      [blankElementSchema.id]: blankElementSchema,
    };
    setElementSchemas(newElementSchemas);

    props.onSchemaUpdate({
      schema: {
        version: "1.0.0",
        elements: newElementSchemas,
      },
    });
  };

  const handleSchemaRemove = (id: string) => {
    const newElementSchemas = { ...elementSchemas };
    delete newElementSchemas[id];
    setElementSchemas(newElementSchemas);
    props.onSchemaUpdate({
      schema: {
        version: "1.0.0",
        elements: newElementSchemas,
      },
    });
  };

  const handleSchemaChange = (
    elementId: string,
    newSchema: TInputElementSchema
  ) => {
    const newElementSchemas = { ...elementSchemas, [elementId]: newSchema };
    setElementSchemas(newElementSchemas);
    props.onSchemaUpdate({
      schema: {
        version: "1.0.0",
        elements: newElementSchemas,
      },
    });
  };

  return (
    <div className="form-schema-generator dashed-border">
      <h2 className="margin-top-0">Form details</h2>
      <TextInput
        value={name}
        onChange={(_, name) => {
          setName(name);
          props.onSchemaUpdate({ name });
        }}
        label="Enter name"
        id="name-input"
        name="name"
        placeholder="Enter a name"
        required={true}
        hidden={false}
      />
      <TextInput
        value={description}
        onChange={(_, description) => {
          setDescription(description);
          props.onSchemaUpdate({ description });
        }}
        label="Enter description"
        id="description-input"
        name="description"
        placeholder="Enter description"
        required={false}
        hidden={false}
      />
      {Object.keys(elementSchemas).map((elementId) => {
        return (
          <InputSchema
            key={elementId}
            config={elementSchemas[elementId]}
            onChange={(newSchema) => handleSchemaChange(elementId, newSchema)}
            onRemove={(schemaId) => handleSchemaRemove(schemaId)}
          />
        );
      })}
      <div>
        <button
          style={{ width: "100%" }}
          className="primary full-width"
          onClick={() => {
            addBlankElement();
          }}
        >
          {" "}
          Add An input
        </button>
      </div>
    </div>
  );
};
