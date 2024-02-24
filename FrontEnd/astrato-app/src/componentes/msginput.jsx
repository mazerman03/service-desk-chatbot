import React, { useState } from "react";

const CustomMessageInput = ({ placeholder, onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
};

export default CustomMessageInput;