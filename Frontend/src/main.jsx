import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import LandingPage from "./LandingPage.jsx";
import Login from "../src/pages/Login.jsx";
import Signup from "../src/pages/Signup.jsx";
import MainChat from "./MainChat.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { CookiesProvider } from "react-cookie";
import NotFound from "./pages/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <App>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chats" element={<MainChat />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </App>
      </CookiesProvider>
    </BrowserRouter>
  </StrictMode>
);
