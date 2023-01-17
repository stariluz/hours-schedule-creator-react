import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';

// import './index.css'

const dom=document.querySelector("#root");
const root=ReactDOM.createRoot(dom);
root.render(<App/>);