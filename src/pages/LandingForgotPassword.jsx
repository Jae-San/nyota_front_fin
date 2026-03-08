import React from "react";
import ForgotPasswordHead from "../components/landing/ForgotPasswordHeader";
import ForgotPassword from "../components/landing/ForgotPassword";

export default function LandingForgotPassword() {
  return (
    <div style={{minHeight:"100vh", background:"#f9fafb"}}>
      <ForgotPasswordHead />
      <div style={{
        display:"flex", justifyContent:"center",
        padding:"clamp(32px,5vw,64px) clamp(12px,4vw,32px) 80px",
      }}>
        <ForgotPassword />
      </div>
    </div>
  );
}
