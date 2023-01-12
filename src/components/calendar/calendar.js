class Calendar extends React.Component{
    renderHourClass(hour,key){
        const hourComponent=<HourClass hour={hour} key={key}/>;
        // console.log(hourComponent);
        return hourComponent;
    }
    renderHourTime(hour){
        const hourComponent=<Hour hour={hour} key={'hour'-hour}/>;
        // console.log(hourComponent);
        return hourComponent;
    }
    renderDay(day, key){
        const hours=Array(24).fill(null).map((value,index)=>{
            return this.renderHourClass(index,day+"_"+index);
        });
        console.log(hours);
        let dayComponent=
        <div className="day" key={key}>
            <div className="day__name">
                { day }
            </div>
            { hours }
        </div>
        return dayComponent;
    }
    renderWeek(){
        const days=['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'];
        const hoursTime=Array(24).fill(null).map((value,index)=>{
            return this.renderHourTime(index);
        });
        let weekComponent=
        <div className="week">
            <div className="hours__time">
                <div>Hora</div>
                {hoursTime}
            </div>
            {
                days.map((day,index)=>{
                    return this.renderDay(day,"row-"+day);
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