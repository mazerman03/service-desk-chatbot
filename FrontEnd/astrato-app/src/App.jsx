// App.js
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import "./App.css";
import Chatbot from "./componentes/Chatbot";

function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  const handleButtonClick = () => {
    setShowChatbot(!showChatbot);
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <>
      <div className="app-container">
        <div className="image-container">
          <img
            src="img/atrato.png"
            alt="Atrato main page"
            className="background-image"
          />
        </div>
        <div className="button-container">
          <Button
            className="text-white shadow-lg"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              backgroundColor: "#779bf1",
              borderRadius: "50%",
            }}
            onClick={handleButtonClick}
          >
            <img
              src="img/bot2.png"
              alt="imagen de robot animado"
              style={{
                width: "73%",
                height: "auto",
                borderRadius: "50%",
              }}
            />
          </Button>
        </div>
      </div>
      {showChatbot && <Chatbot showChatbot={showChatbot} onClose={handleCloseChatbot} />}
    </>
  );
}

export default App;
