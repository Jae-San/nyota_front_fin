import React from "react";
import logoSymbol from "../../assets/Logo symbol.svg";

export default function LoginHead() {
  return (
    <div style={{
      position:"relative", width:"100%", overflow:"hidden",
      background:"linear-gradient(261.62deg, rgba(238,166,255,0.15) 8.15%, rgba(29,103,241,0.15) 98.68%), #FFFFFF",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"clamp(120px,18vw,200px) 24px clamp(100px,15vw,200px)",
      minHeight:"clamp(500px, 70vw, 600px)",
    }}>
      <div style={{position:"relative", zIndex:2, textAlign:"center"}}>
        <h1 style={{
          fontSize:"clamp(2.4rem,7vw,5.5rem)",
          fontWeight:"800", color:"#1D1D1F",
          margin:"0 0 12px", lineHeight:1.05, letterSpacing:"-1px",
        }}>
          Se connecter
        </h1>
        <p style={{fontSize:"clamp(1rem,2vw,1.3rem)", color:"#6E6E73", margin:0}}>
          Accédez à votre espace NYOTA
        </p>
      </div>
      <img src={logoSymbol} alt="" aria-hidden style={{
        position:"absolute", width:"clamp(160px,28vw,380px)",
        bottom:"5%", right:"2%", transform:"rotate(-9deg)",
        opacity:0.7, zIndex:1, pointerEvents:"none",
      }} />
    </div>
  );
}
