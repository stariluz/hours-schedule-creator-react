import React from "react";
import "./coursesListAddCourseButton.css";

export default class CoursesListAddCourseButton extends React.Component{
    render(){
        return(
            <div className="course-button__add">
                <button
                    onClick={()=>this.props.onClick()}
                >
                    Agregar
                </button>
            </div>
        );
    }
}