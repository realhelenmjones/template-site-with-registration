import React from 'react';
import * as Yup from 'yup';

import { TextArea, TextInput, RadioGroup, Select, Checkbox, CheckboxSingle } from '../../util/formik-bootstrap-controls'

import * as ROUTES from '../../constants';
import RegisterForm from './register-form'

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



const RegisterFormB = () =>

    <RegisterForm
    initialFormValues={INITIAL_FORM_VALUES}
        validationScheme={VALIDATION_SCHEMA}
        regType="B"
        pleaseConfirmEmailRoute={ROUTES.PLEASE_CONFIRM_EMAIL_B}
        confirmedEmailSuccessUrl={ROUTES.EMAIL_CONFIRMED_SUCCESS_B_URL}
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



export default RegisterFormB;