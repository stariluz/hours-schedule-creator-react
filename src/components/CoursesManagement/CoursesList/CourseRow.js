import React from "react";

export default class CourseRow extends React.Component{
    render(){
        return(
            <div className="course-row">
                <div className="course-row__color">
                    <input type="color" />
                </div>
                <div className="course-row__name">
                    <input type="text"
                        value={ this.props.name }
                    />
                </div>
                <div className="course-row__abbreviation">
                    <input type="text"
                        value={ this.props.abbreviation }
                    />
                </div>
                {
                    this.props.professor===null?
                        <div className="course-row__professor--button">
                            <button
                                onClick={()=>{
                                    this.props.onClickOnShowProfessor()
                                }}
                            >
                                Add professor
                            </button>
                        </div>
                    :
                        <div className="course-row__professor">
                            <input type="text"
                                value={ this.props.professor }
                            />
                        </div>
                }
                <div className="course-row__hours">
                    Number of hours: { this.props.numberOfHours }
                </div>
            </div>
        );
    }
}