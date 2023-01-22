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
                        color:{
                            h: 44,
                            s: 91,
                            l: 56
                        },
                        name: "Sin nombre",
                        abbreviation: "S. N.",
                        professor: "",
                        numberOfHours: 0,
                        hasProfessor: false,
                    })
                ],
            },
        }
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

    handleClickOnHour(day,hour){
        const nextState = produce(this.state,(stateDraft)=>{
            const currentTime=stateDraft.currentTime;
            const history=stateDraft.history.slice(0,currentTime+1);
            const currentIndexCourses=history[currentTime].currentIndexCourses;
            const coursesHistoryMap=stateDraft.historyMap.courses.slice(0,currentIndexCourses+1);
            const currentIndexHoursMap=history[currentTime].currentIndexHoursMap;
            const hoursMapHistoryMap=stateDraft.historyMap.hoursMap.slice(0,currentIndexHoursMap+1);

            const newHoursMap=produce(hoursMapHistoryMap[currentIndexHoursMap],(hoursMapDraft)=>{
                // console.log(coursesHistoryMap[currentIndexCourses].length);
                hoursMapDraft[day][hour]++;
                hoursMapDraft[day][hour]%=coursesHistoryMap[currentIndexCourses].length+1;
            });

            history.push({
                change: "Updated hours",
                currentIndexHoursMap: currentIndexHoursMap+1,
                currentIndexCourses: history[currentTime].currentIndexCourses,
            });
            stateDraft.history=history;

            hoursMapHistoryMap.push(newHoursMap);
            stateDraft.historyMap={
                courses: coursesHistoryMap,
                hoursMap: hoursMapHistoryMap,
            }

            stateDraft.currentTime++;
        });
        this.setState({...nextState});
    }
    
    handleCourseChange(index, field, value){
        const currentTime=this.state.currentTime;
        const history=this.state.history.slice(0,currentTime+1);
        
        const currentIndexCourses=history[currentTime].currentIndexCourses;
        const coursesHistoryMap=this.state.historyMap.courses.slice(0,currentIndexCourses+1);

        const currentIndexHoursMap=history[currentTime].currentIndexHoursMap;
        const hoursMapHistoryMap=this.state.historyMap.hoursMap.slice(0,currentIndexHoursMap+1);

        const updatedCourses=produce(coursesHistoryMap[currentIndexCourses],(coursesDraft)=>{
            coursesDraft[index][field]=value;
        })
        coursesHistoryMap.push(updatedCourses);
        
        history.push({
            change: "Edit course",
            currentIndexHoursMap: currentIndexHoursMap,
            currentIndexCourses: currentIndexCourses+1,
        });
        this.setState({
            history: history,
            historyMap:{
                hoursMap: hoursMapHistoryMap,
                courses: coursesHistoryMap,
            },
            currentTime: currentTime+1,
        });
    }
    handleCourseChangeOutHistory(index, field, value){
        const currentTime=this.state.currentTime;
        const history=this.state.history.slice(0,currentTime+1);
        
        const currentIndexCourses=history[currentTime].currentIndexCourses;
        const coursesHistoryMap=this.state.historyMap.courses.slice(0,currentIndexCourses+1);

        const currentIndexHoursMap=history[currentTime].currentIndexHoursMap;

        const updatedCourse=produce(coursesHistoryMap[currentIndexCourses],(coursesDraft)=>{
            coursesDraft[index][field]=value;
        })
        coursesHistoryMap[currentIndexCourses]=updatedCourse;
        
        this.setState({
            ...this.state,
            historyMap:{
                ...this.state.historyMap,
                courses: coursesHistoryMap,
            },
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
                    color: {
                        h: 0,
                        s: 50,
                        l: 100,
                    },
                    name: "",
                    abbreviation: "",
                    professor: "",
                    numberOfHours: 0,
                    hasProfessor: false,
                }
            );
        });
        coursesHistoryMap.push(updatedCourses);

        history.push({
            change: "Add course",
            currentIndexHoursMap: currentIndexHoursMap,
            currentIndexCourses: currentIndexCourses+1,
        });
        this.setState({
            history: history,
            historyMap: {
                hoursMap: hoursMapHistoryMap,
                courses: coursesHistoryMap,
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
        coursesHistoryMap.push(updatedCourses);
        
        history.push({
            change: "Remove course",
            currentIndexHoursMap: currentIndexHoursMap,
            currentIndexCourses: currentIndexCourses+1,
        });
        this.setState({
            history: history,
            historyMap: {
                hoursMap: hoursMapHistoryMap,
                courses: coursesHistoryMap,
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
        return(
            <div>
                <HistoryNavigation
                    onClickOnPreviousStep={()=>this.handlePreviousStep()}
                    onClickOnNextStep={()=>this.handleNextStep()}
                />
                <CoursesManagement
                    courses={currentCourses}
                    onCourseChangeOutHistory={(index,type,value)=>this.handleCourseChangeOutHistory(index,type,value)}
                    onCourseChange={(index,type,value)=>this.handleCourseChange(index,type,value)}
                    onAddCourse={()=>this.handleAddCourse()}
                    onRemoveCourse={(index)=>this.handleRemoveCourse(index)}
                />
                <Calendar
                    courses={currentCourses}
                    hoursMap={currentHoursMap}
                    onClickOnHour={(day,hour)=>this.handleClickOnHour(day,hour)}
                />
            </div>
        );
    }
}