import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api/candidateApi";
import { ProgressSpinner } from "primereact/progressspinner";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import ProfileCompletion from "../components/dashboard/ProfileCompletion";
import ProfileCard from "../components/dashboard/ProfileCard";
import EducationCard from "../components/dashboard/EducationCard";
import ExperienceCard from "../components/dashboard/ExperienceCard";
import PreferencesCard from "../components/dashboard/PreferencesCard";
import CVCard from "../components/dashboard/CVCard";
import { PersonalityTestCard } from "../components/dashboard/PersonalityTestCard";

const CSS = `
  /* ── Décale le contenu sous la navbar fixe (hauteur estimée 80px) ── */
  .ny-dash {
    min-height:100vh;
    background:#f8f9fa;
    padding:80px clamp(10px,2vw,24px) clamp(20px,3vw,40px);
  }

  /* ── Grille ── */
  .ny-dash-grid {
    display:grid;
    grid-template-columns:1fr 1fr 300px;
    grid-template-areas:
      "completion completion completion"
      "profile    profile    sidebar"
      "edu        exp        sidebar"
      "pref       pref       cv";
    gap:clamp(12px,1.8vw,20px);
    max-width:1600px;
    margin:0 auto;
    align-items:start;
  }
  @media (max-width:1200px) {
    .ny-dash-grid {
      grid-template-columns:1fr 1fr;
      grid-template-areas:
        "completion completion"
        "profile    profile"
        "sidebar    cv"
        "edu        exp"
        "pref       pref";
    }
  }
  @media (max-width:768px) {
    .ny-dash-grid {
      grid-template-columns:1fr;
      grid-template-areas:
        "completion"
        "profile"
        "sidebar"
        "cv"
        "edu"
        "exp"
        "pref";
    }
    .ny-dash { padding:80px 10px 30px; }
  }

  .ny-dash-completion { grid-area:completion; }
  .ny-dash-profile    { grid-area:profile; }
  .ny-dash-sidebar    { grid-area:sidebar; }
  .ny-dash-edu        { grid-area:edu; }
  .ny-dash-exp        { grid-area:exp; }
  .ny-dash-pref       { grid-area:pref; }
  .ny-dash-cv         { grid-area:cv; }

  /* ── Cards ── */
  .ny-dash .p-card {
    border-radius:16px !important;
    box-shadow:0 1px 12px rgba(0,0,0,.07) !important;
    height:100%;
  }
  .ny-dash .p-card .p-card-body  { padding:clamp(16px,2.5vw,24px) !important; }
  .ny-dash .p-card .p-card-content { padding:0 !important; }

  /* ── Inputs agrandis comme Register ── */
  .ny-dash .p-inputtext,
  .ny-dash .p-password input,
  .ny-dash .p-dropdown,
  .ny-dash .p-multiselect,
  .ny-dash .p-inputnumber-input {
    height:48px !important;
    font-size:14px !important;
    width:100% !important;
  }
  .ny-dash .p-password  { width:100% !important; }
  .ny-dash .p-inputnumber { width:100% !important; }
  .ny-dash .p-multiselect { height:auto !important; min-height:48px !important; }
  .ny-dash .p-dropdown .p-dropdown-label { line-height:48px !important; padding:0 12px !important; }
`;

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadProfile(); }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { navigate("/login"); return; }
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      console.error("Erreur profil:", err);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  /* Déconnexion */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="ny-dash">

        {/* Header avec déconnexion */}
        <div style={{maxWidth:"1600px", margin:"0 auto clamp(12px,2vw,20px)"}}>
          <DashboardHeader
            firstName={profile?.first_name}
            lastName={profile?.last_name}
            onLogout={handleLogout}
          />
        </div>

        {/* Grille principale */}
        <div className="ny-dash-grid">
          <div className="ny-dash-completion"><ProfileCompletion data={profile} /></div>
          <div className="ny-dash-profile"><ProfileCard initialData={profile} onUpdate={loadProfile} /></div>
          <div className="ny-dash-sidebar"><PersonalityTestCard onStart={() => navigate("/test")} /></div>
          <div className="ny-dash-edu"><EducationCard initialData={profile?.education} onUpdate={loadProfile} /></div>
          <div className="ny-dash-exp"><ExperienceCard initialData={profile?.experience} onUpdate={loadProfile} /></div>
          <div className="ny-dash-pref"><PreferencesCard initialData={profile?.preferences} onUpdate={loadProfile} /></div>
          <div className="ny-dash-cv"><CVCard onUpdate={loadProfile} /></div>
        </div>

      </div>
    </>
  );
}
