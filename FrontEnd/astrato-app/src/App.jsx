import * as React from "react";
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
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