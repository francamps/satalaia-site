import React from "react";

import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 124 124"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        y="6.10352e-05"
                        width="124"
                        height="124"
                        fill="var(--clr-fluo)"
                        strokeWidth={2}
                    />
                    <rect
                        x="34.5"
                        y="36"
                        width="56"
                        height="73"
                        stroke="#232323"
                        strokeWidth={2}
                    />
                    <path
                        d="M24.7607 34.7931L21.2983 16.902L102.08 14.1089L99.8613 32.1964L24.7607 34.7931Z"
                        stroke="#232323"
                        strokeWidth={2}
                    />
                </svg>

                <h2>Sa Talaia</h2>
            </div>
        </header>
    );
};

export default Header;
