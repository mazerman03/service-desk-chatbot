// App.tsx or App.jsx
import React, { useState } from 'react';
import { Card, CardBody } from "@nextui-org/react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Card>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
  );
}

export default App;
