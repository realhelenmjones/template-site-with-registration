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
    passwordTwo: 'aaaaaaaa1q'
};


const VALIDATION_SCHEMA = {
    email: Yup.string().email()
        .required('Required'),
    passwordOne: Yup.string()
        .required('Required'),
    passwordTwo: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('passwordOne'), null], 'Passwords must match')
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
        const {initialFormValues={}, validationScheme={}, regType="A",
        pleaseConfirmEmailUrl, confirmedEmailSuccessUrl} = this.props;
        return (
            
                <div style={{ padding: '10px' }}>
                    <Formik
                        initialValues={{...INITIAL_FORM_VALUES, ...initialFormValues}}
                        validationSchema={Yup.object().shape({...VALIDATION_SCHEMA, ...validationScheme})}
                        onSubmit={(values, { setSubmitting, setFieldTouched }) => {
                            const { email, passwordOne,  displayName } = values;
                            c_log("SUBMIT:" + JSON.stringify(values));

                            this.setState({ loading: true, error: null });
                            
                            setTimeout(() => {

                                setSubmitting(false);

                                userService
                                    .registerWithEmailAndPassword(email, passwordOne)

                                    .then(uid => {
                                        c_log("oooeer"); 

                                        return userService.createAuthProfile(
                                            uid,
                                            email,
                                            displayName,
                                            regType
                                        );


                                    })
                                    .then(() => {
                                        return userService.sendEmailVerification(confirmedEmailSuccessUrl);
                                    })
                                    .then(() => {
                                        this.setState({ ...INITIAL_STATE});
                                        this.props.history.push(pleaseConfirmEmailUrl);

                                    })

                                    .catch(error => {
                                        c_log("Reg Error"); c_log(error);
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
                                       {this.props.children()}

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


const RegisterForm = compose(
    withRouter
)(RegisterFormBase);

export default RegisterForm;