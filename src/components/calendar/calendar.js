import React from 'react';
import { Hour, HourSpace } from './Hour/Hour';
import "./Calendar.css";

const FIRST_HOUR=6;
const days=['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'];
const daysMap={
    0: days[0],
    1: days[1],
    2: days[2],
    3: days[3],
    4: days[4],
    5: days[5],
    6: days[6],
}
/**
 * 
 */
class Calendar extends React.Component{

    renderHourSpace(day, hour, content, length){
        const hourComponent=
        <HourSpace
        key={day+"_"+hour}
            hour={hour}
            content={content}
            length={length}
            onClick={()=>this.props.onClickOnHour(day,hour)}
        />;
        return hourComponent;
    }
    renderHourTime(hour){
        const hourComponent=<Hour hour={hour} key={'hour-'+hour}/>;
        return hourComponent;
    }
    renderDay(day){
        const hoursMap=this.props.hoursMap;
        const numberOfHours=24-FIRST_HOUR;
        const hours=Array(numberOfHours).fill(null).map((value,index)=>{
            const hour = index+FIRST_HOUR;
            let course=null, courseAux=null;
            
            let length=0;
            // console.log("DEV:",this.props.courses);
            if(hoursMap[day][hour]>0){
                // console.log("YEEEEY");
                // console.log("DEV:",this.props.courses[hoursMap[day][hour]-1]);
                course = this.props.courses[hoursMap[day][hour]-1];
                if(course===this.props.courses[hoursMap[day][hour-1]-1]){
                    return;
                }
                length++;
                for(let iHour=hour+1; iHour<24; iHour++){
                    courseAux=this.props.courses[hoursMap[day][iHour]-1];
                    if(course!=courseAux)break;
                    length++;
                }
            }
            return this.renderHourSpace(day, hour, course, length);
        });
        let dayComponent=
        <div className="day" key={"row_"+day}>
            <div className="day__name">
                { days[day] }
            </div>
            { hours }
        </div>
        return dayComponent;
    }
    renderWeek(){
        const hoursTime=Array(24-FIRST_HOUR).fill(null).map((value,index)=>{
            return this.renderHourTime(index+FIRST_HOUR);
        });
        let weekComponent=
        <div className="week">
            <div className="hours__time">
                <div>Hora</div>
                { hoursTime }
            </div>
            {
                Object.keys(daysMap).map((day)=>{
                    return this.renderDay(day);
                })
            }
        </div>
        return weekComponent;
    }
    render(){
        return(
            <div className="calendar">
                {this.renderWeek()}
            </div>
        );
    }
}
export default Calendar;