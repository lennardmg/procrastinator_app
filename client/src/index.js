import React from 'react';
import ReactDOM from 'react-dom/client';
import StartPage from './StartPage';
import { BrowserRouter } from "react-router-dom";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));


fetch("/user/id")
    .then((res) => res.json())
    .then((data) => {

        if (!data.userId) {
     root.render(
         <React.StrictMode>
             <BrowserRouter>
                 <StartPage />
             </BrowserRouter>
         </React.StrictMode>
     );
        } else {
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
        }
    });