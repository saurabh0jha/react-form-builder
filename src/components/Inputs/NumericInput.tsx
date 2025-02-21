import { FC, useState } from "react";
import "./Input.css";
import { ESchemaInputTypes, TNumericInputElement } from "../../types/globals";

export const NumericInput: FC<TNumericInputElement> = (props) => {
  const [value, setValue] = useState<number>(props.value || 0);

  return (
    <div className="custom-input">
      <label className="custom-label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        value={String(value)}
        onChange={(e) => {
          const userValue = parseInt(e.target.value, 10);
          const finalValue = isNaN(userValue) ? 0 : userValue;
          setValue(finalValue);
          props.onChange(props.name, finalValue);
        }}
        id={props.id}
        type={ESchemaInputTypes.NUMBER}
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        min={props.min}
        max={props.max}
        aria-role={props.id}
      />
      {props.error && props.error.length > 0 ? (
        <div style={{ color: "Red", fontWeight: 500 }}>{props.error}</div>
      ) : null}
    </div>
  );
};
