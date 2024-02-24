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

//change variables to fit our app
const sendDataToBackend = async (inputData) => {
  try {
      const response = await fetch('/api/process_data', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ inputData })
      });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.processedData;
  } catch (error) {
      console.error('Error:', error);
      return null;
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const inputData = event.target.inputField.value;
  const processedData = await sendDataToBackend(inputData);
  if (processedData !== null) {
      // Update UI with processed data
      document.getElementById('outputField').textContent = processedData;
  } else {
      // Handle error
      console.error('Failed to process data');
  }
};


export default App;
