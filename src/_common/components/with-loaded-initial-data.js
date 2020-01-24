import React from 'react';
import PropTypes from "prop-types";
import { Alert } from 'bootstrap-4-react';

import Spinner from '_common/util/Spinner'
import ErrorMessage from '_common/components/ErrorMessage'
// import {c_log} from '_common/util/logger'


const INITIAL_STATE = {
    Loading: null,
    error: null,
    data: null
}

const withLoadedInitialData = (WrappedComponent, loadData) => {
    class Inner extends React.Component {

        constructor(props) {
            super(props);
            this.state = INITIAL_STATE;
        }


        componentDidMount() {
            const { retrieveDataArgs = {} } = this.props;

            this.setState({
                loading: true
            });


            loadData({ ...retrieveDataArgs })
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
            const { loading, error, data } = this.state;
            return (
                <>
                    {loading ? <Spinner /> :
                        <>
                            {error && <Alert danger><ErrorMessage error={error} /></Alert>}

                            {data && <WrappedComponent initialData={this.state.data} {...this.props} />}
                        </>
                    }
                </>
            );
        }
    }
    Inner.propTypes = {
        retrieveDataArgs: PropTypes.object
    };
    return Inner;
}



export default withLoadedInitialData;

