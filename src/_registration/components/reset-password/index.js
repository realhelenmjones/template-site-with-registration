import React from 'react';
import { Redirect } from "react-router-dom";
import * as Yup from 'yup';
import { Alert } from 'bootstrap-4-react';
import userService from '../../services/UserService'
import ma from '_common/util/missingArg';
import Form from '_form'
import { TextInput } from '_common/util/formik-bootstrap-controls'


const VALIDATION_SCHEMA = {
  email: Yup.string().required('Required')
};


class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = { success: false };
    this.success=this.success.bind(this);
    this.cancel=this.cancel.bind(this);
  }


  saveForm({ email = ma() }) {
    return userService.doPasswordReset(email);
  }

  success(){
    this.setState({ success: true, cancel:false })
  }

  cancel(){
    this.setState({ success: false, cancel:true })
  }


  render() {
    const {success=this.success, cancel=this.cancel} = this.props;
    return (
      <>      
        {this.state.cancel && <Redirect to="/login" />}

        {this.state.success ?
          <Alert success>We have sent you an email to reset your password</Alert>
          :
          <Form
            validationScheme={VALIDATION_SCHEMA}
            initialData={{ email: "" }}
            success={success}
            cancel={cancel}
            submitLabel='Reset Password'
            saveForm={this.saveForm}
          >
            <fieldset className="form-group">
              <TextInput type="text" name="email" label="Email" />
            </fieldset>
          </Form>


        }
      </>
    )
  }
}



export default ResetPassword;


