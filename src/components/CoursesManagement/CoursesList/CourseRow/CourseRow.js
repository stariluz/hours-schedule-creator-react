import React from "react";
import "./CourseRow.css";

export default class CourseRow extends React.Component{
    handleInputText(type,event){
        if(type==="color"){
            this.props.onChangeColor(event.target.value);
        }
        else if(type==="name"){
            this.props.onChangeName(event.target.value);
        }
        else if(type==="abbreviation"){
            this.props.onChangeAbbreviation(event.target.value);
        }
        else if(type==="professor"){
            this.props.onChangeProfessor(event.target.value);
        }
        // else if(type==="abbreviation"){
            
        // }
    }
    render(){
        return(
            <div className="course-row">
                <div className="course-row__color">
                    <input type="color"
                        placeholder="Color"
                        onChange={(event)=>{(this.handleInputText("color",event))}}
                        value={ this.props.color }
                    />
                </div>
                <div className="course-row__name">
                    <input type="text"
                        placeholder="Nombre"
                        onChange={(event)=>{(this.handleInputText("name",event))}}
                        value={ this.props.name }
                    />
                </div>
                <div className="course-row__abbreviation">
                    <input type="text"
                        placeholder="Abrebviación"
                        onChange={(event)=>{(this.handleInputText("abbreviation",event))}}
                        value={ this.props.abbreviation }
                    />
                </div>
                {
                this.props.hasProfessor===false?
                    <div className="course-row__professor--button">
                        <button
                            onClick={()=>{
                                this.props.onClickOnShowProfessor()
                            }}
                        >
                            Add professor
                        </button>
                    </div>
                :
                    <div className="course-row__professor">
                        <input type="text"
                            placeholder="Profesor"
                            onChange={(event)=>{(this.handleInputText("professor",event))}}
                            value={ this.props.professor }
                        />
                        <button
                            onClick={()=>{
                                this.props.onClickOnHideProfessor()
                            }}
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