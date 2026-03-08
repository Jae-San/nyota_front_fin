import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { register, updateExperience, updateEducation, updatePreferences } from "../../api/candidateApi";

/* ─── CSS ─────────────────────────────────────────────────────────────────── */
const CSS = `
  .rg { width:100%; max-width:780px; margin:0 auto; padding:0 16px 80px; }

  /* Steps labels cachés sur mobile */
  @media (max-width:640px) {
    .rg .p-steps .p-steps-title { display:none !important; }
    .rg .p-steps ul { justify-content:center !important; }
    .rg .p-steps .p-steps-item { flex:0 0 auto !important; min-width:0 !important; }
  }

  /* Card */
  .rg .p-card .p-card-body  { padding:clamp(20px,5vw,40px) !important; }
  .rg .p-card .p-card-content { padding:0 !important; }

  /* Inputs plus grands */
  .rg .p-inputtext,
  .rg .p-password input,
  .rg .p-dropdown,
  .rg .p-multiselect,
  .rg .p-inputnumber-input {
    height:54px !important;
    font-size:15px !important;
    width:100% !important;
    box-sizing:border-box !important;
  }
  .rg .p-password  { width:100% !important; display:block !important; }
  .rg .p-inputnumber { width:100% !important; display:block !important; }
  .rg .p-multiselect { height:auto !important; min-height:54px !important; }
  .rg .p-multiselect .p-multiselect-label { padding:14px !important; font-size:15px !important; }
  .rg .p-dropdown .p-dropdown-label { line-height:54px !important; padding:0 14px !important; font-size:15px !important; }

  /* Champ */
  .rg-field { display:flex; flex-direction:column; gap:6px; margin-bottom:20px; }
  .rg-label { font-size:13px; font-weight:600; color:#374151; }
  .rg-label .req { color:#ef4444; margin-left:2px; }

  /* 2 colonnes → 1 mobile */
  .rg-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  @media (max-width:540px) { .rg-row { grid-template-columns:1fr; gap:0; } }

  /* Devise */
  .rg-money { display:flex; gap:10px; }
  .rg-money .p-dropdown { width:145px !important; flex-shrink:0; }
  .rg-money .p-inputnumber { flex:1; }
  @media (max-width:440px) { .rg-money { flex-direction:column; } .rg-money .p-dropdown { width:100% !important; } }

  /* SelectButton */
  .rg .p-selectbutton { display:flex !important; flex-wrap:wrap !important; gap:8px !important; }
  .rg .p-selectbutton .p-button { flex:1 1 auto !important; min-width:70px !important; height:44px !important; font-size:14px !important; justify-content:center !important; }

  /* Navigation */
  .rg-nav { display:flex; justify-content:space-between; align-items:center; margin-top:28px; padding-top:20px; border-top:1px solid #e5e7eb; gap:12px; }
  @media (max-width:400px) { .rg-nav { flex-direction:column-reverse; } .rg-nav .p-button { width:100% !important; justify-content:center; } }

  /* Upload */
  .rg-upload { border:2px dashed #d1d5db; border-radius:12px; padding:20px; background:#f9fafb; margin-bottom:16px; transition:border-color .2s; }
  .rg-upload:hover { border-color:#6366f1; }
  .rg .p-fileupload { border:none !important; background:transparent !important; }
  .rg .p-fileupload-buttonbar { background:transparent !important; border:none !important; padding:0 !important; }
  .rg .p-fileupload-content { border:none !important; background:transparent !important; padding:8px 0 0 !important; }

  /* Recap */
  .rg-recap { background:#f9fafb; border-radius:12px; padding:20px; margin-top:8px; }
  .rg-recap-row { display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #e5e7eb; font-size:14px; gap:12px; }
  .rg-recap-row:last-child { border-bottom:none; }
  .rg-recap-key { color:#6b7280; flex-shrink:0; }
  .rg-recap-val { font-weight:600; color:#111827; text-align:right; }
`;

/* ─── Sous-composants définis HORS du parent pour éviter le re-mount ──────── */
const RgField = ({ label, required, children }) => (
  <div className="rg-field">
    <label className="rg-label">{label}{required && <span className="req"> *</span>}</label>
    {children}
  </div>
);

const RgPills = ({ opts, value, onChange }) => (
  <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
    {opts.map(o => (
      <button key={o} type="button"
        style={{
          height:"42px", padding:"0 18px", borderRadius:"21px",
          border:`1.5px solid ${value === o ? "#FF7A00" : "#e5e7eb"}`,
          background: value === o ? "#FF7A00" : "#f9fafb",
          color: value === o ? "#fff" : "#374151",
          fontSize:"14px", fontWeight: value === o ? "600" : "400",
          cursor:"pointer", transition:"all .2s",
        }}
        onClick={() => onChange(o)}>{o}
      </button>
    ))}
  </div>
);

