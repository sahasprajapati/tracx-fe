import React from "react";
import { ErrorMessage, FieldHookConfig, useField } from "formik";
interface IProps {
  label: string | number;
  placeholder?: string;
  type?: string;
  defaultValue?: string | number;
  readOnly?: boolean;
  hidden?: boolean;
  ref?: any;
  isTextArea?: boolean;
}
const TextField = ({
  label,
  placeholder,
  type,
  readOnly,
  defaultValue,
  hidden,
  ref,
  isTextArea,
  ...otherProps
}: IProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(otherProps);
  return (
    <div style={{
      paddingBottom: "1em"
    }} >
      <label
        className={`input__label ${
          meta.error && meta.touched
            ? "input__label__error__color"
            : "position-relative"
        } `}
        htmlFor={field.name}
      >
        {label}{" "}
      </label>
      {isTextArea ? (
        <textarea
          className={`form-control  ${
            meta.touched && meta.error ? "is-invalid" : ""
          } ${!meta.error ? "is-valid" : ""}`}
          {...field}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete="off"
          readOnly={readOnly}
          hidden={hidden}
          ref={ref}
        />
      ) : (
        <input
          className={`form-control  ${
            meta.touched && meta.error ? "is-invalid" : ""
          } ${!meta.error ? "is-valid" : ""}`}
          {...field}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete="off"
          readOnly={readOnly}
          hidden={hidden}
          ref={ref}
        />
      )}
      {meta.touched && meta.error ? (
        <div className="input__error__icon"></div>
      ) : (
        ""
      )}
      <ErrorMessage
        component="div"
        name={field.name}
      />
    </div>
  );
};

export default React.memo(TextField);
