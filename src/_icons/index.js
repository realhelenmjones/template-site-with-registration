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

   const FlagIcon = (props) =>{
    return (<img className="flag" src="/images/union-jack.png"  alt="GB" {...props}/>)
   }


   const QLeftIcon = (props) =>{
    return (<img className="quote" src="/images/quote-left-50.png"  alt="quote left" {...props}/>)
   }

   const QRightIcon = (props) =>{
    return (<img className="quote" src="/images/quote-right-50.png"  alt="quote right" {...props}/>)
   }

   export {ArmStrength,EditIcon, WarnIcon, FlagIcon, QLeftIcon, QRightIcon}