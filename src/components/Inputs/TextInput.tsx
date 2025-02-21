import { FC, useState } from "react";
import "./Input.css";
import { ESchemaInputTypes, TTextInputElement } from "../../types/globals";

export const TextInput: FC<TTextInputElement> = (props) => {
  const [value, setValue] = useState<string>(props.value || "");

  return (
    <div className="custom-input">
      <label className="custom-label" htmlFor={props.id}>
        {props.label}
      </label>
      <div className="inner-input">
        <input
          value={String(value)}
          onChange={(e) => {
            const userValue = e.target.value;
            setValue(userValue);
            props.onChange(props.name, userValue);
          }}
          id={props.id}
          type={ESchemaInputTypes.TEXT}
          name={props.name}
          placeholder={props.placeholder}
          required={props.required}
          maxLength={props.maxLength}
          aria-role={props.id}
          hidden={props.hidden}
        />
        {props.error && props.error.length > 0 ? (
          <div style={{ color: "Red", fontWeight: 500 }}>{props.error}</div>
        ) : null}
      </div>
    </div>
  );
};
