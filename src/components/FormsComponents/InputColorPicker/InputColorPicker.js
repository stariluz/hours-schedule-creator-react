import React from "react";
import { SketchPicker } from "react-color";
import "./InputColorPicker.css";
export default class InputColorPicker extends React.Component{
    
    constructor(props){
        super(props);
        console.log(this.props.color);
        this.state={
            colorPickerVisible: false,
        }
        // console.log(this.state);
    }
    hslToCssColor(color){
        return `hsl(${color.h},  ${color.s*100}%, ${color.l*100}%)`;
    }
    handleColorChange(color){
        if(this.props.onChange){
            this.props.onChange(color);
        }else{
            this.setState({
                style: {
                    'color': color.hex
                }
            });
        }
    }
    handleColorChangeComplete(color){
        if(this.props.onChangeComplete){
            this.props.onChangeComplete(color);
        }else{
            this.setState({
                style: {
                    'color': color.hex
                }
            });
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
        const style= {
            color: this.props.color.hsl?this.hslToCssColor(this.props.color.hsl):"#ffffff",
        };
        return(
            <div className="input__color__container">
                <button className="input__color__box"
                    onClick={()=>this.toogleColorPicker()}
                >
                    <div className={"input__color__color "+style.color}
                        style={{
                            backgroundColor: style.color,
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
                        color={style.color}
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