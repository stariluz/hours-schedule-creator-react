import React from "react";
import "./CourseRow.css";
import { SketchPicker, PhotoshopPicker } from "react-color";
import InputColorPicker from "../../../FormsComponents/InputColorPicker/InputColorPicker";

export default class CourseRow extends React.Component{
    constructor(props){
        super(props);
    }
    handleInput(type,event){
        this.props.onCourseChange(type,event.target.value);
    }
    handleColorChange(color){
        // console.log("FAST:", color.hsl);
        this.props.onCourseChangeOutHistory("color",color.hsl)
    }
    onNewColorSelected(color){
        // console.log("COLOR:", color.hsl);
        this.props.onCourseChange("color",color.hsl)
    }
    render(){
        return(
            <div className="course-row">
                <div className="course-row__color">
                    <InputColorPicker
                        color={{
                            hsl: this.props.color
                        }}
                        onChange={(color)=>this.handleColorChange(color)}
                        onChangeComplete={(color)=>this.onNewColorSelected(color)}
                    />
                </div>
                <div className="course-row__name">
                    <input type="text"
                        placeholder="Nombre"
                        onChange={(event)=>{this.handleInput("name",event)}}
                        value={ this.props.name }
                    />
                </div>
                <div className="course-row__abbreviation">
                    <input type="text"
                        placeholder="Abrebviación"
                        onChange={(event)=>{this.handleInput("abbreviation",event)}}
                        value={ this.props.abbreviation }
                    />
                </div>
                {
                this.props.hasProfessor===false?
                    <div className="course-row__professor--button">
                        <button
                            onClick={()=>this.props.onCourseChange("hasProfessor",true)}
                        >
                            Add professor
                        </button>
                    </div>
                :
                    <div className="course-row__professor">
                        <input type="text"
                            placeholder="Profesor"
                            onChange={(event)=>{this.handleInput("professor",event)}}
                            value={ this.props.professor }
                        />
                        <button
                            onClick={()=>this.props.onCourseChange("hasProfessor",false)}
                        >
                            x
                        </button>
                    </div>
                }
                <div className="course-row__hours">
                    N.of.H: { this.props.numberOfHours }
                </div>
                
                <button
                    onClick={()=>{
                        this.props.onRemoveCourse()
                    }}
                >
                    x
                </button>
            </div>
        );
    }
}