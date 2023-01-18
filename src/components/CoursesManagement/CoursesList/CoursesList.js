import produce from "immer";
import React from "react";
import CourseRow from "./CourseRow";

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
    handleClickOnShowProfessor(index){
        const updatedCourses=produce(this.state.courses,(newCourses)=>{
            newCourses[index]={
                ...newCourses[index], hasProfessor: true
            }
        })
        this.setState({
            courses: updatedCourses,
        });
    }
    handleChangeColor(index, value){
        const updatedCourses=produce(this.state.courses,(newCourses)=>{
            newCourses[index]={
                ...newCourses[index], color: value
            }
        })
        this.setState({
            courses: updatedCourses,
        });
        console.log(value);
    }
    handleChangeName(index, value){
        const updatedCourses=produce(this.state.courses,(newCourses)=>{
            newCourses[index]={
                ...newCourses[index], name: value
            }
        })
        this.setState({
            courses: updatedCourses,
        });
        console.log(value);
    }
    handleChangeAbbreviation(index, value){
        const updatedCourses=produce(this.state.courses,(newCourses)=>{
            newCourses[index]={
                ...newCourses[index], abbreviation: value
            }
        })
        this.setState({
            courses: updatedCourses,
        });
        console.log(value);
    }
    handleChangeProfessor(index, value){
        const updatedCourses=produce(this.state.courses,(newCourses)=>{
            newCourses[index]={
                ...newCourses[index], professor: value
            }
        })
        this.setState({
            courses: updatedCourses,
        });
        console.log(value);
    }
    renderRows(){

        const rows=this.state.courses.map((row,index)=>{
            return <CourseRow
                {...row}
                key={index}
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
            <div>
                { this.renderRows() }
            </div>
        );
    }
}