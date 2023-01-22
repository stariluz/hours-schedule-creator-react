import React from "react";
import { SketchPicker } from "react-color";
import "./InputColorPicker.css";
export default class InputColorPicker extends React.Component{
    
    constructor(props){
        super(props);
        // console.log(this.props.color);
        this.state={
            style: {
                color: this.props.color.hsl?this.hslToCssColor(this.props.color.hsl):"#ffffff",
            },
            colorPickerVisible: false,
        }
        // console.log(this.state);
    }
    hslToCssColor(color){
        return `hsl(${color.h},  ${color.s*100}%, ${color.l*100}%)`;
    }
    handleColorChange(color){
        this.setState({
            style: {
                'color': color.hex
            }
        });
        if(this.props.onChange){
            this.props.onChange(color);
        }
    }
    handleColorChangeComplete(color){
        this.setState({
            style: {
                'color': color.hex
            }
        });
        if(this.props.onChangeComplete){
            this.props.onChangeComplete(color);
        }
    }
    toogleColorPicker(){
        this.setState({
            colorPickerVisible: !this.state.colorPickerVisible,
        });
    }
    closeColorPicker(){
        this.setState({
            colorPickerVisible: false,
        });
    }
    render(){
        return(
            <div className="input__color__container">
                <button className="input__color__box"
                    onClick={()=>this.toogleColorPicker()}
                >
                    <div className={"input__color__color "+this.state.style.color}
                        style={{
                            backgroundColor: this.state.style.color,
                        }}
                    ></div>
                </button>
                {this.state.colorPickerVisible?
                <div className="color__picker__popover">
                    <div className="color__picker__out"
                        onClick={()=>this.closeColorPicker()}
                    >
                    </div>
                    <SketchPicker
                        className="color__picker"
                        color={this.state.style.color}
                        onChange={(color)=>this.handleColorChange(color)}
                        onChangeComplete={(color)=>this.handleColorChangeComplete(color)}
                        disableAlpha={true}
                        presetColors={[]}
                    />
                </div>
                :null
                }
            </div>
        );
    }
}