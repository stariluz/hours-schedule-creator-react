import React from "react";

export default class HistoryNavigation extends React.Component{
    render(){
        return(
            <div className="">
                <button
                    onClick={()=>this.props.onPreviousStep()}
                >Previous</button>
                <button
                    onClick={()=>this.props.onNextStep()}
                >Next</button>
                <button>See last changes</button>
            </div>
        );
    }
}