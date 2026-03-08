import React from "react";
import logoSymbol from "../../assets/logo symbol.svg";

const RegisterHead = ({ children }) => {
  return (
    <div style={{
      position: "relative",
      width: "100%",
      minHeight: "650px",
      overflow: "hidden",
      background: "linear-gradient(261.62deg, rgba(238,166,255,0.15) 8.15%, rgba(29,103,241,0.15) 98.68%), #FFFFFF",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "200px 24px 180px",
    }}>
      {/* Texte d'accueil */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginBottom: "8px" }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(40px, 7vw, 72px)",
          fontWeight: 800,
          color: "#1D1D1F",
          margin: 0,
          letterSpacing: "-1px",
          lineHeight: 1.1,
        }}>
          S'inscrire
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(15px, 2vw, 18px)",
          fontWeight: 300,
          color: "#6E6E73",
          margin: "12px 0 0",
        }}>
          Créez votre compte et rejoignez la communauté NYOTA
        </p>
      </div>

      {/* Logo décoratif */}
      <img
        src={logoSymbol}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "clamp(220px, 28vw, 360px)",
          bottom: "4%",
          right: "2%",
          transform: "rotate(-9deg)",
          opacity: 0.7,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default RegisterHead;
