import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const CSS = `
  .ny-hiw { width: 100%; padding: clamp(40px, 7vw, 80px) clamp(16px, 5vw, 48px); }

  .ny-hiw-head { text-align: center; margin-bottom: clamp(28px, 5vw, 48px); }
  .ny-hiw-head h2 { font-size: clamp(1.6rem, 4vw, 2.5rem); color: #1e293b; margin: 0 0 8px; }
  .ny-hiw-head p  { font-size: clamp(0.95rem, 1.8vw, 1.2rem); color: #64748b; margin: 0; }

  .ny-hiw-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(12px, 2.5vw, 24px);
    max-width: 1200px; margin: 0 auto;
  }
  @media (max-width: 900px) { .ny-hiw-grid { grid-template-columns: 1fr; max-width: 520px; } }

  /* Cards internes */
  .ny-hiw .p-card { height: 100%; }
  .ny-hiw .p-card .p-card-body { padding: clamp(16px, 3vw, 24px) !important; }
  .ny-hiw .p-card .p-card-content { padding: 0 !important; }
  .ny-hiw .p-card h3 { font-size: clamp(1rem, 2vw, 1.25rem); }
  .ny-hiw .p-card p  { font-size: clamp(0.85rem, 1.4vw, 1rem); }
  .ny-hiw .pi { font-size: clamp(2rem, 4vw, 3rem) !important; }
`;

export default function HowItWorks() {
  const navigate = useNavigate();
  return (
    <>
      <style>{CSS}</style>
      <div className="ny-hiw gradient-orange">
        <div className="ny-hiw-head">
          <h2>Comment fonctionne NYOTA</h2>
          <p>Trouvez votre carrière idéale en 3 étapes simples</p>
        </div>
        <div className="ny-hiw-grid">
          <div>
            <Card className="text-center">
              <i className="pi pi-user-plus" style={{ fontSize:"3rem", color:"#2563eb" }} />
              <h3 className="mt-3">Créez votre compte</h3>
              <p>Inscrivez-vous gratuitement et créez votre profil professionnel.</p>
              <Button label="Créer un compte" className="mt-3" onClick={() => navigate("/register")} />
            </Card>
          </div>
          <div>
            <Card className="text-center">
              <i className="pi pi-chart-bar" style={{ fontSize:"3rem", color:"#f97316" }} />
              <h3 className="mt-3">Passez le test</h3>
              <p>Répondez au test de personnalité pour révéler votre personnalité professionnelle.</p>
              <Button label="Découvrir le test" className="mt-3" onClick={() => navigate("/login")} />
            </Card>
          </div>
          <div>
            <Card className="text-center">
              <i className="pi pi-briefcase" style={{ fontSize:"3rem", color:"#2563eb" }} />
              <h3 className="mt-3">Recevez des opportunités</h3>
              <p>Découvrez les opportunités professionnelles adaptées à votre profil.</p>
              <Button label="Voir les opportunités" className="mt-3" onClick={() => navigate("/dashboard")} />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
