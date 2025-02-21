import { FC, useState } from "react";
import "./Input.css";
import { ESchemaInputTypes, TCheckboxInputElement } from "../../types/globals";

export const CheckboxInput: FC<TCheckboxInputElement> = (props) => {
  const [checked, setChecked] = useState<boolean>(props.value || false);

  return (
    <div className="custom-input">
      <label className="custom-label" htmlFor={props.id}>
        {props.label}
      </label>
      <div className="inner-input">
        <input
          checked={checked}
          style={{ width: 20 }}
          value={props.label}
          onChange={(e) => {
            const userValue = e.target.checked;
            setChecked(userValue);
            props.onChange(props.name, userValue);
          }}
          id={props.id}
          type={ESchemaInputTypes.CHECKBOX}
          name={props.label}
          required={props.required}
          hidden={props.hidden}
          aria-role={props.id}
        />
        {props.error && props.error.length > 0 ? (
          <div style={{ color: "Red", fontWeight: 500 }}>{props.error}</div>
        ) : null}
      </div>
    </div>
  );
};