/* ─── Options (définis hors composant pour stabilité) ─────────────────────── */
const LANGUAGE_OPTS = [
  { name:"Français", code:"Français" }, { name:"Anglais", code:"Anglais" },
  { name:"Portugais", code:"Portugais" }, { name:"Arabe", code:"Arabe" },
  { name:"Espagnol", code:"Espagnol" }, { name:"Fon", code:"Fon" },
  { name:"Ewé", code:"Ewe" }, { name:"Yoruba", code:"Yoruba" },
  { name:"Swahili", code:"Swahili" }, { name:"Wolof", code:"Wolof" },
  { name:"Haoussa", code:"Haoussa" }, { name:"Bambara", code:"Bambara" },
  { name:"Lingala", code:"Lingala" }, { name:"Kinyarwanda", code:"Kinyarwanda" },
];
const CURRENCY_OPTS = [
  { label:"FCFA", value:"XOF" }, { label:"€ EUR", value:"EUR" },
  { label:"$ USD", value:"USD" }, { label:"₦ NGN", value:"NGN" },
  { label:"GH₵", value:"GHS" }, { label:"KSh", value:"KES" },
  { label:"£ GBP", value:"GBP" }, { label:"CHF", value:"CHF" },
];
const AVAIL_OPTS = [
  { label:"Immédiatement", value:"Immédiatement" },
  { label:"Dans 1 semaine", value:"Dans une semaine" },
  { label:"Dans 2 semaines", value:"Dans deux semaines" },
  { label:"Dans 1 mois", value:"Dans un mois" },
  { label:"Dans 3 mois", value:"Dans 3 mois" },
  { label:"Dans 6 mois", value:"Dans 6 mois" },
  { label:"Dans 1 an", value:"Dans 1 an" },
  { label:"Plus d'un an", value:"Plus d'un an" },
];
const EDUCATION_OPTS = [
  { label:"Bac / Lycée", value:"Bac" },
  { label:"Bac +2 / BTS / DUT", value:"Bac+2" },
  { label:"Licence (Bac +3)", value:"Licence" },
  { label:"Master (Bac +5)", value:"Master" },
  { label:"Doctorat", value:"Doctorat" },
  { label:"Formation professionnelle", value:"Formation pro" },
  { label:"Autodidacte", value:"Autodidacte" },
];
const STEP_ITEMS = [
  { label:"Infos" }, { label:"Expérience" }, { label:"Préférences" },
  { label:"Éducation" }, { label:"Documents" }, { label:"Validation" },
];

