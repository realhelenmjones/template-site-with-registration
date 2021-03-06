import React from 'react';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";

import { TextInput, CheckboxSingle } from '_common/util/formik-bootstrap-controls'

import * as ROUTES from 'constants/routes';
import RegisterForm from '../../_registration/components/register/register-form'

const INITIAL_FORM_VALUES = {

    displayName: '',
    acceptedTerms: ''
};



const VALIDATION_SCHEMA = {

    displayName: Yup.string()
        .required('Required'),
    acceptedTerms: Yup.string()
        .required('You must accept the terms and conditions')
}



const RegisterFormB = () => {
    const history = useHistory();
    return (
        <>
        <h1 className="formHeading">Register B</h1>
        <RegisterForm
            initialFormValues={INITIAL_FORM_VALUES}
            validationScheme={VALIDATION_SCHEMA}
            regType="B"
            pleaseConfirmEmail={() => history.replace(ROUTES.PLEASE_CONFIRM_EMAIL_B)}
            confirmedEmailSuccessUrl={ROUTES.EMAIL_CONFIRMED_SUCCESS_URL_B}
        >
            {() => (
                <>
                    <fieldset className="form-group">
                        <TextInput type="email" name="email" label="Email" />

                        <TextInput type="password" name="passwordOne" label="Password" />

                        <TextInput type="password" name="passwordTwo" label="Confirm Password" />

                        <TextInput type="text" name="displayName" label="Company Name" />

                        <CheckboxSingle name="acceptedTerms" value="agree">
                            I accept the <a target="_blank" href="/tandc.html">terms and conditions*</a>
                        </CheckboxSingle>
                    </fieldset>
                </>
            )}
        </RegisterForm>
        </>
    )
}



export default RegisterFormB;