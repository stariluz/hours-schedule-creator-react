'use strict';

// import React from 'react'; // DEV
// import ReactDOM from 'react-dom'; // DEV

class App extends React.Component {
    render(){
        return(
            <h1>Hola mundo</h1>
        );
    }
}

const dom=document.querySelector("#root");
const root=ReactDOM.createRoot(dom);
root.render(<App/>);