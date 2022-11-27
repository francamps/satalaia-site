import React from "react";
import "./App.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 124 124"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="124" height="124" fill="#FC8028" />
                    <rect
                        x="34.5"
                        y="36"
                        width="56"
                        height="73"
                        stroke="#000"
                        strokeWidth="2"
                    />
                    <path
                        d="M24.7607 34.793L21.2983 16.902L102.08 14.1088L99.8613 32.1963L24.7607 34.793Z"
                        stroke="#000"
                        strokeWidth="2"
                    />
                </svg>

                <h2>S'ATALAIA</h2>
            </header>
            <div className="App-content">
                <div className="banner">Intelligent world-building</div>
            </div>
            <div className="App-contact">
                <p className="contact">hi@satalaia.co</p>
            </div>
        </div>
    );
}

export default App;
