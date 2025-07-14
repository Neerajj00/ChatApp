import React from "react";
import { Navigate, Route, Routes } from "react-router"
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import OnBoardingPage from './pages/OnBoardingPage.jsx';
import {Toaster  } from "react-hot-toast"
import { axiosInstance } from "./lib/axios.js";
import { useQuery } from "@tanstack/react-query";
import Loader from "./components/Loader.jsx";

function App() {
  const {data:authData , isLoading} = useQuery({
    queryKey : ["authUser"],
    queryFn: async()=>{
      const response = await axiosInstance.get("/auth/me");
      return response.data;
    },
    retry: false,
  })
  
  const authUser = authData?.user;
  if(isLoading) return <Loader />
  return (
    <div className="h-screen" data-theme = "night">
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" /> } />
        <Route path="/signup" element={ !authUser ? <SignUpPage/> : <Navigate to="/" /> } />
        <Route path="/login" element={ !authUser ? <LoginPage/> : <Navigate to="/" /> } />
        <Route path="/notification" element={ authUser ? <NotificationPage /> : <Navigate to="/login" /> } />
        <Route path="/call" element={ authUser ? <CallPage/> : <Navigate to="/login" /> } />
        <Route path="/chat" element={authUser ? <ChatPage/> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={ authUser ? <OnBoardingPage/> : <Navigate to="/login" />} />
      </Routes>
      
      <Toaster/>
    </div>
  );
}

export default App;
