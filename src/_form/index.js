import React from 'react';
// import { compose } from 'recompose';
import PropTypes from "prop-types";

import { Redirect, Link } from 'react-router-dom';
import { Button, Alert } from 'bootstrap-4-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {LooksLikeALink} from '_common/components/CustomLink'

import ErrorMessage from '_common/components/ErrorMessage'




import SpinnerOverlay from '_common/util/SpinnerOverlay'
import {c_error} from '_common/util/logger'



const INITIAL_STATE = {
    error: null,
    loading: false,
    complete: false
};

// export {withLoadedInitialValues}

class FormComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }



    componentDidUpdate() {
        if (this.state.error) {
            window.scrollTo(0, 0);
        }

    }

    render() {

        const { error, loading, complete } = this.state;
        const { validationScheme = {}, initialData,
            success, cancel, submitLabel = 'Submit', saveForm } = this.props;

        return (


            <SpinnerOverlay loading={loading}>
                <div className="formContainer">
                    {error && <Alert danger><ErrorMessage error={error} /></Alert>}
                    <Formik
                        initialValues={initialData}
                        validationSchema={() => Yup.object().shape(validationScheme)}

                        onSubmit={(values, { setSubmitting, setFieldTouched }) => {
                            try {

                                this.setState({ loading: true, error: null });


                                setSubmitting(false);

                                saveForm(values)

                                    .then(() => {
                                            success();                                       
                                    })

                                    .catch(error => {
                                        this.setState({ error, loading: false, complete: false });

                                    });
                            }
                            catch (error) {
                                c_error(error);
                                this.setState({ ...INITIAL_STATE, error });
                            }

                        }}
                    >
                        {() => {

                            return (
                                <>                                    
                                    <Form>
                                        {this.props.children}

                                        <Button primary type="submit" disabled={loading}>{submitLabel}</Button>
                                        {cancel && <>&nbsp; <LooksLikeALink onClick={cancel}>Cancel</LooksLikeALink></>}
                                    </Form>
                                </>
                            );
                        }}
                    </Formik>
                </div>
            </SpinnerOverlay>


        )
    }

}


FormComponent.propTypes = {    
    validationScheme: PropTypes.object,
    initialData: PropTypes.object.isRequired,
    success: PropTypes.func.isRequired,
    cancel: PropTypes.func,
    submitLabel: PropTypes.string,
    saveForm: PropTypes.func.isRequired
};

export default FormComponent;
