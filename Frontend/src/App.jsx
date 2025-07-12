import React from "react";
import { Route, Routes } from "react-router"
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import OnBoardingPage from './pages/OnBoardingPage.jsx';
import {Toaster , toast } from "react-hot-toast"
import { axiosInstance } from "./lib/axios.js";
import { useQuery } from "@tanstack/react-query";

function App() {
  const {data} = useQuery({
    queryKey : ["todos"],
    queryFn: async()=>{
      const response = await axiosInstance.get("/auth/me");
      return response.data;
    },
    retry: false,
  })

  console.log(data);

  return (
    <div className="h-screen" data-theme = "night">
      <button onClick={()=>toast.error("error on clicking")}>create a toast</button>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/call" element={<CallPage/>} />
        <Route path="/chat" element={<ChatPage/>} />
        <Route path="/onboarding" element={<OnBoardingPage/>} />
      </Routes>
      
      <Toaster/>
    </div>
  );
}

export default App;
