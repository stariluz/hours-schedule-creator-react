import React from 'react';
import { Hour, HourClass, HourSpace } from './Hour/Hour';
import "./Calendar.css";

export let FIRST_HOUR=6;
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

    renderHourSpace(day, hour, thereIsClass){
        return(
            <HourSpace
                key={day+"_"+hour}
                onClick={()=>this.props.onClickOnHour(day,hour)}
                thereIsClass={thereIsClass}
            />
        );
    }
    renderHourTime(hour){
        const hourComponent=<Hour hour={hour} key={'hour-'+hour}/>;
        return hourComponent;
    }
    renderDay(day){
        const hoursMap=this.props.hoursMap;
        const numberOfHours=24-FIRST_HOUR;
        const courses=this.props.courses;
        const hours=Array(numberOfHours).fill(null).map((value,index)=>{
            const hour = index+FIRST_HOUR;
            const thereIsClass=hoursMap[day][hour]>0?true:false;
            return this.renderHourSpace(day, hour, thereIsClass);
        });
        let length=0;
        let hour=0;
        let hoursClass=[];
        let dayClasses=hoursMap[day];
        for(let i=0; i<dayClasses.length; i++){
            // console.log(dayClasses[i]);
            if(dayClasses[i]===0)continue;
            // console.log("WORKS");
            length=1;
            hour=i;
            while (dayClasses[i]===dayClasses[i+1]) {
                i++;
            }
            length+=i-hour;
            hoursClass.push({
                "hour": hour,
                "length": length,

            });
        }
        console.log("DEV - hoursClass:",hoursClass);
        hoursClass=hoursClass.map((hourClass)=>{
            return(
                <HourClass
                    key={day+"_"+hourClass.hour+"_"+hourClass.length}
                    time={hourClass}
                    content={courses[hoursMap[day][hourClass.hour]-1]}
                    // onClick={()=>this.props.onClickOnHour(day,hour)}
                />
            );
        });
        let dayComponent=
        <div className="day__column" key={"row_"+day}>
            <div className="day__name">
                { days[day] }
            </div>
            <div className="day__content">
                <div className="day__classes">
                    { hoursClass }
                </div>
                <div className="day__hours">
                    { hours }
                </div>
            </div>
        </div>
        return dayComponent;
    }
    renderWeek(){
        const hoursTime=Array(24-FIRST_HOUR).fill(null).map((value,index)=>{
            return this.renderHourTime(index+FIRST_HOUR);
        });
        let daySpaces=Object.keys(daysMap).map((day)=>{
            return this.renderDay(day);
        });
        // let dayClasses=Object.keys(daysMap).map((day)=>{
        //     return this.renderDayClasses(day);
        // });

        let weekComponent=
        <div className="week">
            <div className="hours__time">
                <div>Hora</div>
                { hoursTime }
            </div>
            { daySpaces }
        </div>
        
        console.log("DEV - - - - - - - - - - - -:",);
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