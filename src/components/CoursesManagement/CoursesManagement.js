import React from "react";
import CoursesList from "./CoursesList/CoursesList";

export default class CoursesManagement extends React.Component{
    render(){
        return(
            <CoursesList
                courses={this.props.courses}
                onCourseChange={(index,type,value)=>this.props.onCourseChange(index,type,value)}
                onRemoveCourse={(index)=>this.props.onRemoveCourse(index)}
                onAddCourse={()=>this.props.onAddCourse()}
            />
        );
    }
}