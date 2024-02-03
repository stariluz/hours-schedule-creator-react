import React from "react";
import { SketchPicker } from "react-color";
import "./InputColorBgAndText.css";
import "../Colors/Colors.css";
import { useState } from "react";
import { IconBucket, IconPaintFilled, IconTextColor } from "@tabler/icons-react";
import Button from "../Button/Button";

const hslToCssColor = (color) => {
  return `hsl(${color.h},  ${color.s * 100}%, ${color.l * 100}%)`;
}
const InputColorBgAndText = ({
  color = {
    h: 341,
    s: 1,
    l: 0.75
  },
  text = "#000",
  onChange,
  onChangeComplete,
  onTextChange,
  onTextChangeComplete
}) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(0);
  const [style, setStyle] = useState({
    color: color,
    text: text,
  });
  console.log(color, text);

  const onChangeEvent = (color) => {
    if (onChange) {
      onChange(color);
    }

    setStyle({
      ...style,
      'color': color.hsl
    });
  }
  const onChangeCompleteEvent = (color) => {
    if (onChangeComplete) {
      onChangeComplete(color);
    }

    setStyle({
      ...style,
      'color': color.hsl
    });
  }
  const onTextChangeEvent = (color) => {
    if (onTextChange) {
      onTextChange(color);
    }

    setStyle({
      ...style,
      'text': color.hex
    });
  }
  const onTextChangeCompleteEvent = (color) => {
    if (onTextChangeComplete) {
      onTextChangeComplete(color);
    }

    setStyle({
      ...style,
      'text': color.hex
    });
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
        <div className={"input__color__color custom-color"}
          style={{
            "--hour-bg-hue": `${color.h}`,
            "--hour-bg-saturation": `${color.s * 100}%`,
            "--hour-bg-lightness": `${color.l * 100}%`,
          }}
        ></div>
        {/* 
        <IconTextColor className={"input__color__text " + text} style={{
          color: text,
        }}></IconTextColor> */}

        <span className="input__color__text custom-color-text" style={{
          '--input-color-text-color': text,
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
              color={color}
              onChange={(color) => onChangeEvent(color)}
              onChangeComplete={(color) => onChangeCompleteEvent(color)}
              disableAlpha={true}
              presetColors={[]}
            />
            : null
          }
          {colorPickerVisible == 2 ?
            <SketchPicker
              className="color__picker"
              color={text}
              onChange={(color) => onTextChangeEvent(color)}
              onChangeComplete={(color) => onTextChangeCompleteEvent(color)}
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