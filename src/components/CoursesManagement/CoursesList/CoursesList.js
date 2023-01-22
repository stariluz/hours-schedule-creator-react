import produce from "immer";
import React from "react";
import CourseRow from "./CourseRow/CourseRow";
import CoursesListAddCourseButton from "./CourseRow/CoursesListAddCourseButton";

import "./CoursesList.css";

export default class CoursesList extends React.Component{
    renderRows(){
        const rows=this.props.courses.map((row,index)=>{
            return <CourseRow
                {...row}
                key={index}
                onCourseChangeOutHistory={(type,value)=>this.props.onCourseChangeOutHistory(index,type,value)}
                onCourseChange={(type,value)=>this.props.onCourseChange(index,type,value)}
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