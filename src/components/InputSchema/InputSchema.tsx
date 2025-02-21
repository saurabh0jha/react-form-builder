import { FC, useState } from "react";

import { EInputTypes, TInputElementSchema } from "../../types/globals";

import "./InputSchema.css";
import { INPUT_TYPES } from "../../Constants/constants";
import { TextInput } from "../Inputs/TextInput";
import { SelectInput } from "../Inputs/SelectInput";
import { CheckboxInput } from "../Inputs/CheckboxInput";
import { NumericInput } from "../Inputs/NumericInput";
import {
  getElementSchema,
  getValidationSchema,
} from "../../utilities/elementSchema";

interface IInputSchemaProps {
  config?: TInputElementSchema;
  onChange: (newCOnfig: TInputElementSchema) => void;
}

const getBlankErrorConfig = () => {
  return {
    id: "",
    name: "",
    label: "",
    type: "",
    hidden: "",
    required: "",
    placeholder: "",
    list: "",
    postfix: "",
    min: "",
    max: "",
    maxLength: "",
  };
};

export const InputSchema: FC<IInputSchemaProps> = (props) => {
  const [config, setConfig] = useState<TInputElementSchema | undefined>(
    props.config
  );

  let errorConfig: Record<keyof TInputElementSchema, string> =
    getBlankErrorConfig();

  const [errors, setErrors] = useState(errorConfig);

  const [isValid, setIsValid] = useState(true);

  const handleChange = (
    fieldName: string,
    value: string | number | boolean | []
  ) => {
    let newConfig;
    if (fieldName === "type") {
      newConfig = getElementSchema(value as EInputTypes, config);
    } else {
      newConfig = {
        ...config,
        [fieldName]: value,
      } as TInputElementSchema;
    }

    let newErrors = getBlankErrorConfig();
    let tempValidity = true;
    const validationSchema = getValidationSchema(newConfig.type);

    validationSchema
      .validate(newConfig, { abortEarly: false })
      .catch((err) => {
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
      });

    setConfig(newConfig);
    if (tempValidity) {
      props.onChange(newConfig);
    }
  };

  return config ? (
    <div className={`input-schema${isValid ? "" : " invalid"}`}>
      <h3 className="margin-top-0">{config?.name}</h3>
      <TextInput
        value={config.name}
        onChange={handleChange}
        label="Name"
        name="name"
        id={`name-${config.id}`}
        placeholder={config.name}
        required={true}
        hidden={false}
        error={errors.name}
      />
      <TextInput
        value={config.label}
        onChange={handleChange}
        label="Label"
        name="label"
        id={`label-${config.id}`}
        placeholder={config.label}
        required={true}
        hidden={false}
        error={errors.label}
      />
      <SelectInput
        value={config.type}
        onChange={handleChange}
        label="Type"
        name="type"
        id={`select-${config.id}`}
        list={INPUT_TYPES}
        required={true}
        hidden={false}
        error={errors.type}
      />
      {config.placeholder !== undefined ? (
        <TextInput
          value={config.placeholder}
          onChange={handleChange}
          label="Placeholder"
          name="placeholder"
          id={`placeholder-${config.id}`}
          placeholder={config.placeholder}
          required={true}
          hidden={false}
          error={errors.placeholder}
        />
      ) : null}
      <CheckboxInput
        value={config.hidden}
        onChange={handleChange}
        label="Is Hidden ?"
        name="hidden"
        id={`hidden-${config.id}`}
        required={true}
        hidden={false}
        error={errors.hidden}
      />
      {config.list !== undefined ? (
        <TextInput
          value={config.list.map((el) => el.value).join(" ,")}
          onChange={handleChange}
          label="List values"
          name="list"
          id={`list-${config.id}`}
          placeholder="add comma-separated list values"
          hidden={false}
          error={errors.list}
        />
      ) : null}
      <h4>Validations</h4>
      <CheckboxInput
        value={config.required}
        onChange={handleChange}
        label="Is Required ?"
        name="required"
        id={`required-${config.id}`}
        required={true}
        hidden={false}
        error={errors.required}
      />
      {config.maxLength !== undefined ? (
        <NumericInput
          value={config.maxLength}
          onChange={handleChange}
          label="Max Length"
          name="maxLength"
          id={`max-length-${config.id}`}
          placeholder="Max length of string"
          required={true}
          hidden={false}
          error={errors.maxLength}
        />
      ) : null}
      {config.min !== undefined ? (
        <NumericInput
          value={config.min}
          onChange={handleChange}
          label="Min"
          name="min"
          id={`min-${config.id}`}
          placeholder="Add a postfix for the number eg: Years"
          required={true}
          hidden={false}
          error={errors.min}
        />
      ) : null}
      {config.max !== undefined ? (
        <NumericInput
          value={config.max}
          onChange={handleChange}
          label="Max"
          name="max"
          id={`max-${config.id}`}
          placeholder="Add a postfix for the number eg: Years"
          required={true}
          hidden={false}
          error={errors.max}
        />
      ) : null}
      {config.postfix !== undefined ? (
        <TextInput
          value={config.postfix}
          onChange={handleChange}
          label="Postfix"
          name="postfix"
          id={`postfix-${config.id}`}
          placeholder="Add a postfix for the number eg: Years"
          required={true}
          hidden={false}
          error={errors.postfix}
        />
      ) : null}
    </div>
  ) : null;
};
