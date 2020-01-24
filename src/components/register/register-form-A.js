import React from 'react';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";

import { TextArea, TextInput, RadioGroup, Select, Checkbox, CheckboxSingle } from '_common/util/formik-bootstrap-controls'

import * as ROUTES from 'constants/routes';
import RegisterForm from '../../_registration/components/register/register-form'
import userService from '_registration/services/UserService';

const INITIAL_FORM_VALUES = {
    about: '',
    name: '',
    age: '',
    sports: [],
    gender: '',
    displayName: '',
    acceptedTerms: ''
};

const genderOptions = [
    { text: 'Male', value: 'm' },
    { text: 'Female', value: 'f' }
];

let ageOptions = [{ key: '0', text: 'Please select', value: '' }]
for (var i = 18; i < 30; i++) {
    ageOptions.push({ text: '' + i, value: '' + i })
}

const sportOptions = [
    { key: '1', value: 'sailing', text: 'Sailing' },
    { key: '2', value: 'running', text: 'Running' },
    { key: '3', value: 'golf', text: 'Golf' },
    { key: '4', value: 'football', text: 'Football' },
    { key: '5', value: 'rugby', text: 'Rugby' }
];

const VALIDATION_SCHEMA = {
    name: Yup.string()
        .required('Required'),
    about: Yup.string(),
    // .required('Required'),
    gender: Yup.string(),
    // .required('Required'),
    age: Yup.string(),
    // .required("Required"),
    sports: Yup.string(),
    // .required('Required'),
    acceptedTerms: Yup.string()
        .required('You must accept the terms and conditions')
}

const RegisterFormA = () => {
    const history = useHistory();
    return (
        <>
        <h1 className="formHeading">Register A</h1>
        <RegisterForm
            initialFormValues={INITIAL_FORM_VALUES}
            validationScheme={VALIDATION_SCHEMA}
            regType="A"
            pleaseConfirmEmail={() => history.replace(ROUTES.PLEASE_CONFIRM_EMAIL)}
            confirmedEmailSuccessUrl={ROUTES.EMAIL_CONFIRMED_SUCCESS_URL}
            createFullProfile={(args) => userService.exampleCreateFullProfile(args)}
        >
            {() => (
                <>
                    <fieldset className="form-group">
                        <legend>User Details</legend>
                        <TextInput type="email" name="email" label="Email" />

                        <TextInput type="password" name="passwordOne" label="Password" />

                        <TextInput type="password" name="passwordTwo" label="Confirm Password" />

                        <TextInput type="text" name="displayName" label="Display Name" />

                    </fieldset>

                    <fieldset>
                        <legend>Additional Details</legend>

                        <TextInput type="text" name="name" label="Name" />

                        <RadioGroup label="Gender*" name="gender" options={genderOptions} />

                        <Select label="Age" name="age" options={ageOptions} />

                        <Checkbox label="Sports*" name="sports" options={sportOptions} />

                        <TextArea name="about" label="A few words about you" lg />


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

export default RegisterFormA;


