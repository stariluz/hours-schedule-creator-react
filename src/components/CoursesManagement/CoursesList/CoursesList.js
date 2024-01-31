import produce from "immer";
import React from "react";
import CourseRow from "./CourseRow/CourseRow";
import CoursesListAddCourseButton from "./CourseRow/CoursesListAddCourseButton";

import "./CoursesList.css";
import CourseCard from "./CourseCard/CourseCard";

export default class CoursesList extends React.Component{
    renderRows(){
        const rows=this.props.courses.map((row,index)=>{
            return <CourseCard
                {...row}
                key={index}
                onInputChange={(type,value)=>this.props.onCourseChangeOutHistory(index,type,value)}
                onInputChangeEnds={(type,value)=>this.props.onCourseChange(index,type,value)}
                onRemove={()=>this.props.onRemoveCourse(index)}
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