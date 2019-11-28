import React from "react";

import { useField } from "formik";
import PropTypes from "prop-types";
import { Form } from 'bootstrap-4-react'

const TextInput = ({ label, name, type, id=name}) => {
  const [field, meta] = useField({ name });
  const isError = meta.touched && meta.error;
  const valid = isError?false:'';
  return (
    <Form.Group>
      <label htmlFor={id}>{label}</label>
      <Form.Input id={id} name={name} type={type}
        valid={valid}
        {...field} />
      {(isError) ?
        <Form.Text text="danger">{meta.error}</Form.Text>: null}
    </Form.Group>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string
};
export { TextInput };
