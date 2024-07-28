import React from "react";
import './Button.css'
const Button = ({
  children,
  onClick,
  verticalButton, horizontalButton,
  className, active, type
}) => {
  const onClickEvent = (event) => {
    if (onClick) {
      onClick(event);
    }
  }
  return <button type={type || 'button'} className={"button " + `${verticalButton ? 'button-vertical ' : ''}` + `${horizontalButton ? 'button-horizontal ' : ''}` + `${active ? 'active ' : ''}` + `${className ? className : ''} `} onClick={(event) => onClickEvent(event)}>
    {children}
  </button>
}
export default Button;