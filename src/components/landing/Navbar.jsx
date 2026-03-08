import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Logo_NYOTA.svg";

const CSS = `
  .ny-nav {
    position:fixed; top:0; left:0; width:100%; z-index:1000;
    transition:background .3s ease, box-shadow .3s ease;
  }
  .ny-nav.scrolled {
    background:rgba(255,255,255,0.97);
    box-shadow:0 2px 12px rgba(0,0,0,0.09);
    backdrop-filter:blur(8px);
  }
  .ny-nav-inner {
    max-width:1700px; margin:0 auto;
    display:flex; justify-content:space-between; align-items:center;
    padding:1rem 5vw; transition:padding .3s;
  }
  .ny-nav.scrolled .ny-nav-inner { padding:.6rem 5vw; }

  .ny-nav-logo { cursor:pointer; }
  .ny-nav-logo img { height:68px; width:auto; transition:height .3s; }
  .ny-nav.scrolled .ny-nav-logo img { height:54px; }

  /* Boutons desktop */
  .ny-nav-ctas { display:flex; gap:8px; align-items:center; }
  .ny-nav-btn-ghost {
    background:none; border:2px solid #FF7A00; color:#FF7A00;
    border-radius:20px; padding:8px 20px; font-size:13px; font-weight:700;
    cursor:pointer; transition:all .2s;
  }
  .ny-nav-btn-ghost:hover { background:#fff7ed; }
  .ny-nav-btn-solid {
    background:#FF7A00; border:2px solid #FF7A00; color:#fff;
    border-radius:20px; padding:8px 20px; font-size:13px; font-weight:700;
    cursor:pointer; transition:all .2s; box-shadow:0 4px 14px rgba(255,122,0,.3);
  }
  .ny-nav-btn-solid:hover { background:#e06900; border-color:#e06900; }

  /* Hamburger */
  .ny-hamburger {
    display:none; flex-direction:column; justify-content:center; gap:5px;
    width:40px; height:40px; background:none; border:none; cursor:pointer;
    padding:4px; z-index:1010;
  }
  .ny-hamburger span {
    display:block; width:24px; height:2px;
    background:#1D1D1F; border-radius:2px;
    transition:all .3s; transform-origin:center;
  }
  .ny-hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
  .ny-hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
  .ny-hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

  /* Menu mobile */
  .ny-mobile-menu {
    display:none; position:fixed; inset:0;
    background:rgba(255,255,255,0.98); z-index:1005;
    flex-direction:column; align-items:center; justify-content:center;
    gap:28px; opacity:0; pointer-events:none; transition:opacity .25s;
  }
  .ny-mobile-menu.open { opacity:1; pointer-events:all; }
  .ny-mobile-link {
    background:none; border:none; font-size:26px; font-weight:700;
    color:#1D1D1F; cursor:pointer; font-family:inherit; transition:color .2s;
  }
  .ny-mobile-link:hover { color:#FF7A00; }
  .ny-mobile-ctas { display:flex; flex-direction:column; gap:12px; width:260px; }
  .ny-mobile-ctas button { width:100%; height:50px; border-radius:25px; font-size:15px; font-weight:700; cursor:pointer; transition:all .2s; }

  @media (max-width:768px) {
    .ny-nav-ctas { display:none; }
    .ny-hamburger { display:flex; }
    .ny-mobile-menu { display:flex; }
    .ny-nav-logo img { height:52px !important; }
  }
`;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Masquer la navbar sur le dashboard
  const isDashboard = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/test");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (isDashboard) return null;

  const go = path => { navigate(path); setOpen(false); };

  return (
    <>
      <style>{CSS}</style>
      <nav className={`ny-nav${scrolled?" scrolled":""}`}>
        <div className="ny-nav-inner">
          <div className="ny-nav-logo" onClick={() => go("/")}>
            <img src={logo} alt="NYOTA" />
          </div>
          <div className="ny-nav-ctas">
            <button className="ny-nav-btn-ghost" onClick={() => go("/login")}>SE CONNECTER</button>
            <button className="ny-nav-btn-solid" onClick={() => go("/register")}>S'INSCRIRE</button>
          </div>
          <button className={`ny-hamburger${open?" open":""}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div className={`ny-mobile-menu${open?" open":""}`}>
        <button className="ny-mobile-link" onClick={() => go("/")}>Accueil</button>
        <div style={{width:"48px", height:"2px", background:"#f0f0f0", borderRadius:"2px"}} />
        <div className="ny-mobile-ctas">
          <button onClick={() => go("/login")} style={{background:"none", border:"2px solid #FF7A00", color:"#FF7A00"}}>SE CONNECTER</button>
          <button onClick={() => go("/register")} style={{background:"#FF7A00", border:"2px solid #FF7A00", color:"#fff", boxShadow:"0 4px 14px rgba(255,122,0,.3)"}}>S'INSCRIRE</button>
        </div>
      </div>
    </>
  );
}
