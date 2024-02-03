import React from 'react'; // DEV

import "./Hour.css";
import { FIRST_HOUR } from '../Calendar';

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
        return (
            <button className={`hour__space ${this.props.thereIsClass?'hour__space--class':''}`}
                onClick={
                    ()=>this.props.onClick()
                }
            >
            </button>
        );
    }
}
export class HourClass extends React.Component{
    render(){
        return(
            // <div className="hour__space hour__space--fill"
            //     onClick={
            //         ()=>this.props.onClick()
            //     }
            // >
                <button className="hour__space hour__class"
                    
                    style={{
                        "--hour-row-start": `${this.props.time.hour-FIRST_HOUR+1}`,
                        "--hour-row-length": `${this.props.time.length}`,
                        "--hour-bg-hue": `${this.props.content.color.h}`,
                        "--hour-bg-saturation": `${this.props.content.color.s*100}%`,
                        "--hour-bg-lightness": `${this.props.content.color.l*100}%`,
                    }}
                >
                    { this.props.content.abbreviation }
                </button>
            // </div>
        );
    }
}