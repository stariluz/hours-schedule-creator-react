import React from "react";
import Calendar from "../calendar/calendar";
import HistoryNavigation from "../HistoryNavigation/HistoryNavigation";
import { produce } from 'immer';
import CoursesManagement from "../CoursesManagement/CoursesManagement";

let amountOfClasses=5;

export default class ScheduleCreator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentTime: 0,
            history: [
                {
                    change: "Start of the file",
                    currentIndexHoursMap: 0,
                    currentIndexCourses: 0,
                }
            ],
            historyMap: {
                hoursMap: [
                    Array(7).fill(Array(24).fill(0))
                ],
                courses: [
                    Array(1).fill({
                        color:"#F5BE29",
                        name: "Sin nombre",
                        abbreviation: "S. N.",
                        professor: "",
                        numberOfHours: 0,
                        hasProfessor: false,
                    })
                ],
            },
        }
        // const currentHoursMap=this.state.history[this.state.currentTime].hoursMap.slice();
        // console.log("DEV: Constructor",currentHoursMap);
    }
    
    handleClickOnHour(day,hour){
        // console.log(this.state.history);
        const nextState = produce(this.state,(stateDraft)=>{
            // console.log(stateDraft);
            const currentTime=stateDraft.currentTime;
            const history=stateDraft.history.slice(0,currentTime+1);
            const currentIndexCourses=history[currentTime].currentIndexCourses;
            const coursesHistoryMap=stateDraft.historyMap.courses.slice(0,currentIndexCourses+1);
            const currentIndexHoursMap=history[currentTime].currentIndexHoursMap;
            const hoursMapHistoryMap=stateDraft.historyMap.hoursMap.slice(0,currentIndexHoursMap+1);

            const newHoursMap=hoursMapHistoryMap[currentIndexHoursMap];
            // console.log(newHoursMap[day][hour]);
            newHoursMap[day][hour]++;
            newHoursMap[day][hour]%=currentIndexCourses+2;
            
            stateDraft.history= [
                ...history,
                {
                    change: "Updated hours",
                    currentIndexHoursMap: currentIndexHoursMap+1,
                    currentIndexCourses: history[currentTime].currentIndexCourses,
                }
            ];
            stateDraft.historyMap={
                courses: [...coursesHistoryMap],
                hoursMap: [...hoursMapHistoryMap, newHoursMap],
            }
            stateDraft.currentTime++;
        });
        
        this.setState({...nextState});
    }
    handlePreviousStep(){
        let newTime=this.state.currentTime-1;
        if(newTime<0){
            newTime=0;
        }
        this.setState({
            currentTime: newTime,
        });

    }
    handleNextStep(){
        let newTime=this.state.currentTime+1;
        if(newTime>=this.state.history.length){
            newTime=this.state.history.length-1;
        }
        this.setState({
            currentTime: newTime,
        });

    }
    
    // handleClickOnHideProfessor(index){
    //     const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
    //         coursesDraft[index]={
    //             ...coursesDraft[index], hasProfessor: false
    //         }
    //     });
    //     this.setState({
    //         courses: updatedCourses,
    //     });
    // }
    // handleClickOnShowProfessor(index){
    //     const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
    //         coursesDraft[index]={
    //             ...coursesDraft[index], hasProfessor: true
    //         }
    //     });
    //     this.setState({
    //         courses: updatedCourses,
    //     });
    // }
    // handleChangeColor(index, value){
    //     const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
    //         coursesDraft[index]={
    //             ...coursesDraft[index], color: value
    //         }
    //     });
    //     this.setState({
    //         courses: updatedCourses,
    //     });
    //     console.log(value);
    // }
    // handleChangeName(index, value){
    //     const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
    //         coursesDraft[index]={
    //             ...coursesDraft[index], name: value
    //         }
    //     });
    //     this.setState({
    //         courses: updatedCourses,
    //     });
    //     console.log(value);
    // }
    // handleChangeAbbreviation(index, value){
    //     const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
    //         coursesDraft[index]={
    //             ...coursesDraft[index], abbreviation: value
    //         }
    //     });
    //     this.setState({
    //         courses: updatedCourses,
    //     });
    //     console.log(value);
    // }
    // handleChangeProfessor(index, value){
    //     const updatedCourses=produce(this.state.courses,(coursesDraft)=>{
    //         coursesDraft[index]={
    //             ...coursesDraft[index], professor: value
    //         }
    //     });
    //     this.setState({
    //         courses: updatedCourses,
    //     });
    //     console.log(value);
    // }
    
    handleCourseChange(index, field, value){
        const currentTime=this.state.currentTime;
        const history=this.state.history.slice(0,currentTime+1);
        
        const currentIndexCourses=history[currentTime].currentIndexCourses;
        const coursesHistoryMap=this.state.historyMap.courses.slice(0,currentIndexCourses+1);

        const currentIndexHoursMap=history[currentTime].currentIndexHoursMap;
        const hoursMapHistoryMap=this.state.historyMap.hoursMap.slice(0,currentIndexHoursMap+1);

        const updatedCourses=produce(coursesHistoryMap[currentIndexCourses], (coursesDraft)=>{
            coursesDraft[index][field]=value;
        });
        this.setState({
            history: [
                ...history,
                {
                    change: "Edit course",
                    currentIndexHoursMap: currentIndexHoursMap,
                    currentIndexCourses: currentIndexCourses+1,
                }
            ],
            historyMap:{
                hoursMap: hoursMapHistoryMap,
                courses: updatedCourses,
            },
            currentTime: currentTime+1,
        });
    }
    handleAddCourse(){
        const currentTime=this.state.currentTime;
        const history=this.state.history.slice(0,currentTime+1);
        
        const currentIndexCourses=history[currentTime].currentIndexCourses;
        const coursesHistoryMap=this.state.historyMap.courses.slice(0,currentIndexCourses+1);

        const currentIndexHoursMap=history[currentTime].currentIndexHoursMap;
        const hoursMapHistoryMap=this.state.historyMap.hoursMap.slice(0,currentIndexHoursMap+1);

        const updatedCourses=produce(coursesHistoryMap[currentIndexCourses], (coursesDraft)=>{
            coursesDraft.push(
                {
                    color:"#FFFFFF",
                    name: "",
                    abbreviation: "",
                    professor: "",
                    numberOfHours: 0,
                    hasProfessor: false,
                }
            );
        });
        this.setState({
            history: [
                ...history,
                {
                    change: "Add course",
                    currentIndexHoursMap: currentIndexHoursMap,
                    currentIndexCourses: currentIndexCourses+1,
                }
            ],
            historyMap:{
                hoursMap: hoursMapHistoryMap,
                courses: updatedCourses,
            },
            currentTime: currentTime+1,
        });
    }
    handleRemoveCourse(index){
        const currentTime=this.state.currentTime;
        const history=this.state.history.slice(0,currentTime+1);
        
        const currentIndexCourses=history[currentTime].currentIndexCourses;
        const coursesHistoryMap=this.state.historyMap.courses.slice(0,currentIndexCourses+1);

        const currentIndexHoursMap=history[currentTime].currentIndexHoursMap;
        const hoursMapHistoryMap=this.state.historyMap.hoursMap.slice(0,currentIndexHoursMap+1);

        const updatedCourses=produce(coursesHistoryMap[currentIndexCourses], (coursesDraft)=>{
            coursesDraft.splice(index,1);
        });
        this.setState({
            history: [
                ...history,
                {
                    change: "Add course",
                    currentIndexHoursMap: currentIndexHoursMap,
                    currentIndexCourses: currentIndexCourses+1,
                }
            ],
            historyMap:{
                hoursMap: hoursMapHistoryMap,
                courses: updatedCourses,
            },
            currentTime: currentTime+1,
        });
    }

    render(){
        const currentTime=this.state.currentTime;
        const current=this.state.history[currentTime];
        const currentMap=this.state.historyMap;
        
        const currentIndexCourses=current.currentIndexCourses;
        const currentCourses=currentMap.courses[currentIndexCourses];

        const currentIndexHoursMap=current.currentIndexHoursMap;
        const currentHoursMap=currentMap.hoursMap[currentIndexHoursMap];
        console.log(this.state);
        return(
            <div>
                <CoursesManagement
                    courses={currentCourses}
                    onCourseChange={(index,type,value)=>this.props.handleCourseChange(index,type,value)}
                    onAddCourse={()=>this.handleAddCourse()}
                    onRemoveCourse={(index)=>this.handleRemoveCourse(index)}
                />
                <HistoryNavigation
                    onClickOnPreviousStep={()=>this.handlePreviousStep()}
                    onClickOnNextStep={()=>this.handleNextStep()}
                />
                <Calendar
                    hoursMap={currentHoursMap}
                    onClickOnHour={(day,hour)=>this.handleClickOnHour(day,hour)}
                />
            </div>
        );
    }
}