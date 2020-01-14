import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Button, Alert } from 'bootstrap-4-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';


import userService from '../../services/UserService'
import ErrorMessage from '../ErrorMessage'
import { AlertModal } from '_common/components/Modals'


import SpinnerOverlay from '_common/util/SpinnerOverlay'
// import {c_log} from '_common/util/logger'

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
        const { initialFormValues = {}, validationScheme = {}, regType = "A",
            pleaseConfirmEmailRoute, confirmedEmailSuccessUrl } = this.props;
        return (

            <div style={{ padding: '10px' }}>
                <Formik
                    initialValues={{ ...INITIAL_FORM_VALUES, ...initialFormValues }}
                    validationSchema={Yup.object().shape({ ...VALIDATION_SCHEMA, ...validationScheme })}
                    onSubmit={(values, { setSubmitting, setFieldTouched }) => {
                        const { email, passwordOne, displayName } = values;


                        this.setState({ loading: true, error: null });

                        setTimeout(() => {

                            setSubmitting(false);

                            userService
                                .registerWithEmailAndPassword(email, passwordOne)

                                .then(uid => {

                                    return userService.createAuthProfile(
                                        uid,
                                        email,
                                        displayName,
                                        regType
                                    );


                                })
                                .then((uid) => {
                                    if (this.props.createFullProfile) {
                                        return this.props.createFullProfile({ uid, ...values });
                                    }
                                    else {
                                        return Promise.resolve();
                                    }
                                })
                                .then(() => {
                                    return userService.sendEmailVerification(confirmedEmailSuccessUrl);
                                })
                                .then(() => {
                                    this.setState({ ...INITIAL_STATE });
                                    this.props.history.push(pleaseConfirmEmailRoute);

                                })

                                .catch(error => {                                    
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