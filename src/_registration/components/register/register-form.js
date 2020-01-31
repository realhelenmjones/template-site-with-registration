import React from 'react';
import { compose } from 'recompose';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import urlPropType from 'url-prop-type';


import { Button, Alert } from 'bootstrap-4-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import EmailVerificationError from '../../util/email-verification-error'
import userService from '../../services/UserService'
import ErrorMessage from '_common/components/ErrorMessage';
// import { AlertModal } from '_common/components/Modals'


import SpinnerOverlay from '_common/util/SpinnerOverlay'
import { c_error } from '_common/util/logger';
// import { c_log } from '_common/util/logger'

const INITIAL_FORM_VALUES = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    displayName: ''
};


const VALIDATION_SCHEMA = {
    email: Yup.string().email()
        .required('Required'),
    passwordOne: Yup.string()
        .required('Required'),
    passwordTwo: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('passwordOne'), null], 'Passwords must match'),
    displayName:
        Yup.string()
            .required('Required')

}

const INITIAL_STATE = {
    error: null,
    loading: false,
    redirect: undefined
};


class RegisterFormBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
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
            pleaseConfirmEmail, confirmedEmailSuccessUrl,
            submitLabel = "Register", createFullProfile } = this.props;


        return (
            <>
                <Formik
                    initialValues={{ ...INITIAL_FORM_VALUES, ...initialFormValues }}
                    validationSchema={() => Yup.object().shape({ ...VALIDATION_SCHEMA, ...validationScheme })}
                    onSubmit={(values, { setSubmitting, setFieldTouched }) => {
                        try {
                            const { email, passwordOne, displayName } = values;


                            this.setState({ loading: true, error: null });


                            setSubmitting(false);
                            
                            userService
                                .verifyDisplayNameUnique(displayName)
                                .then(() =>
                                    userService.registerWithEmailAndPassword({ email, password: passwordOne })
                                )
                                .then(uid => {                                    
                                    return userService.createAuthProfile({
                                        password: passwordOne,
                                        email,
                                        displayName,
                                        regType
                                    }
                                    );
                                })
                                .then((uid) => {
                                    if (createFullProfile) {
                                        return createFullProfile({ ...values });
                                    }
                                    else {
                                        return Promise.resolve();
                                    }
                                })
                                .then(() => {
                                    return userService.sendEmailVerification(confirmedEmailSuccessUrl);
                                })
                                .catch(error => {
                                    if (!(error instanceof EmailVerificationError)) {                                        
                                        throw (error);
                                    }
                                })
                                .then(() => {
                                    pleaseConfirmEmail();
                                })
                                .catch(error => {
                                    this.setState({ error, loading: false });
                                })

                        }
                        catch (error) {
                            c_error(error);
                            this.setState({ error, loading: false });
                        }
                    }}
                >
                    {() => {
                        const { redirect } = this.state;
                        if (redirect)
                            return <Redirect to={redirect} />

                        return (
                            <>
                                <SpinnerOverlay loading={loading}>
                                    <div className="formContainer">
                                        {error ? <Alert danger><ErrorMessage error={error} /></Alert> : null}

                                        <Form>
                                            {this.props.children()}

                                            <Button primary lg type="submit" disabled={loading}>{submitLabel}</Button>

                                        </Form>
                                    </div>
                                </SpinnerOverlay>
                            </>
                        );
                    }}
                </Formik>
                {/* {error ?
                    <AlertModal id="registerError" title=""><Alert danger><ErrorMessage error={error} /></Alert></AlertModal>
                    : null} */}

            </>
        )
    }

}

RegisterFormBase.propTypes = {
    validationScheme: PropTypes.object,
    initialFormValues: PropTypes.object.isRequired,
    regType: PropTypes.string,
    pleaseConfirmEmail: PropTypes.func.isRequired,
    confirmedEmailSuccessUrl: urlPropType.isRequired,
    submitLabel: PropTypes.string,
    createFullProfile: PropTypes.func
};


const RegisterForm = compose(
    withRouter
)(RegisterFormBase);

export default RegisterForm;