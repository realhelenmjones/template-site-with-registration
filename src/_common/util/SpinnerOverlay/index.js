import React from 'react';

import PropTypes from "prop-types";

import LoadingOverlay from 'react-loading-overlay';
import Spinner from '../Spinner'

const SpinnerOverlay = ({ loading, text, children }) =>
    <LoadingOverlay
        active={loading}
        spinner={<Spinner />}
        text={text ? text : ''}
        styles={{
            overlay: (base) => ({
                ...base,
                background: 'rgba(225, 225, 225, 0.5)'
                // background: 'rgba(125, 125, 125, 0.5)'
            })
        }}
    >
        {children}
    </LoadingOverlay>

SpinnerOverlay.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default SpinnerOverlay;
