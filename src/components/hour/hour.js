class Hour extends React.Component{
    render(){
        return(
            <div className="hour__time">
                { (this.props.hour<10? '0' : '') + this.props.hour }:00
            </div>
        );
    }
}
class HourClass extends React.Component{
    render(){
        return(
            <div className="hour__class">

            </div>
        );
    }
}