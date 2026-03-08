import React from "react";
import logoSymbol from "../../assets/Logo symbol.svg";

export default function PersonalityTestHead() {
  return (
    <div style={{
      position:"relative", width:"100%", overflow:"hidden",
      background:"linear-gradient(261.62deg, rgba(255,122,0,0.12) 8.15%, rgba(29,103,241,0.15) 98.68%), #FFFFFF",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"clamp(120px,18vw,200px) 24px clamp(100px,15vw,200px)",
      minHeight:"clamp(500px, 70vw, 600px)",
    }}>
      <div style={{position:"relative", zIndex:2, textAlign:"center"}}>
      
        <h1 style={{
          fontSize:"clamp(2.2rem,6vw,5rem)",
          fontWeight:"800", color:"#1D1D1F",
          margin:"0 0 12px", lineHeight:1.05, letterSpacing:"-1px",
        }}>
          Test de personnalité
        </h1>
        <p style={{fontSize:"clamp(1rem,2vw,1.2rem)", color:"#6E6E73", margin:"0 auto", maxWidth:"480px", textAlign:"center"}}>
          Aidez-nous à mieux vous connaître pour vous proposer les meilleures opportunités
        </p>
      </div>
      <img src={logoSymbol} alt="" aria-hidden style={{
        position:"absolute", width:"clamp(160px,28vw,380px)",
        bottom:"5%", right:"2%", transform:"rotate(-9deg)",
        opacity:0.6, zIndex:1, pointerEvents:"none",
      }} />
    </div>
  );
}
