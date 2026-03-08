import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

const CSS = `
  .fp-wrap { width:100%; max-width:480px; margin:0 auto; }
  .fp-wrap .p-inputtext { height:54px !important; font-size:15px !important; width:100% !important; border-radius:10px !important; }
  .fp-card { background:#fff; border-radius:24px; box-shadow:0 8px 40px rgba(0,0,0,.10); padding:clamp(28px,6vw,48px); }
  .fp-field { display:flex; flex-direction:column; gap:7px; margin-bottom:20px; }
  .fp-label { font-size:13px; font-weight:600; color:#374151; }
  .fp-btn { width:100%; height:54px; background:#FF7A00; border:none; border-radius:27px; color:#fff; font-size:15px; font-weight:700; cursor:pointer; margin-top:8px; box-shadow:0 6px 20px rgba(255,122,0,.3); transition:all .25s; display:flex; align-items:center; justify-content:center; gap:10px; }
  .fp-btn:hover:not(:disabled) { background:#e06900; transform:translateY(-2px); }
  .fp-btn:disabled { opacity:.55; cursor:not-allowed; transform:none; }
  @media (max-width:440px) { .fp-card { padding:24px 18px; } }
`;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const showError = m => toast.current.show({ severity:"error", summary:"Erreur", detail:m, life:4000 });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email.trim()) { showError("L'email est requis."); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/forgot-password", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) { setSent(true); }
      else showError(data.message || "Une erreur est survenue.");
    } catch { showError("Connexion au serveur impossible."); }
    finally { setLoading(false); }
  };

  return (
    <div className="fp-wrap">
      <style>{CSS}</style>
      <Toast ref={toast} />

      <div className="fp-card">
        {!sent ? (
          <>
            <div style={{textAlign:"center", marginBottom:"28px"}}>
              <div style={{width:"56px", height:"56px", background:"#fff7ed", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px"}}>
                <i className="pi pi-lock" style={{fontSize:"24px", color:"#FF7A00"}} />
              </div>
              <h2 style={{fontSize:"clamp(20px,4vw,28px)", fontWeight:"800", color:"#111827", margin:"0 0 6px"}}>Mot de passe oublié ?</h2>
              <p style={{fontSize:"14px", color:"#6b7280", margin:0, lineHeight:"1.6"}}>
                Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="fp-field">
                <label className="fp-label">Adresse email</label>
                <InputText type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full" required />
              </div>
              <button type="submit" className="fp-btn" disabled={loading}>
                {loading ? <><i className="pi pi-spin pi-spinner" /> Envoi en cours…</> : <><i className="pi pi-send" /> Envoyer le lien</>}
              </button>
            </form>
          </>
        ) : (
          <div style={{textAlign:"center", padding:"12px 0"}}>
            <div style={{width:"64px", height:"64px", background:"linear-gradient(135deg,#22c55e,#16a34a)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", boxShadow:"0 8px 24px rgba(34,197,94,.3)"}}>
              <i className="pi pi-check" style={{fontSize:"28px", color:"#fff"}} />
            </div>
            <h3 style={{fontSize:"22px", fontWeight:"800", color:"#111827", margin:"0 0 8px"}}>Email envoyé !</h3>
            <p style={{fontSize:"14px", color:"#6b7280", lineHeight:"1.6", marginBottom:"24px"}}>
              Vérifiez votre boîte mail. Le lien est valable 30 minutes.
            </p>
            <p style={{fontSize:"13px", color:"#9ca3af"}}>
              Vous n'avez pas reçu l'email ?{" "}
              <button onClick={() => setSent(false)} style={{background:"none", border:"none", color:"#FF7A00", fontWeight:"600", cursor:"pointer", textDecoration:"underline"}}>
                Réessayer
              </button>
            </p>
          </div>
        )}

        <div style={{marginTop:"24px", paddingTop:"20px", borderTop:"1px solid #f3f4f6", textAlign:"center"}}>
          <button onClick={() => navigate("/login")} style={{background:"none", border:"none", color:"#FF7A00", fontSize:"14px", fontWeight:"600", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:"6px"}}>
            ← Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  );
}
