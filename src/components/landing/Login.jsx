import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

const CSS = `
  .lg-wrap { width:100%; max-width:480px; margin:0 auto; }

  .lg-wrap .p-inputtext,
  .lg-wrap .p-password input {
    height:54px !important;
    font-size:15px !important;
    width:100% !important;
    border-radius:10px !important;
  }
  .lg-wrap .p-password { width:100% !important; display:block !important; }

  .lg-card {
    background:#fff;
    border-radius:24px;
    box-shadow:0 8px 40px rgba(0,0,0,0.10);
    padding:clamp(28px,6vw,48px);
  }

  .lg-field { display:flex; flex-direction:column; gap:7px; margin-bottom:20px; }
  .lg-label { font-size:13px; font-weight:600; color:#374151; }

  .lg-btn {
    width:100%; height:54px;
    background:#FF7A00; border:none; border-radius:27px;
    color:#fff; font-size:15px; font-weight:700;
    cursor:pointer; margin-top:8px;
    box-shadow:0 6px 20px rgba(255,122,0,.3);
    transition:all .25s; display:flex; align-items:center; justify-content:center; gap:10px;
  }
  .lg-btn:hover:not(:disabled) { background:#e06900; transform:translateY(-2px); box-shadow:0 10px 28px rgba(255,122,0,.35); }
  .lg-btn:disabled { opacity:.55; cursor:not-allowed; transform:none; }

  .lg-divider { display:flex; align-items:center; gap:12px; margin:20px 0; }
  .lg-divider::before, .lg-divider::after { content:""; flex:1; height:1px; background:#e5e7eb; }
  .lg-divider span { font-size:13px; color:#9ca3af; }

  @media (max-width:440px) { .lg-card { padding:24px 18px; } }
`;

export default function Login() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showError = m => toast.current.show({ severity:"error", summary:"Erreur", detail:m, life:4000 });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email.trim()) { showError("L'email est requis."); return; }
    if (!password)     { showError("Le mot de passe est requis."); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) { localStorage.setItem("token", data.access_token); navigate("/dashboard"); }
      else showError(data.message || "Email ou mot de passe incorrect");
    } catch { showError("Connexion au serveur impossible"); }
    finally { setLoading(false); }
  };

  return (
    <div className="lg-wrap">
      <style>{CSS}</style>
      <Toast ref={toast} />

      <div className="lg-card">
        <div style={{textAlign:"center", marginBottom:"28px"}}>
          <h2 style={{fontSize:"clamp(22px,5vw,30px)", fontWeight:"800", color:"#111827", margin:"0 0 6px"}}>Bon retour !</h2>
          <p style={{fontSize:"15px", color:"#6b7280", margin:0}}>Accédez à votre espace NYOTA</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="lg-field">
            <label className="lg-label">Adresse email</label>
            <InputText type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full" required />
          </div>

          <div className="lg-field">
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <label className="lg-label">Mot de passe</label>
              <button type="button" onClick={() => navigate("/forgot-password")}
                style={{background:"none", border:"none", color:"#FF7A00", fontSize:"13px", fontWeight:"600", cursor:"pointer"}}>
                Oublié ?
              </button>
            </div>
            <Password value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" feedback={false} toggleMask className="w-full" inputClassName="w-full" />
          </div>

          <button type="submit" className="lg-btn" disabled={loading}>
            {loading ? <><i className="pi pi-spin pi-spinner" /> Connexion…</> : <><i className="pi pi-sign-in" /> Se connecter</>}
          </button>
        </form>

        <div className="lg-divider"><span>ou</span></div>

        <p style={{textAlign:"center", fontSize:"14px", color:"#374151", margin:0}}>
          Pas encore de compte ?{" "}
          <button onClick={() => navigate("/register")} style={{background:"none", border:"none", color:"#FF7A00", fontWeight:"700", fontSize:"14px", cursor:"pointer", textDecoration:"underline"}}>
            Créez-en un
          </button>
        </p>
      </div>
    </div>
  );
}
