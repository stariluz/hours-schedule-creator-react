import React from 'react'; // DEV

import "./hour.css";

export class Hour extends React.Component{
    render(){
        return(
            <div className="hour__time">
                { (this.props.hour<10? '0' : '') + this.props.hour }:00
            </div>
        );
    }
}
export class HourSpace extends React.Component{
    render(){
        return(
            <button className="hour__space"
            onClick={
                ()=>this.props.onClick()
            }>
                { this.props.contentValue }
            </button>
        );
    }
}