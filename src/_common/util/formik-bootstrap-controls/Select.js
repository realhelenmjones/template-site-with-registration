import React from "react";

import { useField } from "formik";
import PropTypes from "prop-types";
import { Form } from 'bootstrap-4-react'

const Select = ({label, name, options, id=name }) => {
  const [field, meta] = useField({ name });
  const isError = meta.touched && meta.error;
  const valid = isError?false:'';

  return (
    <Form.Group>
      <label htmlFor={id}>{label}</label>
      <Form.Select id={id} valid={valid} name={name} {...field}>
      {options.map(option => {
        const key= option.key ? option.key : option.value;
        return (
          <option key={key} value={option.value} >{option.text}</option>          
       )}
       )};
       
      </Form.Select>
      
      {(isError) ?
      <Form.Text text="danger">{meta.error}</Form.Text>: null}
    </Form.Group>
      
  );
};

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired
};
export { Select };
