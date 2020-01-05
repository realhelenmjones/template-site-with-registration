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

import RegisterSuccessPage from './register-success'
import ConfirmEmailAddress from './please-confirm-email'
import EmailConfirmedPage from './email-confirmed'
import ResetPasswordPage from './forgot-password'
import RegisterForm from './register-form-A'
import RegisterFormB from './register-form-B'



// const RegisterPage = ({regType="A"}) => (
//     <div>
//        {regType=="A"? <RegisterForm /> :<RegisterFormB />}
//     </div>
// );




export default RegisterForm;

export { RegisterFormB,RegisterSuccessPage, ConfirmEmailAddress, EmailConfirmedPage, ResetPasswordPage };