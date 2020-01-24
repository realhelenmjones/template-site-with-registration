import React from 'react'

import './icons.css'


const ArmStrength =({clear, ...rest}) =>  
clear? <img src="/images/icons8-muscle-64.jpg" className='icon' alt="muscle" {...rest}/>
:<img src="/images/icons8-muscle-48.jpg" className='icon'  alt="muscle" {...rest}/>

const EditIcon = (props) =>{
 return (<img className='icon-action' src="/images/edit.png"  alt="edit" {...props}/>)
}

const WarnIcon = (props) =>{
    return (<img className="big" src="/images/warn.png"  alt="warn" {...props}/>)
   }

export {ArmStrength,EditIcon, WarnIcon}