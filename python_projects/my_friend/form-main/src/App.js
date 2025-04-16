import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import FriendForm from "./components/FriendForm";
import AppNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadDetailsForm from "./components/UploadDetailsForm";
import AuthPage from "./components/AuthForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Welcome from "./components/Welcome";
import Loading from "./components/Loading";

const App = () => {
  return (
    <Router basename="/My_Friend">
      <AppNavbar />
      <Routes>
      <Route
          path="/login"
          element={
            <AuthPage>
              <LoginForm />
            </AuthPage>
          }
        />
        <Route
          path="/register"
          element={
            <AuthPage>
              <RegisterForm />
            </AuthPage>
          }
        />
        <Route path="/friend-form" element={<FriendForm />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/upload-details" element={<UploadDetailsForm />} />
        <Route path="/loading" element={<Loading />} />

      </Routes>
    </Router>
  );
};

export default App;
