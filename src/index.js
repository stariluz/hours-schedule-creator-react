import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';

// import './index.css'
// Opt-in to Webpack hot module replacement
if (module.hot) module.hot.accept()

const dom=document.querySelector("#root");
const root=ReactDOM.createRoot(dom);
root.render(<App/>);

(() => {
    console.log('webpack worked')
})()