/* ─── Composant principal ─────────────────────────────────────────────────── */
export default function Register() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const cvRef = useRef(null);
  const docRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name:"", last_name:"", email:"", password:"", phone_number:"", gender:"",
    has_prior_experience:"", industry:"", years_of_experience:null, specialization:"",
    target_industry:"", target_job_title:"", languages:[],
    expected_salary_min:null, currency:"XOF",
    availability_date:"", work_mode:"", open_to_relocation:null,
    nationality:"", current_country:"",
    education_level:"", institution_name:"",
  });

  const set = (field, value) => setForm(p => ({ ...p, [field]:value }));

  const showError = m => toast.current.show({ severity:"error", summary:"Erreur", detail:m, life:4000 });
  const showOk    = m => toast.current.show({ severity:"success", summary:"✓", detail:m, life:2000 });

  const validateStep = () => {
    if (activeIndex === 0) {
      if (!form.first_name.trim()) { showError("Le prénom est requis."); return false; }
      if (!form.last_name.trim())  { showError("Le nom est requis."); return false; }
      if (!form.email.trim())      { showError("L'email est requis."); return false; }
      if (!form.password || form.password.length < 6) { showError("Mot de passe : 6 caractères minimum."); return false; }
    }
    return true;
  };

  const saveStep = async () => {
    switch (activeIndex) {
      case 0: {
        const data = await register({ first_name:form.first_name, last_name:form.last_name, email:form.email, password:form.password, phone_number:form.phone_number, gender:form.gender });
        if (data?.access_token) localStorage.setItem("token", data.access_token);
        showOk("Compte créé !"); break;
      }
      case 1:
        await updateExperience({ has_prior_experience:form.has_prior_experience==="Oui", industry:form.industry, years_of_experience:parseInt(form.years_of_experience)||0, specialization:form.specialization });
        showOk("Expérience enregistrée !"); break;
      case 2:
        await updatePreferences({ target_industry:form.target_industry, target_job_title:form.target_job_title, languages:Array.isArray(form.languages)?form.languages.join(", "):"", expected_salary_min:form.expected_salary_min, currency:form.currency, availability_date:form.availability_date, work_mode:form.work_mode, open_to_relocation:form.open_to_relocation, nationality:form.nationality, current_country:form.current_country });
        showOk("Préférences enregistrées !"); break;
      case 3:
        await updateEducation({ education_level:form.education_level, institution_name:form.institution_name });
        showOk("Éducation enregistrée !"); break;
      default: break;
    }
  };

  const nextStep = async () => {
    if (!validateStep()) return;
    setLoading(true);
    try { await saveStep(); setActiveIndex(p => Math.min(p+1, 5)); }
    catch (err) { showError(err?.message || "Une erreur est survenue."); }
    finally { setLoading(false); }
  };

  const prevStep = () => setActiveIndex(p => Math.max(p-1, 0));

  const onBeforeSend = e => {
    const token = localStorage.getItem("token");
    if (token) e.xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  };

  const renderStep = () => {
    switch (activeIndex) {
      case 0: return (
        <>
          <p style={{fontSize:"12px", color:"#9ca3af", margin:"-4px 0 16px"}}>* champs obligatoires</p>
          <div className="rg-row">
            <RgField label="Nom" required><InputText value={form.last_name} onChange={e => set("last_name", e.target.value)} placeholder="Dupont" className="w-full" /></RgField>
            <RgField label="Prénom" required><InputText value={form.first_name} onChange={e => set("first_name", e.target.value)} placeholder="Marie" className="w-full" /></RgField>
          </div>
          <RgField label="Adresse email" required>
            <InputText value={form.email} onChange={e => set("email", e.target.value)} placeholder="votre@email.com" className="w-full" />
          </RgField>
          <RgField label="Mot de passe" required>
            <Password value={form.password} onChange={e => set("password", e.target.value)} toggleMask feedback className="w-full" inputClassName="w-full" promptLabel="Créez un mot de passe" weakLabel="Faible" mediumLabel="Moyen" strongLabel="Fort" />
          </RgField>
          <div className="rg-row">
            <RgField label="Téléphone"><InputText value={form.phone_number} onChange={e => set("phone_number", e.target.value)} placeholder="+229 01 00 00 00" className="w-full" /></RgField>
            <RgField label="Genre"><RgPills opts={["Homme","Femme","Autre"]} value={form.gender} onChange={v => set("gender", v)} /></RgField>
          </div>
        </>
      );

      case 1: return (
        <>
          <RgField label="Expérience professionnelle ?"><RgPills opts={["Oui","Non"]} value={form.has_prior_experience} onChange={v => set("has_prior_experience", v)} /></RgField>
          <RgField label="Dans quelle industrie ?"><InputText value={form.industry} onChange={e => set("industry", e.target.value)} placeholder="Ex : Finance, Tech, Santé..." className="w-full" /></RgField>
          <RgField label="Années d'expérience"><InputNumber value={form.years_of_experience} onValueChange={e => set("years_of_experience", e.value)} min={0} max={50} showButtons /></RgField>
          <RgField label="Domaine de spécialisation"><InputText value={form.specialization} onChange={e => set("specialization", e.target.value)} placeholder="Ex : Marketing Digital, Data Science..." className="w-full" /></RgField>
        </>
      );

      case 2: return (
        <>
          <div className="rg-row">
            <RgField label="Industrie souhaitée"><InputText value={form.target_industry} onChange={e => set("target_industry", e.target.value)} placeholder="Ex : Informatique..." className="w-full" /></RgField>
            <RgField label="Poste recherché"><InputText value={form.target_job_title} onChange={e => set("target_job_title", e.target.value)} placeholder="Ex : Dev Fullstack" className="w-full" /></RgField>
          </div>
          <RgField label="Langues parlées">
            <MultiSelect value={form.languages} options={LANGUAGE_OPTS} onChange={e => set("languages", e.value)} optionLabel="name" optionValue="code" display="chip" placeholder="Choisir vos langues" filter className="w-full" />
          </RgField>
          <RgField label="Salaire minimum souhaité">
            <div className="rg-money">
              <Dropdown value={form.currency} options={CURRENCY_OPTS} onChange={e => set("currency", e.value)} filter />
              <InputNumber value={form.expected_salary_min} onValueChange={e => set("expected_salary_min", e.value)} placeholder="Montant" mode="decimal" />
            </div>
          </RgField>
          <div className="rg-row">
            <RgField label="Disponibilité"><Dropdown value={form.availability_date} options={AVAIL_OPTS} onChange={e => set("availability_date", e.value)} placeholder="Quand ?" className="w-full" /></RgField>
            <RgField label="Mode de travail"><RgPills opts={["Remote","Hybrid","On-site"]} value={form.work_mode} onChange={v => set("work_mode", v)} /></RgField>
          </div>
          <div className="rg-row">
            <RgField label="Nationalité"><InputText value={form.nationality} onChange={e => set("nationality", e.target.value)} placeholder="Ex : Béninois(e)" className="w-full" /></RgField>
            <RgField label="Pays actuel"><InputText value={form.current_country} onChange={e => set("current_country", e.target.value)} placeholder="Ex : Bénin" className="w-full" /></RgField>
          </div>
          <RgField label="Prêt(e) pour une relocalisation ?">
            <RgPills opts={["Oui","Non"]} value={form.open_to_relocation===true?"Oui":form.open_to_relocation===false?"Non":""} onChange={v => set("open_to_relocation", v==="Oui")} />
          </RgField>
        </>
      );

      case 3: return (
        <>
          <RgField label="Niveau d'études"><Dropdown value={form.education_level} options={EDUCATION_OPTS} onChange={e => set("education_level", e.value)} placeholder="Sélectionner votre niveau" className="w-full" /></RgField>
          <RgField label="Établissement"><InputText value={form.institution_name} onChange={e => set("institution_name", e.target.value)} placeholder="Nom de votre université ou école" className="w-full" /></RgField>
        </>
      );

      case 4: return (
        <>
          <div className="rg-upload">
            <p className="font-semibold text-sm text-600 mb-3"><i className="pi pi-file-pdf mr-2 text-red-500" />CV (PDF — max 2 Mo)</p>
            <FileUpload ref={cvRef} mode="advanced" name="cv" url="http://localhost:5000/candidates/documents/upload-cv" accept=".pdf" maxFileSize={2000000} onBeforeSend={onBeforeSend} auto chooseLabel="Choisir mon CV" onUpload={() => showOk("CV uploadé !")} onError={() => showError("Erreur upload CV.")} />
          </div>
          <div className="rg-upload">
            <p className="font-semibold text-sm text-600 mb-3"><i className="pi pi-paperclip mr-2 text-blue-500" />Document supplémentaire (optionnel)</p>
            <FileUpload ref={docRef} mode="advanced" name="document" url="http://localhost:5000/candidates/documents/upload-document" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" maxFileSize={5000000} onBeforeSend={onBeforeSend} auto chooseLabel="Ajouter un document" onUpload={() => showOk("Document uploadé !")} onError={() => showError("Erreur upload.")} />
            <p className="text-xs text-400 mt-2">Lettre de motivation, portfolio, diplôme — max 5 Mo</p>
          </div>
        </>
      );

      case 5: return (
        <div className="text-center">
          <i className="pi pi-check-circle text-green-500 mb-4" style={{fontSize:"4.5rem"}} />
          <h3 className="text-2xl font-bold text-900 mt-0 mb-2">Tout est prêt !</h3>
          <p className="text-600 mb-5">Votre profil a été enregistré étape par étape.</p>
          <div className="rg-recap text-left">
            <p className="font-bold text-900 mb-3"><i className="pi pi-user mr-2 text-primary" />Récapitulatif</p>
            {[["Nom complet",`${form.first_name} ${form.last_name}`],["Email",form.email],["Poste recherché",form.target_job_title||"—"],["Industrie visée",form.target_industry||"—"],["Disponibilité",form.availability_date||"—"],["Nationalité",form.nationality||"—"],["Pays actuel",form.current_country||"—"],["Mode de travail",form.work_mode||"—"]].map(([k,v]) => (
              <div className="rg-recap-row" key={k}><span className="rg-recap-key">{k}</span><span className="rg-recap-val">{v}</span></div>
            ))}
          </div>
        </div>
      );
      default: return null;
    }
  };

  const pct = ((activeIndex+1)/STEP_ITEMS.length)*100;

  return (
    <section style={{ width:"100%", maxWidth:"2000px", margin:"0 auto", paddingTop:"clamp(20px,5vw,60px)", display:"flex", flexDirection:"column", alignItems:"center", background:"linear-gradient(180deg,#fff 0%,#f9fafb 100%)", minHeight:"100vh" }}>
      <style>{CSS}</style>
      <Toast ref={toast} />

      <div className="rg">
        {/* Progression */}
        <div className="mb-5">
          <div className="flex justify-content-between align-items-center mb-2">
            <span className="text-sm font-semibold text-600">Étape {activeIndex+1} sur {STEP_ITEMS.length}</span>
            <span className="text-sm font-bold text-primary">{Math.round(pct)}%</span>
          </div>
          <div style={{height:"8px", background:"#e5e7eb", borderRadius:"4px", overflow:"hidden"}}>
            <div style={{height:"100%", width:`${pct}%`, background:"#FF7A00", borderRadius:"4px", transition:"width .4s ease"}} />
          </div>
        </div>

        {/* Stepper custom */}
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"32px", overflowX:"auto", gap:"0", padding:"4px 0"}}>
          {STEP_ITEMS.map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{flex:"1", height:"2px", background: i<=activeIndex?"#FF7A00":"#e5e7eb", minWidth:"16px", maxWidth:"40px", transition:"background .3s"}} />}
              <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", flexShrink:0}}>
                <div style={{width:"36px", height:"36px", borderRadius:"50%", border:`2px solid ${i===activeIndex?"#FF7A00":i<activeIndex?"#FF7A00":"#e5e7eb"}`, background: i<=activeIndex?"#FF7A00":"#fff", color: i<=activeIndex?"#fff":"#9ca3af", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"700", fontSize:"14px", transition:"all .3s"}}>
                  {i < activeIndex ? "✓" : i+1}
                </div>
                <span style={{fontSize:"11px", color: i===activeIndex?"#111827":i<activeIndex?"#FF7A00":"#9ca3af", fontWeight: i===activeIndex?"600":"400", whiteSpace:"nowrap"}}>
                  {s.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Carte formulaire */}
        <div style={{background:"#fff", borderRadius:"20px", boxShadow:"0 4px 24px rgba(0,0,0,0.08)", padding:"clamp(20px,5vw,40px)"}}>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-900 m-0">
              {["Informations personnelles","Expérience professionnelle","Préférences professionnelles","Éducation","Documents","Validation"][activeIndex]}
            </h2>
            <p className="text-sm text-500 mt-1 mb-0">
              {["Renseignez vos informations de base","Parlez-nous de votre parcours","Définissez vos objectifs et conditions","Votre formation académique","Ajoutez vos fichiers importants","Votre profil est complet !"][activeIndex]}
            </p>
          </div>
          <div style={{height:"1px", background:"#f3f4f6", marginBottom:"24px"}} />

          <form onSubmit={e => e.preventDefault()}>
            {renderStep()}

            <div className="rg-nav">
              <button type="button" onClick={prevStep} disabled={activeIndex===0||loading}
                style={{background:"none", border:"none", color: activeIndex===0?"#d1d5db":"#6b7280", fontSize:"14px", fontWeight:"500", cursor: activeIndex===0?"not-allowed":"pointer", display:"flex", alignItems:"center", gap:"6px", padding:"10px 0"}}>
                ← Précédent
              </button>
              {activeIndex < 5 ? (
                <button type="button" onClick={nextStep} disabled={loading}
                  style={{height:"50px", padding:"0 36px", background:"#FF7A00", border:"none", borderRadius:"25px", color:"#fff", fontSize:"15px", fontWeight:"700", cursor: loading?"not-allowed":"pointer", display:"flex", alignItems:"center", gap:"8px", opacity: loading?0.6:1, boxShadow:"0 6px 20px rgba(255,122,0,.3)"}}>
                  {loading ? <><i className="pi pi-spin pi-spinner" /> Enregistrement…</> : <>Étape suivante →</>}
                </button>
              ) : (
                <button type="button" onClick={() => navigate("/login")}
                  style={{height:"50px", padding:"0 36px", background:"#22c55e", border:"none", borderRadius:"25px", color:"#fff", fontSize:"15px", fontWeight:"700", cursor:"pointer", display:"flex", alignItems:"center", gap:"8px", boxShadow:"0 6px 20px rgba(34,197,94,.3)"}}>
                  Accéder à mon espace →
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="text-center mt-5">
          <span className="text-600">Vous avez déjà un compte ? </span>
          <button onClick={() => navigate("/login")} style={{background:"none", border:"none", color:"#FF7A00", fontWeight:"600", fontSize:"14px", cursor:"pointer", textDecoration:"underline"}}>
            Connectez-vous ici
          </button>
        </div>
      </div>
    </section>
  );
}
