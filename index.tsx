import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import "./fonts/League_Spartan.css";
import ThemeProvider from "./layouts/ThemeProvider";
import store, { persistor } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer />
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
