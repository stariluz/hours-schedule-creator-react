import React from "react";
import './Button.css'
const Button = ({ children, verticalButton, horizontalButton, active, onClick, className }) => {
    const onClickEvent = (event) => {
        if (onClick) {
            onClick(event);
        }
    }
    return <button type="button" className={"button " + `${verticalButton ? 'button-vertical ' : ''}` + `${horizontalButton ? 'button-horizontal ' : ''}` + `${active ? 'active ' : ''}`+`${className?className:''} `} onClick={(event) => onClickEvent(event)}>
        {children}
    </button>
}
export default Button;