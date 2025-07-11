import React from "react";
import { Route, Routes } from "react-router"
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import OnBoardingPage from './pages/OnBoardingPage.jsx';

function App() {
  return (
    <div className="" data-theme = "night">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/call" element={<CallPage/>} />
        <Route path="/chat" element={<ChatPage/>} />
        <Route path="/onboarding" element={<OnBoardingPage/>} />
      </Routes>
    </div>
  );
}

export default App;
