import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import ampoule from "../../assets/Frame.svg";
import logoSymbol from "../../assets/Logo symbol.svg";
import ellipse from "../../assets/ellipse.png";

const CSS = `
  .ny-hero {
    position: relative; width: 100%; min-height: 100vh; overflow: hidden;
    background: linear-gradient(261.62deg, rgba(238,166,255,0.15) 8.15%, rgba(29,103,241,0.15) 98.68%), #FFFFFF;
    display: flex; align-items: center;
  }

  /* Décorations : cachées sur mobile */
  .ny-hero-deco { pointer-events: none; position: absolute; }
  @media (max-width: 768px) { .ny-hero-deco { display: none !important; } }

  /* Contenu */
  .ny-hero-content {
    position: relative; z-index: 10; width: 100%;
    padding: clamp(100px, 15vw, 140px) 5vw 60px min(17%, 7vw);
  }
  @media (max-width: 768px) {
    .ny-hero-content {
      padding: 110px 24px 60px;
      text-align: center;
      display: flex; flex-direction: column; align-items: center;
    }
  }

  .ny-hero-label {
    font-size: clamp(0.9rem, 2vw, 1.4rem);
    color: #FB9B11; display: block; margin-bottom: 6px;
  }

  .ny-hero-h1 {
    font-size: clamp(3rem, 10vw, 8rem);
    color: #1D1D1F; line-height: 0.85;
    font-weight: 900; margin: 0 0 20px; letter-spacing: -2px;
  }
  @media (max-width: 480px) {
    .ny-hero-h1 { font-size: clamp(2.8rem, 14vw, 3.8rem); letter-spacing: -1px; line-height: 0.9; }
  }

  .ny-hero-sub {
    font-size: clamp(1rem, 1.8vw, 1.4rem);
    color: #64748b; max-width: 580px;
    line-height: 1.35; margin: 0 0 28px;
  }

  .ny-hero-btns { display: flex; flex-wrap: wrap; gap: 12px; }
  @media (max-width: 768px) { .ny-hero-btns { justify-content: center; } }
  @media (max-width: 380px) {
    .ny-hero-btns { flex-direction: column; width: 100%; }
    .ny-hero-btns .p-button { width: 100% !important; justify-content: center; }
  }
`;

export default function Hero() {
  const navigate = useNavigate();

  return (
    <>
      <style>{CSS}</style>
      <div className="ny-hero">

        {/* Ampoule */}
        <img src={ampoule} alt="" aria-hidden className="ny-hero-deco"
          style={{ width:"90px", top:"48%", left:"57%", transform:"translate(-50%,-50%) rotate(-5deg)", zIndex:20 }} />

        {/* Logo symbol */}
        <img src={logoSymbol} alt="" aria-hidden className="ny-hero-deco"
          style={{ width:"clamp(200px,30vw,423px)", bottom:"5%", right:"8%", transform:"rotate(-9deg)", opacity:0.8, zIndex:1 }} />

        {/* Ellipse */}
        <img src={ellipse} alt="" aria-hidden className="ny-hero-deco"
          style={{ width:"clamp(80px,25vw,250px)", top:"50%", right:0, transform:"translateY(-50%)", zIndex:0 }} />

        {/* Contenu texte */}
        <div className="ny-hero-content">
          <div style={{ maxWidth:"860px" }}>
            <h1 style={{ fontSize:"clamp(0.9rem,2vw,1.4rem)", color:"#FB9B11", marginBottom:"6px", fontWeight:400 }}>
              Arrêtez de postuler,
            </h1>
            <h1 className="ny-hero-h1">
              faites-vous<br />recruter !
            </h1>
            <p className="ny-hero-sub">
              NYOTA, c'est l'avenir du recrutement en Afrique.
            </p>
            <div className="ny-hero-btns">
              <Button
                label="COMMENCER"
                className="p-button-rounded !bg-[#FF7A00] !border-[#FF7A00] !px-8 !py-3 !font-bold"
                onClick={() => navigate("/register")}
              />
              <Button
                label="PASSER LE TEST"
                className="p-button-rounded !bg-[#FF7A00] !border-[#FF7A00] !px-8 !py-3 !font-bold"
                onClick={() => navigate("/login")}
              />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
