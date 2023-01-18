import React from 'react';

import './App.css'
import ScheduleCreator from './ScheduleCreator/ScheduleCreator';

// enableMapSet(); // Immer

export default class App extends React.Component {
    render(){
        return(
            <div className="page">
                <div className="page__content">
                    <ScheduleCreator/>
                </div>
            </div>
        );
    }
}
