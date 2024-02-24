import * as React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getEelementById("root"));
root.render(
    <App/>
)

// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";

function App() {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
      <YourApplication />
    </NextUIProvider>
  );
}