import React, { useState } from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
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
    <Card>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>

    </div>
  );
}

export default App;
