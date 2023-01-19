import React from "react";
import "./CourseRow.css";

export default class CourseRow extends React.Component{
    handleInput(type,event){
        this.props.onCourseChange(type,event.target.value);
    }
    render(){
        return(
            <div className="course-row">
                <div className="course-row__color">
                    <input type="color"
                        placeholder="Color"
                        onChange={(event)=>{(this.handleInput("color",event))}}
                        value={ this.props.color }
                    />
                </div>
                <div className="course-row__name">
                    <input type="text"
                        placeholder="Nombre"
                        onChange={(event)=>{(this.handleInput("name",event))}}
                        value={ this.props.name }
                    />
                </div>
                <div className="course-row__abbreviation">
                    <input type="text"
                        placeholder="Abrebviación"
                        onChange={(event)=>{(this.handleInput("abbreviation",event))}}
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
                            onChange={(event)=>{(this.handleInput("professor",event))}}
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