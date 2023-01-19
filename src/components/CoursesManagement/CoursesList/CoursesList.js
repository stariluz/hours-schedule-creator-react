import produce from "immer";
import React from "react";
import CourseRow from "./CourseRow/CourseRow";
import CoursesListAddCourseButton from "./CourseRow/CoursesListAddCourseButton";

import "./CoursesList.css";

export default class CoursesList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            courses: Array(1).fill({
                color:"#F5BE29",
                name: "Sin nombre",
                abbreviation: "S. N.",
                professor: "",
                numberOfHours: 0,
                hasProfessor: false,
            }),
        }
    }
    handleClickOnHideProfessor(index){
        const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
            coursesDraft[index]={
                ...coursesDraft[index], hasProfessor: false
            }
        });
        this.setState({
            courses: updatedCourses,
        });
    }
    handleClickOnShowProfessor(index){
        const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
            coursesDraft[index]={
                ...coursesDraft[index], hasProfessor: true
            }
        });
        this.setState({
            courses: updatedCourses,
        });
    }
    handleChangeColor(index, value){
        const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
            coursesDraft[index]={
                ...coursesDraft[index], color: value
            }
        });
        this.setState({
            courses: updatedCourses,
        });
        console.log(value);
    }
    handleChangeName(index, value){
        const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
            coursesDraft[index]={
                ...coursesDraft[index], name: value
            }
        });
        this.setState({
            courses: updatedCourses,
        });
        console.log(value);
    }
    handleChangeAbbreviation(index, value){
        const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
            coursesDraft[index]={
                ...coursesDraft[index], abbreviation: value
            }
        });
        this.setState({
            courses: updatedCourses,
        });
        console.log(value);
    }
    handleChangeProfessor(index, value){
        const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
            coursesDraft[index]={
                ...coursesDraft[index], professor: value
            }
        });
        this.setState({
            courses: updatedCourses,
        });
        console.log(value);
    }
    handleAddCourse(){
        const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
            coursesDraft.push(
                {
                    color:"#FFFFFF",
                    name: "",
                    abbreviation: "",
                    professor: "",
                    numberOfHours: 0,
                    hasProfessor: false,
                }
            )
        });
        this.setState({
            courses: updatedCourses,
        });
    }
    renderRows(){

        const rows=this.state.courses.map((row,index)=>{
            return <CourseRow
                {...row}
                key={index}
                onClickOnHideProfessor={()=>this.handleClickOnHideProfessor(index)}
                onClickOnShowProfessor={()=>this.handleClickOnShowProfessor(index)}
                onChangeColor={(value)=>this.handleChangeColor(index, value)}
                onChangeName={(value)=>this.handleChangeName(index, value)}
                onChangeAbbreviation={(value)=>this.handleChangeAbbreviation(index, value)}
                onChangeProfessor={(value)=>this.handleChangeProfessor(index, value)}
            />
        })
        return rows;
    }
    render(){
        return (
            <div className="courses-list">
                { this.renderRows() }
                <CoursesListAddCourseButton
                    onClick={()=>this.handleAddCourse()}
                />
            </div>
        );
    }
}