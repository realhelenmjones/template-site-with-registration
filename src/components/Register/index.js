import React from 'react';
import { compose } from 'recompose';
import { Button, Alert } from 'bootstrap-4-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextArea, TextInput, RadioGroup, Select, Checkbox, CheckboxSingle } from '../../util/formik-bootstrap-controls'

import userService from '../../services/UserService'

const RegisterPage = () => (
    <div>
        <h1>Register</h1>
        <RegisterForm />
    </div>
);


const INITIAL_FORM_VALUES = {
    email: '',
    passwordOne: 'aaaaaaaa1q',
    passwordTwo: 'aaaaaaaa1q',
    about: '',
    name: '',
    age: '',
    sports: [],
    gender: '',
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
    email: Yup.string().email()
        .required(''),
    passwordOne: Yup.string()
        .required(''),
    passwordTwo: Yup.string()
        .required('')
        .oneOf([Yup.ref('passwordOne'), null], 'Passwords must match'),
    about: Yup.string()
        .required(''),
    gender: Yup.string()
        .required('Required'),
    age: Yup.string()
        .ensure()
        .required(""),
    sports: Yup.string()
        .required('Required'),
    acceptedTerms: Yup.string()
        .required('You must accept the terms and conditions')
}

class RegisterForm extends React.Component {

    constructor(props){
        super(props);
        this.state={};
    }

    render() {
        
        return (
            <Formik
                initialValues={INITIAL_FORM_VALUES}
                validationSchema={Yup.object().shape(VALIDATION_SCHEMA)}
                onSubmit={(values, { setSubmitting, setFieldTouched }) => {
                    const { email, passwordOne, name, about } = values;
                    console.log("SUBMIT:" + JSON.stringify(values));
                    // return;

                    setTimeout(() => {

                        setSubmitting(false);

                        userService
                            .registerWithEmailAndPassword(email, passwordOne)
                            
                            .then(authUser => {
                                console.log("1");
                                userService.createUser(
                                    authUser.user.uid,
                                    email,
                                    name,
                                    about
                                );
                                
                            })
                            .then(() => {
                                console.log("2");
                            //     return userService
                            //         .loginWithEmailAndPassword(email, passwordOne)
                            })
                            .then(() => {
                                console.log("3");
                                userService.findUsers();
                                alert('registered and logged in');
                            })

                            .catch(error => {
                                //TODO error message about invalid data needs to be displayed on the form. Can it be displayed against the 
                                //form fields that are invalid e.e. password is not valid.
                                console.log("Error"); console.log(error);
                                this.setState({ error });
                            });



                    }, 400);
                }}
            >
                {({ }) => {
                    const {error} = this.state;
                    return (
                        <>
                        {error?<Alert danger>{error.message}</Alert>:null}

                            <Form>
                                <fieldset className="form-group">
                                    <legend>User Details</legend>
                                    <TextInput type="email" name="email" label="Email" />

                                    <TextInput type="password" name="passwordOne" label="Password" />

                                    <TextInput type="password" name="passwordTwo" label="Confirm Password" />

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

                                <Button primary type="submit">Register</Button>

                            </Form>
                        </>
                    );
                }}
            </Formik>
        )
    }

}


export default RegisterPage;

export { RegisterForm };