'use strict';

// import React from 'react'; // DEV
// import ReactDOM from 'react-dom'; // DEV

class App extends React.Component {
    render(){
        return(
            <div className="page">
                <div className="page__content">
                    <Calendar/>
                </div>
            </div>
        );
    }
}

const dom=document.querySelector("#root");
const root=ReactDOM.createRoot(dom);
root.render(<App/>);