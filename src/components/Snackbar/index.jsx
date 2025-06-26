import React, { useState, useEffect } from "react";
import styled from "styled-components";
import notificationBell from "@/assets/notifications_active.png";

export default function Snackbar({
  title,
  message,
  duration = 3000,
  position,
}) {
  const [visible, setVisible] = useState(false);

  // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
  const SnackbarContainer = styled.div`
    position: fixed;
    ${position === "top-right" && "top: 20px; right: 20px;"}
    ${position === "top-left" && "top: 20px; left: 20px;"}
        ${position === "bottom-right" && "bottom: 20px; right: 20px;"}
        ${position === "bottom-left" && "bottom: 20px; left: 20px;"}
        ${position === "top-center" &&
    "top: 20px; left: 50%; transform: translateX(-50%);"}
        ${position === "bottom-center" &&
    "bottom: 20px; left: 50%; transform: translateX(-50%);"}
        background-color: #6EEB83;
    color: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: opacity 0.3s ease-in-out;
    opacity: ${visible ? "1" : "0"};
    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 9rem;
    text-align: center;
  `;

  const NotificationContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2.2rem 2.7rem 2.2rem 3rem;
    gap: 13.2rem;
  `;

  const NotificationTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: #000;
    font-family: "Lexend Deca";
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `;
  const Bell = styled.img`
    height: 4.5rem;
    width: 4.5rem;
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
      <NotificationContainer>
        <NotificationTextContainer>
          <p>{title}</p>
          <p>{message}</p>
        </NotificationTextContainer>
        <Bell src={notificationBell}></Bell>
      </NotificationContainer>
    </SnackbarContainer>
  );
}
