import React from 'react'

import './style.css'

const BL = ({children, ...rest}) => <div className="BL_Comp" {...rest}>{children}</div> 

const LI = ({children}) => <>&bull; &nbsp; {children}<br/></>

BL.LI = LI;

export default BL