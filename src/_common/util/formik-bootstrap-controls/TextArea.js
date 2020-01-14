import React from "react";

import { Form } from 'bootstrap-4-react'
import { useField } from "formik";
import PropTypes from "prop-types";

const TextArea = ({ label, name, id = name, rows = 5 }) => {
  const [field, meta] = useField({ name });
  const isError = meta.touched && meta.error;
  const valid = isError ? false : '';
  return (
    <Form.Group>
      <label htmlFor={id}>{label}</label>
      <Form.Textarea id={id} name={name} rows={rows}
        valid={valid}
        {...field}  ></Form.Textarea>
      {(isError) ?
        <Form.Text text="danger">{meta.error}</Form.Text> : null}
    </Form.Group>
  );

};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string
};

export { TextArea };
