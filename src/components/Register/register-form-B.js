import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Bootstrap, { Button, Alert } from 'bootstrap-4-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextArea, TextInput, RadioGroup, Select, Checkbox, CheckboxSingle } from '../../util/formik-bootstrap-controls'

import userService from '../../services/UserService'
import ErrorMessage from '../ErrorMessage'
import { AlertModal } from '../Modals'
import * as ROUTES from '../../constants';

import SpinnerOverlay from '../../util/SpinnerOverlay'
import {c_log} from '../../util/logger'

const INITIAL_FORM_VALUES = {
    email: '',
    passwordOne: 'aaaaaaaa1q',
    passwordTwo: 'aaaaaaaa1q',
    displayName: '',
    acceptedTerms: ''
};






const VALIDATION_SCHEMA = {
    email: Yup.string().email()
        .required('Required'),
    passwordOne: Yup.string()
        .required('Required'),
    passwordTwo: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('passwordOne'), null], 'Passwords must match'),
    displayName: Yup.string()
        .required('Required'),
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

    componentDidUpdate() {
        if (this.state.error) {
            //  Bootstrap.modal('#registerError', {});
            window.scrollTo(0, 0);
        }
    }

    render() {
        const { error, loading } = this.state;
        return (
            
                <div style={{ padding: '10px' }}>
                    <Formik
                        initialValues={INITIAL_FORM_VALUES}
                        validationSchema={Yup.object().shape(VALIDATION_SCHEMA)}
                        onSubmit={(values, { setSubmitting, setFieldTouched }) => {
                            const { email, passwordOne,  displayName } = values;
                            c_log("SUBMIT:" + JSON.stringify(values));

                            this.setState({ loading: true, error: null });
                            
                            setTimeout(() => {

                                setSubmitting(false);

                                userService
                                    .registerWithEmailAndPassword(email, passwordOne)

                                    .then(authUser => {
                                        c_log("oooeer"); c_log(authUser)

                                        return userService.createAuthProfile(
                                            authUser.user.uid,
                                            email,
                                            displayName,
                                            "B"
                                        );


                                    })
                                    .then(() => {
                                        return userService.sendEmailVerification();
                                    })
                                    .then(() => {
                                        this.setState({ ...INITIAL_STATE });
                                        this.props.history.push(ROUTES.REGISTER_SUCCESS);

                                    })

                                    .catch(error => {
                                        c_log("Error"); c_log(error);
                                        this.setState({ error, loading: false });

                                    });



                            }, 3000);
                        }}
                    >
                        {() => {

                            return (
                                <>
                                <SpinnerOverlay loading={loading}>
                                    {error ? <Alert danger><ErrorMessage error={error} /></Alert> : null}
                                    
                                    <Form>
                                        <fieldset className="form-group">
                                            <TextInput type="email" name="email" label="Email" />

                                            <TextInput type="password" name="passwordOne" label="Password" />

                                            <TextInput type="password" name="passwordTwo" label="Confirm Password" />

                                            <TextInput type="text" name="displayName" label="Company Name" />

                                            <CheckboxSingle name="acceptedTerms" value="agree">
                                                I accept the <a target="_blank" href="/tandc.html">terms and conditions*</a>
                                            </CheckboxSingle>
                                        </fieldset>

                                    

                                        <Button primary type="submit" disabled={loading}>Register</Button>

                                    </Form>
                                    </SpinnerOverlay>
                                </>
                            );
                        }}
                    </Formik>
                    {error ?
                        <AlertModal id="registerError" title=""><Alert danger><ErrorMessage error={error} /></Alert></AlertModal>
                        : null}
                </div>
            
        )
    }

}


const RegisterFormB = compose(
    withRouter
)(RegisterFormBase);

export default RegisterFormB;