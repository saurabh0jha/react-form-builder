import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as yup from "yup";

import { fetchManagedForm } from "../../api/endpoints";
import {
  EInputTypes,
  TInputElementSchema,
  TManagedForm,
} from "../../types/globals";
import { TextInput } from "../Inputs/TextInput";
import { SelectInput } from "../Inputs/SelectInput";
import { NumericInput } from "../Inputs/NumericInput";
import "../../styles/Index.css";
import "./FormPreview.css";
import { Loader } from "../Loader/Loader";
import {
  generateErrorConfig,
  generateFormData,
  generateValidationSchema,
} from "./helpers";

interface IInputProps {
  config: TInputElementSchema;
  id: string;
  error: string;
  handleChange: (fieldName: string, value: string | number | boolean) => void;
}

const Input: FC<IInputProps> = ({ config, id, error, handleChange }) => {
  switch (config.type) {
    case EInputTypes.NUMBER: {
      // @ts-expect-error
      return <NumericInput error={error} onChange={handleChange} {...config} />;
    }
    case EInputTypes.SELECT: {
      // @ts-expect-error
      return <SelectInput error={error} onChange={handleChange} {...config} />;
    }
    case EInputTypes.TEXT: {
      // @ts-expect-error
      return <TextInput error={error} onChange={handleChange} {...config} />;
    }
  }
};

export const FormPreview = () => {
  const [form, setForm] = useState<TManagedForm>();
  const { id } = useParams();

  const [formId, setFormId] = useState(id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchManagedForms = async () => {
      if (formId) {
        const managedformResp = await fetchManagedForm(formId);
        if (managedformResp.statusCode === 200) {
          setForm(managedformResp.data);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchManagedForms();
  }, []);

  const elements = form?.schema.elements;
  const elementIds = elements ? Object.keys(elements) : [];
  const errorConfig = generateErrorConfig(elements, elementIds);
  const initFormData = generateFormData(elements, elementIds);
  const validationSchema = generateValidationSchema(elements, elementIds);

  const [errors, setErrors] = useState(errorConfig);

  const [isValid, setIsValid] = useState(true);

  const [formData, setFormData] = useState(initFormData);

  const handleChange = (
    fieldName: string,
    value: string | number | boolean | []
  ) => {
    let newFormData;

    newFormData = {
      ...formData,
      [fieldName]: value,
    };

    let newErrors = generateErrorConfig();
    let tempValidity = true;

    validationSchema
      .validate(newFormData, { abortEarly: false })
      .catch((err: yup.ValidationError) => {
        newErrors = err.inner.reduce(
          (acc: Record<string, boolean>, error: any) => {
            if (error.message.length > 0) {
              tempValidity = false;
            }
            return {
              ...acc,
              [error.path]: error.message,
            };
          },
          {}
        );
      })
      .finally(() => {
        setErrors({ ...newErrors });
        setIsValid(tempValidity);
        setFormData({ ...newFormData, isValid: tempValidity });
      });
  };

  if (isLoading) {
    return (
      <div className="preview-container">
        <h1 className="margin-bottom-0">Preview</h1>
        <Loader />
      </div>
    );
  } else if (!elements) {
    return (
      <div className="preview-container">
        <h1 className="margin-bottom-0">Preview</h1>
        <h3 className="margin-top-0">
          Form not found.
          <br />
          <Link to="/forms">Go to forms</Link>{" "}
        </h3>
      </div>
    );
  } else if (elementIds.length === 0) {
    return (
      <div className="preview-container">
        <h1 className="margin-bottom-0">Preview</h1>
        <h3 className="margin-top-0">
          Form not found.
          <br />
          <Link to="/forms">Go to forms</Link>{" "}
        </h3>
      </div>
    );
  }

  return (
    <div className="preview-container">
      <h1 className="margin-bottom-0">Preview</h1>
      <h3 className="margin-top-0">
        <br />
        <Link to="/forms">Go to forms</Link>{" "}
      </h3>
      <form className="generated-form">
        {elementIds.map((elementId) => {
          console.log({ t: elements[elementId] });
          return (
            <Input
              handleChange={handleChange}
              config={elements[elementId]}
              error={errors[elements[elementId].name]}
              id={elementId}
            />
          );
        })}
      </form>
    </div>
  );
};
