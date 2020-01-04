import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

const SpinnerOverlay = ({ loading, text, children }) =>
    <LoadingOverlay
        active={loading}
        spinner
        text={text?text:''}
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

export default SpinnerOverlay;
