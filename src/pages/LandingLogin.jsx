import React from "react";
import LoginHead from "../components/landing/LoginHead";
import Login from "../components/landing/Login";

export default function LandingLogin() {
  return (
    <div style={{minHeight:"100vh", background:"#f9fafb"}}>
      <LoginHead />
      <div style={{
        display:"flex", justifyContent:"center",
        padding:"clamp(32px,5vw,64px) clamp(12px,4vw,32px) 80px",
      }}>
        <Login />
      </div>
    </div>
  );
}
