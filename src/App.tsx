import React from "react";
import Header from "./Header";
import "./App.css";
import Contact from "./Contact";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="App-content">
                <div className="banner">Intelligent world building</div>
                <Contact />
            </div>
        </div>
    );
}

export default App;
