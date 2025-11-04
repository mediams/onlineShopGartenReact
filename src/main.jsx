import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ModalProvider } from "./context/ModalContext";
import store from "./store/store.js";
import "./index.scss";
import App from "./App.jsx";
import { DialogProvider } from "./context/DialogContect.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <DialogProvider>
          <ThemeProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </ThemeProvider>
        </DialogProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
