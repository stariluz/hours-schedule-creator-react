import React from "react";
import CourseRow from "./CourseRow";

export default class CoursesList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            courses: Array(1).fill({
                color:"ffffff",
                name: "Sin nombre",
                abbreviation: "S. N.",
                professor: null,
                numberOfHours: 0
            }),
        }
    }
    handleClickOnShowProfessor(){
        console.log("HOLA");
        this.setState({
            courses: Array(1).fill({
                color:"ffffff",
                name: "Sin nombre",
                abbreviation: "S. N.",
                professor: "",
                numberOfHours: 0
            }),
        })
    }
    renderRows(){

        const rows=this.state.courses.map((row,index)=>{
            return <CourseRow
                {...row}
                key={index}
                onClickOnShowProfessor={()=>this.handleClickOnShowProfessor()}
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