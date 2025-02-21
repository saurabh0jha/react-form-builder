import { FC, useState } from "react";
import "./Input.css";
import { TSelectInputElement } from "../../types/globals";

export const SelectInput: FC<TSelectInputElement> = (props) => {
  const [value, setValue] = useState(props.value || props.list[0].value);
  return (
    <div className="custom-input">
      <label className="custom-label" htmlFor={props.id}>
        {props.label}
      </label>
      <select
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange(props.name, e.target.value);
        }}
        id={props.id}
        name={props.name}
        required={props.required}
        hidden={props.hidden}
        aria-role={props.id}
      >
        {props.list.map((listItem) => (
          <option key={listItem.value} value={listItem.value}>
            {listItem.label}
          </option>
        ))}
      </select>
      {props.error && props.error.length > 0 ? (
        <div style={{ color: "Red", fontWeight: 500 }}>{props.error}</div>
      ) : null}
    </div>
  );
};
