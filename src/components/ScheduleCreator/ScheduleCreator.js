import React from "react";
import Calendar from "../calendar/calendar";
import HistoryNavigation from "../HistoryNavigation/HistoryNavigation";

export default class ScheduleCreator extends React.Component{
    handlePreviousStep(){
        
    }
    handleNextStep(){
        
    }
    render(){
        return(
            <div>
                <HistoryNavigation
                    onPreviousStep={()=>handlePreviousStep()}
                    onNextStep={()=>handleNextStep()}
                />
                <Calendar/>
            </div>
        );
    }
}