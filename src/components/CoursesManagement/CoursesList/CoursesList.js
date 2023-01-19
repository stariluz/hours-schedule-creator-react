import produce from "immer";
import React from "react";
import CourseRow from "./CourseRow/CourseRow";
import CoursesListAddCourseButton from "./CourseRow/CoursesListAddCourseButton";

import "./CoursesList.css";

export default class CoursesList extends React.Component{
    constructor(props){
        super(props);
    }
    renderRows(){

        const rows=this.props.courses.map((row,index)=>{
            return <CourseRow
                {...row}
                key={index}
                // onClickOnHideProfessor={()=>this.handleClickOnHideProfessor(index)}
                // onClickOnShowProfessor={()=>this.handleClickOnShowProfessor(index)}
                // onChangeColor={(value)=>this.handleChangeColor(index, value)}
                // onChangeName={(value)=>this.handleChangeName(index, value)}
                // onChangeAbbreviation={(value)=>this.handleChangeAbbreviation(index, value)}
                // onChangeProfessor={(value)=>this.handleChangeProfessor(index, value)}
                onCourseChange={(type,value)=>this.props.onCourseChange(index,type,value)}
                onAddCourse={()=>this.props.onAddCourse()}
                onRemoveCourse={()=>this.props.onRemoveCourse(index)}
            />
        })
        return rows;
    }
    render(){
        return (
            <div className="courses-list">
                { this.renderRows() }
                <CoursesListAddCourseButton
                    onClick={()=>this.props.onAddCourse()}
                />
            </div>
        );
    }
}