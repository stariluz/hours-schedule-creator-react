import React from "react";
import CoursesList from "./CoursesList/CoursesList";
import "./COursesManagement.css"
export default class CoursesManagement extends React.Component{
    render(){
        return(
            <CoursesList
                courses={this.props.courses}
                onCourseChangeOutHistory={(index,type,value)=>this.props.onCourseChangeOutHistory(index,type,value)}
                onCourseChange={(index,type,value)=>this.props.onCourseChange(index,type,value)}
                onRemoveCourse={(index)=>this.props.onRemoveCourse(index)}
                onAddCourse={()=>this.props.onAddCourse()}
            />
        );
    }
}