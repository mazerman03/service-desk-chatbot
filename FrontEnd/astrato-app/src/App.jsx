import * as React from "react";
import { useState } from 'react';
import './App.css';
import "@chatscope/chat-ui-kit-react-styles/dist/default/styles.min.css";
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react"

function App() {
  const [count, setCount] = useState(0);

  return (
    <NextUIProvider>
        <div className="App">
      
       </div>
  </NextUIProvider>
  );
}

export default App;