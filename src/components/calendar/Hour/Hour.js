import React from 'react'; // DEV

import "./Hour.css";

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
        // console.log(this.props.content);
        if(this.props.content===null){
            return <button className="hour__space"
            onClick={
                ()=>this.props.onClick()
            }>
            </button>
        }
        return(
            <button className="hour__space"
            onClick={
                ()=>this.props.onClick()
            }>
                { this.props.content.abbreviation }
            </button>
        );
    }
}