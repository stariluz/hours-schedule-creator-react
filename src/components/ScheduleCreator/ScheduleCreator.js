import React from "react";
import Calendar from "../calendar/calendar";
import HistoryNavigation from "../HistoryNavigation/HistoryNavigation";
import { produce } from 'immer';

let amountOfClasses=5;

export default class ScheduleCreator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            history: [
                {
                    hoursMap: Array(7).fill(Array(24).fill(0)),
                }
            ],
            currentTime: 0,
        }
        // const currentHoursMap=this.state.history[this.state.currentTime].hoursMap.slice();
        // console.log("DEV: Constructor",currentHoursMap);
    }
    
    handleClickOnHour(day,hour){
        const currentTime = this.state.currentTime;
        const history = this.state.history.slice(0,currentTime+1);
        console.log(this.state.history);
        const nextHistory = {
            hoursMap:
                produce(
                    history[currentTime].hoursMap,
                    (hoursMapDraft) => {
                        hoursMapDraft[day][hour]++;
                        hoursMapDraft[day][hour]%=amountOfClasses;
                    }
                )
        };
        
        this.setState({
            history: [...history, nextHistory],
            currentTime: currentTime+1,
        });
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
    render(){
        return(
            <div>
                <HistoryNavigation
                    onClickOnPreviousStep={()=>this.handlePreviousStep()}
                    onClickOnNextStep={()=>this.handleNextStep()}
                />
                <Calendar
                    hoursMap={this.state.history[this.state.currentTime].hoursMap}
                    onClickOnHour={(day,hour)=>this.handleClickOnHour(day,hour)}
                />
            </div>
        );
    }
}