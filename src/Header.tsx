import React from "react";
import Contact from "./Contact";

import "./Header.css";

const Header = () => {
    return (
        <header className="App-header">
            <div className="logo">
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 124 124"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="2"
                        y="2"
                        width="120"
                        height="120"
                        stroke="#000"
                        strokeWidth="2"
                        rx="16"
                        ry="16"
                    />
                    <rect
                        x="34.5"
                        y="36"
                        width="56"
                        height="73"
                        fill="#FC8028"
                    />
                    <path
                        d="M24.7607 34.793L21.2983 16.902L102.08 14.1088L99.8613 32.1963L24.7607 34.793Z"
                        fill="#8F0D0E"
                    />
                </svg>

                <h2>S'ATALAIA</h2>
            </div>
            <Contact />
        </header>
    );
};

export default Header;
