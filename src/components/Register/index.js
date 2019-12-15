import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Bootstrap, { Button, Alert } from 'bootstrap-4-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextArea, TextInput, RadioGroup, Select, Checkbox, CheckboxSingle } from '../../util/formik-bootstrap-controls'

import userService from '../../services/UserService'
import ErrorMessage from '../ErrorMessage'
import {AlertModal} from '../Modals'
import * as ROUTES from '../../constants';

import SpinnerOverlay from '../../util/SpinnerOverlay'

import RegisterSuccessPage from './register-success'


const RegisterPage = () => (
    <div>
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
        .required('Required'),
    passwordOne: Yup.string()
        .required('Required'),
    passwordTwo: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('passwordOne'), null], 'Passwords must match'),
    username: Yup.string()
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

const INITIAL_STATE = {
    error: null,
    loading: false
};

class RegisterFormBase extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(){
        if (this.state.error){
          //  Bootstrap.modal('#registerError', {});
          window.scrollTo(0,0);
        }
    }

    render() {
        const { error, loading } = this.state;
        return (
          <SpinnerOverlay loading={loading}>
      <div style={{padding:'10px'}}>
            <Formik
                initialValues={INITIAL_FORM_VALUES}
                validationSchema={Yup.object().shape(VALIDATION_SCHEMA)}
                onSubmit={(values, { setSubmitting, setFieldTouched }) => {
                    const { email, passwordOne, name, about, username } = values;
                    console.log("SUBMIT:" + JSON.stringify(values));
                    
                    this.setState({ loading:true, error:null });

                    setTimeout(() => {

                        setSubmitting(false);

                        userService
                            .registerWithEmailAndPassword(email, passwordOne)

                            .then(authUser => {
                                //TODO -- this will change each app
                                // userService.createMigratableUser(
                                //     authUser.user.uid,
                                //     email,
                                //     encodePassword()
                                // );
console.log('create my user');
                               
                               return userService.createUser(
                                    authUser.user.uid,
                                    email,
                                    username
                                );
                                
                                //eveything else on top of user
                                // userService.createProfile(
                                //     authUser.user.uid,
                                //     email,
                                //     username
                                // );
                                //
                                // OR
                                // cvnService.createCvn(location)

                            })
                            .then(() => {
                                return userService.doSendEmailVerification();
                              })
                            .then(() => {
                                this.setState({ ...INITIAL_STATE });
                                this.props.history.push(ROUTES.REGISTER_SUCCESS);
                                
                            })

                            .catch(error => {
                                //TODO error message about invalid data needs to be displayed on the form. Can it be displayed against the 
                                //form fields that are invalid e.e. password is not valid.
                                console.log("Error"); console.log(error);
                                this.setState({ error, loading:false });
                                
                            });



                    }, 3000);
                }}
            >
                {() => {
                    
                    return (
                        <>
                            {error ? <Alert danger><ErrorMessage error={error} /></Alert> : null}
                            {loading ? <Alert primary>LOADING .....</Alert> : null} 

                            <Form>
                                <fieldset className="form-group">
                                    <legend>User Details</legend>
                                    <TextInput type="email" name="email" label="Email" />

                                    <TextInput type="password" name="passwordOne" label="Password" />

                                    <TextInput type="password" name="passwordTwo" label="Confirm Password" />

                                    <TextInput type="text" name="username" label="Username/Handle" />

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

                                <Button primary type="submit" disabled={loading}>Register</Button>

                            </Form>
                        </>
                    );
                }}
            </Formik>
            {error?
            <AlertModal id="registerError" title=""><Alert danger><ErrorMessage error={error} /></Alert></AlertModal>
            : null}
            </div>
            </SpinnerOverlay>
        )
    }

}


const RegisterForm = compose(
    withRouter
)(RegisterFormBase);

export default RegisterPage;

export { RegisterSuccessPage };