import React from "react";
import './Button.css'
const Button = ({ children, verticalButton, horizontalButton, active, onClick, className }) => {
    console.log(active);
    const onClickEvent = (event) => {
        if (onClick) {
            onClick(event);
        }
    }
    return <button className={"button " + `${verticalButton ? 'button-vertical ' : ''}` + `${horizontalButton ? 'button-horizontal ' : ''}` + `${active ? 'active ' : ''}`+`${className?className:''} `} onClick={(event) => onClickEvent(event)}>
        {children}
    </button>
}
export default Button;