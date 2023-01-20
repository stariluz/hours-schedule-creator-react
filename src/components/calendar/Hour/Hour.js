import React from 'react'; // DEV

import "./Hour.css";

export class Hour extends React.Component{
    render(){
        return(
            <div className="hour--time">
                { (this.props.hour<10? '0' : '') + this.props.hour }:00
            </div>
        );
    }
}
export class HourSpace extends React.Component{
    render(){
        // console.log(this.props.content);
        if(this.props.content===null){
            return (
                
                // <div className='hour__container'>
                    <button className="hour--space"
                        onClick={
                            ()=>this.props.onClick()
                        }
                    >
                    </button>
                // </div>
            );
        }
        return(
            // <div className='hour__container'>
                <button className="hour--space hour--class"
                    onClick={
                        ()=>this.props.onClick()
                    }
                    style={{
                        "--hour-bg-hue": `${this.props.content.color.h}`,
                        "--hour-bg-saturation": `${this.props.content.color.s}%`,
                        "--hour-bg-lightness": `${this.props.content.color.l}%`,
                    }}
                >
                    { this.props.content.abbreviation }
                </button>
            // </div>
        );
    }
}