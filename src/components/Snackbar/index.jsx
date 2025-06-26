import React, { useState, useEffect } from "react";
import styled from "styled-components";


export default function Snackbar({ message, duration = 3000, position }) {
    const [visible, setVisible] = useState(false);

    // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
    const SnackbarContainer = styled.div`
        position: fixed;
        ${position === "top-right" && "top: 20px; right: 20px;"}
        ${position === "top-left" && "top: 20px; left: 20px;"}
        ${position === "bottom-right" && "bottom: 20px; right: 20px;"}
        ${position === "bottom-left" && "bottom: 20px; left: 20px;"}
        ${position === "top-center" && "top: 20px; left: 50%; transform: translateX(-50%);"}
        ${position === "bottom-center" && "bottom: 20px; left: 50%; transform: translateX(-50%);"}
        background-color: #323232;
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: opacity 0.3s ease-in-out;
        opacity: ${visible ? '1' : '0'};
        z-index: 1000;
        font-size: 16px;
        font-family: 'Arial', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 50px;
        text-align: center;
    `;

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    return (
        <SnackbarContainer position={position} visible={visible}>
            {message}
        </SnackbarContainer>
    );
}