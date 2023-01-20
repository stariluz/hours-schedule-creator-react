import React from "react";
import "./CourseRow.css";

export default class CourseRow extends React.Component{
    handleInput(type,event){
        this.props.onCourseChange(type,event.target.value);
    }
    render(){
        return(
            <div className="course-row">
                <div className="course-row__color">
                    <input type="color"
                        placeholder="Color"
                        onChange={(event)=>{
                            console.log(HexToHSL(event.target.value));
                            this.props.onCourseChange("color",HexToHSL(event.target.value))
                        }}
                        value={ HSLToHex(this.props.color.h,this.props.color.s,this.props.color.l) }
                    />
                </div>
                <div className="course-row__name">
                    <input type="text"
                        placeholder="Nombre"
                        onChange={(event)=>{this.handleInput("name",event)}}
                        value={ this.props.name }
                    />
                </div>
                <div className="course-row__abbreviation">
                    <input type="text"
                        placeholder="Abrebviación"
                        onChange={(event)=>{this.handleInput("abbreviation",event)}}
                        value={ this.props.abbreviation }
                    />
                </div>
                {
                this.props.hasProfessor===false?
                    <div className="course-row__professor--button">
                        <button
                            onClick={()=>this.props.onCourseChange("hasProfessor",true)}
                        >
                            Add professor
                        </button>
                    </div>
                :
                    <div className="course-row__professor">
                        <input type="text"
                            placeholder="Profesor"
                            onChange={(event)=>{this.handleInput("professor",event)}}
                            value={ this.props.professor }
                        />
                        <button
                            onClick={()=>this.props.onCourseChange("hasProfessor",false)}
                        >
                            x
                        </button>
                    </div>
                }
                <div className="course-row__hours">
                    N.of.H: { this.props.numberOfHours }
                </div>
                
                <button
                    onClick={()=>{
                        this.props.onRemoveCourse()
                    }}
                >
                    x
                </button>
            </div>
        );
    }
}
function HSLToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
function HexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);

    return {h, s, l};
}