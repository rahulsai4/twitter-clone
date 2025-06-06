import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Sidebar from "./components/common/Sidebar.jsx";
import RightPanel from "./components/common/RightPanel.jsx";

import HomePage from "./pages/home/HomePage.jsx";
import LoginPage from "./pages/auth/login/LoginPage.jsx";
import SignUpPage from "./pages/auth/signup/SignUpPage.jsx";
import NotificationPage from "./pages/notification/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";
import { useAuthUser } from "./hooks/useAuthUser.jsx";

const App = () => {
    const {authUser, isLoading} = useAuthUser();
    
    if (isLoading) {
        return (
            <div className="h-screen flex  justify-center items-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }
    return (
        <div className="flex max-w-6xl mx-auto">
            {authUser && <Sidebar />}
            <Routes>
                <Route
                    path="/"
                    element={
                        authUser ? <HomePage /> : <Navigate to={"/login"} />
                    }
                />
                <Route
                    path="/signup"
                    element={authUser ? <Navigate to={"/"} /> : <SignUpPage />}
                />
                <Route
                    path="/login"
                    element={authUser ? <Navigate to={"/"} /> : <LoginPage />}
                />
                <Route
                    path="/notifications"
                    element={
                        authUser ? (
                            <NotificationPage />
                        ) : (
                            <Navigate to={"/login"} />
                        )
                    }
                />
                <Route
                    path="/profile/:username"
                    element={
                        authUser ? <ProfilePage /> : <Navigate to={"/login"} />
                    }
                />
            </Routes>
            {authUser && <RightPanel />}
            <Toaster />
        </div>
    );
};

export default App;
