// Chatbot.jsx

import React, { useState } from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator
} from "@chatscope/chat-ui-kit-react";
import "./Chatbot.css";

const AtratoBotIcon = () => (
  <div style={{ marginRight: '10px' }}>
    <img
      src="/img/bot.png"
      alt="Atrato-bot Icon"
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '1px solid #ccc',
      }}
    />
  </div>
);

const Chatbot = ({ showChatbot, onClose }) => {
  const [messages, setMessages] = useState([
    {
      message: "¡Hola! 👋 Soy el asistente virtual de Atrato. ¿En qué puedo ayudarte hoy?",
      sentTime: "justo ahora",
      sender: "Atrato-bot"
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "Atrato-bot") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
//      content: "Explica como si tuviera 10 años"
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages
      ]
    };

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => data.json())
      .then((data) => {
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "Atrato-bot"
        }]);
        setIsTyping(false);
      });
  }

  return (
    <div className={`Chatbot ${showChatbot ? '' : 'hidden'}`}>
      <div className="chatbot-header" style={{ 
        backgroundColor: '#ded0f9', 
        color: 'black',
        //borderBottomLeftRadius: '15px', 
        borderTopLeftRadius: '15px', 
        //borderBottomRightRadius: '15px',
        borderTopRightRadius: '15px', 
        backgroundColor: "#c6e3fa" }}>
        <span className="chatbot-title">Asistente Virtual</span>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <MainContainer style={{ border: '2px solid #ccc', borderRadius: '10px', width: '300px', height: '400px' }}>
        <ChatContainer>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <AtratoBotIcon />
            <div>
              <strong>Atrato-bot</strong>
              <p style={{ fontSize: '12px', color: 'gray' }}>Asistente Virtual</p>
            </div>
            <button className="close-button" onClick={onClose}>
              X
            </button>
          </div>
          <MessageList 
            scrollBehavior="smooth" 
            typingIndicator={isTyping ? <TypingIndicator content="Atrato-bot está escribiendo" /> : null}
            >
            {messages.map((message, i) => (
              <Message
                key={i}
                model={message}
                style={{
                  backgroundColor: '#c6e3fa',
                  borderRadius: '10px',
                  padding: '8px',
                  marginBottom: '8px',
                  color: 'white',
                }}
              />
            ))}
          </MessageList>
          <MessageInput placeholder="Escribe aquí tu mensaje" onSend={handleSend} attachments={false} />
        </ChatContainer>
      </MainContainer>
      </div>
  );
};

export default Chatbot;