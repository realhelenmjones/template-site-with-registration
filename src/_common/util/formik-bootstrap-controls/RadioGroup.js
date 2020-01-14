import React from "react";

import PropTypes from "prop-types";
import { useField, Field } from "formik";
import { Form } from 'bootstrap-4-react'

const RadioGroup = ({ name, options }) => {
  const [field, meta] = useField({ name, type: 'radio' });
  const isError = meta.touched && meta.error;
  return (
    <Form.Group>
      {options.map(option => {
        const key = option.key ? option.key : option.value;
        return (
          <Form.Check inline key={key}>
            {/* <Form.Radio id={key} name={name} value={option.value} {...field}/> */}
            <Field style={{ margin: '0 5px 0 0' }} type="radio" id={key} name={name} value={option.value} />
            <Form.CheckLabel htmlFor={key}>{option.text}</Form.CheckLabel>
          </Form.Check>
        )
      }
      )}
      {(isError) ?
        <Form.Text text="danger">{meta.error}</Form.Text> : null}
    </Form.Group>
  );

};

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired
};

export { RadioGroup };
