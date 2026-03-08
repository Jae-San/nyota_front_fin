import React from "react";

const CSS = `
  .dh-wrap {
    background:linear-gradient(135deg, #1D67F1 0%, #7C3AED 100%);
    border-radius:16px;
    padding:clamp(16px,3vw,28px) clamp(16px,3vw,32px);
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:16px;
    flex-wrap:wrap;
    color:#fff;
  }

  .dh-left h2 {
    font-size:clamp(1.1rem,3vw,1.6rem);
    font-weight:800; margin:0 0 4px; color:#fff;
  }
  .dh-left p { font-size:clamp(12px,1.5vw,14px); margin:0; opacity:0.85; color:#fff; }

  .dh-right { display:flex; align-items:center; gap:12px; flex-shrink:0; }

  .dh-user { text-align:right; }
  .dh-user-name { font-weight:700; font-size:14px; color:#fff; }
  .dh-user-role { font-size:12px; opacity:0.75; color:#fff; }

  .dh-avatar {
    width:42px; height:42px; border-radius:50%;
    background:rgba(255,255,255,0.2);
    display:flex; align-items:center; justify-content:center;
    font-weight:700; font-size:16px; color:#fff;
    border:2px solid rgba(255,255,255,0.4);
    flex-shrink:0;
  }

  .dh-logout {
    display:flex; align-items:center; gap:6px;
    background:rgba(255,255,255,0.15);
    border:1.5px solid rgba(255,255,255,0.35);
    color:#fff; border-radius:20px;
    padding:8px 16px; font-size:13px; font-weight:600;
    cursor:pointer; transition:all .2s;
    backdrop-filter:blur(4px);
  }
  .dh-logout:hover { background:rgba(255,255,255,0.25); transform:translateY(-1px); }

  @media (max-width:480px) {
    .dh-user { display:none; }
    .dh-logout span { display:none; }
    .dh-logout { padding:8px 12px; }
  }
`;

export default function DashboardHeader({ firstName, lastName, onLogout }) {
  const initials = `${(firstName||"")[0]||""}${(lastName||"")[0]||""}`.toUpperCase() || "U";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Utilisateur";

  return (
    <>
      <style>{CSS}</style>
      <div className="dh-wrap">
        <div className="dh-left">
          <h2>Tableau de bord</h2>
          <p>Bienvenue {firstName} dans votre espace NYOTA</p>
        </div>
        <div className="dh-right">
          <div className="dh-user">
            <div className="dh-user-name">{fullName}</div>
            <div className="dh-user-role">Candidat</div>
          </div>
          <div className="dh-avatar">{initials}</div>
          <button className="dh-logout" onClick={onLogout}>
            <i className="pi pi-sign-out" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </>
  );
}
