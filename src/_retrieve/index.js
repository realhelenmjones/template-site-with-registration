import React from 'react';

import PropTypes from "prop-types";

import Spinner from '_common/util/Spinner'

import { Alert } from 'bootstrap-4-react';

import ErrorMessage from '_common/components/ErrorMessage'


const INITIAL_STATE = {
    Loading: null,
    error: null,
    data: null
}

class Retrieve extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() {
        const { retrieveDataFunc, retrieveDataArgs = {} } = this.props;

        this.setState({
            loading: true
        });


        retrieveDataFunc({ ...retrieveDataArgs })
            .then((data) =>
                this.setState(
                    {
                        loading: false,
                        data: data,
                        error: null
                    }
                )
            )
            .catch(error => {
                this.setState({ error, loading: false, data: null });
            });

    }

    render() {
        const { data, error, loading } = this.state;
        return (
            <>
                {loading ? <Spinner /> :
                    <>
                        {error && <Alert danger><ErrorMessage error={error} /></Alert>}
                        {data && this.props.children(data)}
                    </>
                }
            </>
        );
    }
}


Retrieve.propTypes = {
    retrieveDataFunc: PropTypes.func.isRequired,
    retrieveDataArgs: PropTypes.object
};

export default Retrieve;

