import React, { useContext } from 'react'
import * as Yup from 'yup';
import { useHistory, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import urlPropType from 'url-prop-type';



import Form from '_form'

import { TextInput } from '_common/util/formik-bootstrap-controls'

import { AuthUserContext } from '_registration/util/session';
import userService from '_registration/services/UserService'
import ma from '_common/util/missingArg';

const VALIDATION_SCHEMA = {
  email: Yup.string().required('Required')
};



const UpdateEmailForm = ({success, cancel, confirmedEmailSuccessUrl}) => {
  const history = useHistory();
  const authUser = useContext(AuthUserContext)


  const saveForm = ({ email = ma() }) => {
    return userService.updateEmail(email)
      .then(() => {
        return userService.sendEmailVerification(confirmedEmailSuccessUrl);
      })
  }

  return (
    <>
      {!authUser ? <Redirect to="/" /> :
        <Form
          validationScheme={VALIDATION_SCHEMA}
          initialData={{ email: authUser.email }}
          success={success}
          cancel={cancel}
          submitLabel='Save'
          saveForm={saveForm}
        >
          <fieldset className="form-group">
            <TextInput type="text" name="email" label="New Email" />
          </fieldset>
        </Form>

      }
    </>
  )

}

UpdateEmailForm.propTypes = {
  success: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  confirmedEmailSuccessUrl: urlPropType.isRequired
};


export default UpdateEmailForm;
