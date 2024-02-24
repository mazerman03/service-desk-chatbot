import React, { useState } from 'react';
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <div className="image-container">
        <img
          src="src/img/atrato.png"
          alt="Descripción de la imagen"
          className="rounded-image"/>
      </div>
    </div>
  );
}

export default App;
