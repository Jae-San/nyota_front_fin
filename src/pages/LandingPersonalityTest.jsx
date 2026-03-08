import React from "react";
import PersonalityTestHead from "../components/landing/PersonalityTestHead";
import PersonalityTest from "../components/landing/PersonalityTest";

export default function LandingPersonalityTest() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <PersonalityTestHead />
      <PersonalityTest />
    </div>
  );
}
