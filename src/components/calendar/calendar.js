const FIRST_HOUR=6;
let amountOfClasses=5;
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

class Calendar extends React.Component{
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
        const currentHoursMap=this.state.history[this.state.currentTime].hoursMap.slice();
        currentHoursMap[day][hour]++;
        currentHoursMap[day][hour]%=amountOfClasses;

        // this.setState({
        //     history: [...this.state.history, currentHoursMap],
        //     currentTime: this.state.currentTime+1,
        // });
        console.log("DEV: HANDLE CLICK ON HOUR ",hour," AT ",daysMap[day], currentHoursMap);
    }
    renderHourSpace(day, hour, contentValue){
        // console.log(hoursMap);
        const hourComponent=
        <HourSpace
            hour={hour}
            contentValue={contentValue}
            key={day+"_"+hour}
            onClick={()=>this.handleClickOnHour(day,hour)}
        />;
        // console.log(hourComponent);
        return hourComponent;
    }
    renderHourTime(hour){
        const hourComponent=<Hour hour={hour} key={'hour-'+hour}/>;
        // console.log(hourComponent);
        return hourComponent;
    }
    renderDay(day){
        
        const hoursMap=this.state.history[this.state.currentTime].hoursMap;
        const hours=Array(24-FIRST_HOUR).fill(null).map((value,index)=>{
            const hour= index+FIRST_HOUR;
            return this.renderHourSpace(day, hour, hoursMap[day][hour]);
        });
        // console.log(hours,day);
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
                {hoursTime}
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