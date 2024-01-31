import React from "react";
import { SketchPicker } from "react-color";
import "./InputColorBgAndText.css";
import { useState } from "react";
import { IconBucket, IconPaintFilled, IconTextColor } from "@tabler/icons-react";
import Button from "../../UI/Button/Button";

const hslToCssColor = (color) => {
  return `hsl(${color.h},  ${color.s * 100}%, ${color.l * 100}%)`;
}
const InputColorBgAndText = (props) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(0);
  const [style, setStyle] = useState({
    color: props.color?.hsl ? hslToCssColor(props.color.hsl) : "red",
    text: props.text?.hsl ? hslToCssColor(props.text.hsl) : "blue",
  });

  const onColorChange = (color) => {
    if (props.onColorChange) {
      props.onColorChange(color);
    } else {
      setStyle({
        ...style,
        'color': color.hex
      });
    }
  }
  const onColorChangeComplete = (color) => {
    if (props.onColorChange) {
      props.onColorChange(color);
    } else {
      setStyle({
        ...style,
        'color': color.hex
      });
    }
  }
  const handleTextChange = (color) => {
    if (props.onTextChange) {
      props.onTextChange(color);
    } else {
      setStyle({
        ...style,
        'text': color.hex
      });
    }
  }
  const handleTextChangeComplete = (color) => {
    if (props.onTextChangeComplete) {
      props.onTextChangeComplete(color);
    } else {
      setStyle({
        ...style,
        'text': color.hex
      });
    }
  }
  const openColorPicker = (index) => {
    setColorPickerVisible(index);
  }
  const closeColorPicker = () => {
    setColorPickerVisible(0);
  }
  return (
    <div className="input__color-bg-text">
      <button className="input__color__box"
        onClick={() => openColorPicker(1)}
      >
        <div className={"input__color__color " + style.color}
          style={{
            backgroundColor: style.color,
          }}
        ></div>
        {/* 
        <IconTextColor className={"input__color__text " + style.text} style={{
          color: style.text,
        }}></IconTextColor> */}

        <span className="input__color__text" style={{
          '--input-color-text-color': style.text,
        }}>
          A
        </span>
      </button>
      {colorPickerVisible ?
        <div className="color__picker__popover">
          <div className="color__picker__out"
            onClick={() => closeColorPicker()}
          >
          </div>
          <header className="color__picker__controls">
            <Button
              className="btn-secondary"
              horizontalButton={true}
              onClick={() => openColorPicker(1)}
              active={colorPickerVisible == 1}>
              <IconPaintFilled></IconPaintFilled>
            </Button>
            <Button
              className="btn-secondary"
              horizontalButton={true}
              onClick={() => openColorPicker(2)}
              active={colorPickerVisible == 2}>
              <span className="input__color__text">
                A
              </span>
            </Button>
          </header>
          {colorPickerVisible == 1 ?
            <SketchPicker
              className="color__picker"
              color={style.color}
              onChange={(color) => onColorChange(color)}
              onChangeComplete={(color) => onColorChangeComplete(color)}
              disableAlpha={true}
              presetColors={[]}
            />
            : null
          }
          {colorPickerVisible == 2 ?
            <SketchPicker
              className="color__picker"
              color={style.text}
              onChange={(color) => handleTextChange(color)}
              onChangeComplete={(color) => handleTextChangeComplete(color)}
              disableAlpha={true}
              presetColors={[]}
            />
            : null
          }
        </div>
        : null
      }
    </div>
  );
}
export default InputColorBgAndText;