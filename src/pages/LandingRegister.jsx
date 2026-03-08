import React from "react";
import RegisterHead from "../components/landing/RegisterHead";
import Register from "../components/landing/Register";

export default function LandingRegister() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>

      {/* ── Bandeau d'accueil avec dégradé ── */}
      <RegisterHead />

      {/* ── Formulaire centré qui remonte légèrement sur le bandeau ── */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "0 16px",
        marginTop: "-40px",
        position: "relative",
        zIndex: 10,
      }}>
        <Register />
      </div>

      {/* ── Espace footer ── */}
      <div style={{ height: "80px" }} />
    </div>
  );
}
