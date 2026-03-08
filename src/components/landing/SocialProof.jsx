import React from 'react';
import mainHand from "../../assets/main.svg";
import jeuneAfrique from "../../assets/jeune_afrique.jpeg";
import escp from "../../assets/escp.jpeg";
import cobasa from "../../assets/COBASA.jpg.jpeg";
import Ambassade from "../../assets/Ambassade de la RB en F.png";
import Asso from "../../assets/Association polytechnique.png";
import hec from "../../assets/HEC Paris.jpeg";
import MA from "../../assets/la-maison-afrique-logo.png";
import EY from "../../assets/EY_logo.png";
import ESP from "../../assets/ESP-Logo_1200x1200px-01.png";

const CSS = `
  .ny-sp {
    position: relative; width: 100%; max-width: 2000px;
    margin: 0 auto;
    background: #FFFFFF;
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
    padding: clamp(40px, 6vw, 80px) clamp(16px, 5vw, 60px);
  }

  .ny-sp-title {
    font-family: "'DM Serif Display', serif";
    font-weight: 800;
    font-size: clamp(24px, 4.5vw, 66px);
    line-height: 1.1;
    color: #1a1a1a;
    max-width: 1100px;
    margin: 24px auto clamp(32px, 5vw, 60px);
    text-align: center;
  }

  /* Grille partenaires */
  .ny-sp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%; max-width: 1000px;
  }
  @media (max-width: 600px) {
    .ny-sp-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .ny-sp-cell {
    display: flex; align-items: center; justify-content: center;
    padding: clamp(16px, 4vw, 44px);
    border: 1px solid #f0f0f0;
    min-height: 100px;
    transition: background 0.2s;
  }
  .ny-sp-cell:hover { background: #fafafa; }

  .ny-sp-cell img {
    max-width: 100%; max-height: clamp(50px, 7vw, 90px);
    object-fit: contain;
    filter: grayscale(100%); opacity: 0.8;
    transition: filter 0.3s ease, opacity 0.3s ease;
  }
  .ny-sp-cell:hover img { filter: grayscale(0%); opacity: 1; }
`;

const partners = [
  { id:1, logo: jeuneAfrique, href:"https://www.jeuneafrique.com/", alt:"Jeune Afrique" },
  { id:2, logo: escp, href:"https://espartners.co", alt:"ESCP" },
  { id:3, logo: cobasa, href:"http://cobasa.co.za/", alt:"COBASA" },
  { id:4, logo: Ambassade, href:"https://paris.diplomatie.bj/", alt:"Ambassade" },
  { id:5, logo: Asso, href:"https://ax.polytechnique.org/", alt:"Polytechnique" },
  { id:6, logo: hec, href:"https://www.hec.edu/fr", alt:"HEC Paris" },
  { id:7, logo: MA, href:"https://www.lamaisondelafrique.com/", alt:"Maison de l'Afrique" },
  { id:8, logo: EY, href:"https://www.ey.com/fr_fr", alt:"EY" },
  { id:9, logo: ESP, href:"https://espartners.co/", alt:"ESP" },
];

export default function SocialProof() {
  return (
    <>
      <style>{CSS}</style>
      <section className="ny-sp">

        <img
          src={mainHand} alt="Partenariat"
          style={{
            width:"clamp(80px,10vw,150px)", height:"auto",
            rotate:"45deg",
            filter:"invert(65%) sepia(98%) saturate(1511%) hue-rotate(1deg) brightness(101%) contrast(98%)"
          }}
        />

        <h2 className="ny-sp-title">
          Rejoignez nos partenaires qui construisent avec nous l'avenir du recrutement en Afrique.
        </h2>

        <div className="ny-sp-grid">
          {partners.map(p => (
            <div className="ny-sp-cell" key={p.id}>
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                <img src={p.logo} alt={p.alt}
                  onMouseOver={e => { e.currentTarget.style.filter="grayscale(0%)"; e.currentTarget.style.opacity="1"; }}
                  onMouseOut={e => { e.currentTarget.style.filter="grayscale(100%)"; e.currentTarget.style.opacity="0.8"; }}
                />
              </a>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
