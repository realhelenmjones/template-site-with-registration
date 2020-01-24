import React from 'react'
import { useHistory } from "react-router-dom";

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './link.css'



const CustomLink = ({ to, children }) =>{
    const history = useHistory();
    return (<div className="btn-link CustomLink_Comp"
        style={{ textDecoration: 'none' }}
        onClick={() => history.push(to)}
    >
        {children}
    </div>);
}

CustomLink.propTypes = {
    to: PropTypes.string.isRequired
};

const LooksLikeALink = ({ onClick, children }) =>
    <span className="btn-link CustomLink_Comp"
        onClick={onClick}
    >
        {children}
    </span>

LooksLikeALink.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default withRouter(CustomLink);

export{LooksLikeALink}