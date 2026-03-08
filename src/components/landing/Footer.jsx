import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo_NYOTA.svg";

const CSS = `
  .ny-footer {
    background:#FFFFFF; color:#374151;
    border-top:1px solid #e5e7eb;
    padding:clamp(40px,6vw,72px) clamp(16px,5vw,64px) 0;
  }

  .ny-footer-grid {
    display:grid;
    grid-template-columns:2fr 1fr 1fr 1fr;
    gap:clamp(24px,4vw,48px);
    max-width:1500px; margin:0 auto;
    padding-bottom:clamp(32px,4vw,48px);
    border-bottom:1px solid #374151;
  }
  @media (max-width:900px) {
    .ny-footer-grid { grid-template-columns:1fr 1fr; gap:28px; }
  }
  @media (max-width:560px) {
    .ny-footer-grid { grid-template-columns:1fr; gap:24px; }
  }

  .ny-footer-brand img { height:68px; margin-bottom:12px; }
  .ny-footer-brand p { font-size:14px; color:#6b7280; line-height:1.7; max-width:280px; margin:0; }

  .ny-footer-col h4 { font-size:13px; font-weight:700; color:#fff; text-transform:uppercase; letter-spacing:1px; margin:0 0 16px; }
  .ny-footer-col ul { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
  .ny-footer-col li button {
    background:none; border:none; color:#6b7280;
    font-size:14px; cursor:pointer; padding:0; text-align:left;
    transition:color .2s;
  }
  .ny-footer-col li button:hover { color:#FF7A00; }

  /* Réseaux sociaux */
  .ny-footer-social { display:flex; gap:12px; margin-top:20px; }
  .ny-footer-social a {
    width:38px; height:38px; border-radius:50%;
    background:rgba(255,255,255,0.08); display:flex;
    align-items:center; justify-content:center;
    color:#9ca3af; font-size:16px; transition:all .2s;
    text-decoration:none;
  }
  .ny-footer-social a:hover { background:#FF7A00; color:#fff; }

  /* Bottom bar */
  .ny-footer-bottom {
    max-width:1400px; margin:0 auto;
    display:flex; justify-content:center; align-items:center;
    flex-wrap:wrap; gap:12px;
    padding:clamp(16px,3vw,24px) 0;
    font-size:13px; color:#6b7280;
  }
  @media (max-width:480px) {
    .ny-footer-bottom { flex-direction:column; text-align:center; }
  }
`;

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <>
      <style>{CSS}</style>
      <footer className="ny-footer">
        <div className="ny-footer-grid">

          {/* Brand */}
          <div className="ny-footer-brand">
            <img src={logo} alt="NYOTA"  />
            <p>Nous connectons les meilleurs talents avec des entreprises.</p>
            <div className="ny-footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="pi pi-facebook" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="pi pi-instagram" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="pi pi-linkedin" /></a>
            </div>
          </div>

          {/* Liens */}
          <div className="ny-footer-col">
            <h4>À propos</h4>
            <ul>
              <li><button onClick={() => navigate("/about")}>À propos</button></li>
              <li><button onClick={() => navigate("/talents")}>Talents</button></li>
              <li><button onClick={() => navigate("/entreprises")}>Entreprises</button></li>
              <li><button onClick={() => navigate("/contact")}>Contact</button></li>
            </ul>
          </div>

          <div className="ny-footer-col">
            <h4>Compte</h4>
            <ul>
              <li><button onClick={() => navigate("/login")}>Se connecter</button></li>
              <li><button onClick={() => navigate("/register")}>S'inscrire</button></li>
              <li><button onClick={() => navigate("/forgot-password")}>Mot de passe oublié</button></li>
              <li><button onClick={() => navigate("/dashboard")}>Tableau de bord</button></li>
            </ul>
          </div>

          <div className="ny-footer-col">
            <h4>Légal</h4>
            <ul>
              <li><button>Politique de confidentialité</button></li>
              <li><button>Conditions d'utilisation</button></li>
              <li><button>Mentions légales</button></li>
            </ul>
            <div style={{marginTop:"20px"}}>
              <button onClick={() => navigate("/contact")} style={{background:"#FF7A00", border:"none", borderRadius:"20px", color:"#fff", padding:"10px 20px", fontSize:"13px", fontWeight:"700", cursor:"pointer", whiteSpace:"nowrap"}}>
                NOUS CONTACTER
              </button>
            </div>
          </div>

        </div>

        <div className="ny-footer-bottom">
          <span>© {year} NYOTA. Tous droits réservés.</span>
          
        </div>
      </footer>
    </>
  );
}
