import React from "react";

import PropTypes from "prop-types";
import { useField, Field } from "formik";
import { Form } from 'bootstrap-4-react'

const CheckboxSingle = ({ name, value, key = value, children }) => {
  const [field, meta] = useField({ name, type: "checkbox" });
  const isError = meta.touched && meta.error;
  const valid = isError ? false : '';
  return (
    <Form.Group>
      <Form.Check inline key={key}>
        {/* <Form.Checkbox id={key} name={name} value={option.value} {...field} /> */}
        <Field style={{ margin: '0 5px 0 0' }} type="checkbox" id={key} name={name} value={value} />
        <Form.CheckLabel htmlFor={key}>{children}</Form.CheckLabel>
      </Form.Check>
      {(isError) ?
        <Form.Text text="danger">{meta.error}</Form.Text> : null}
    </Form.Group>
  );

};

CheckboxSingle.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export { CheckboxSingle };
