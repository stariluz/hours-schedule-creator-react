import React, { useRef } from "react";
import './Button.css'
import { IconDownload } from "@tabler/icons-react";
import Button from "./Button";
const FileButton = ({
  children,
  onClick, onFileChange,
  verticalButton, horizontalButton,
  className, name, id, active, multiple,
}) => {
  const inputRef = useRef(null);
  const onClickEvent = (event) => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger the hidden file input's click event
    }
    if (onClick) {
      onClick(event);
    }
  }
  const onChangeEvent = (event) => {
    if (onFileChange) {
      onFileChange(multiple?event.target.files:event.target.files[0]);
    }
  }
  const inputField =
    <input type="file" name={name} id={id} ref={inputRef} onChange={onChangeEvent} multiple={multiple} hidden />;
  return (
    <div className="btn-file">
      {inputField}
      <Button
        for={id}
        className={'btn-traslucid'}
        onClick={() => onClickEvent()}
      >
        {children ? children : <IconDownload />}
      </Button>
    </div>
  );
}
export default FileButton;