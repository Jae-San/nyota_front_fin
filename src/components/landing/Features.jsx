import { Card } from "primereact/card";

const CSS = `
  .ny-feat { width: 100%; padding: clamp(40px, 7vw, 80px) clamp(16px, 5vw, 48px); }

  .ny-feat-head { text-align: center; margin-bottom: clamp(28px, 5vw, 48px); }
  .ny-feat-head h2 { font-size: clamp(1.6rem, 4vw, 2.5rem); color: #1e293b; margin: 0 0 8px; }
  .ny-feat-head p  { font-size: clamp(0.95rem, 1.8vw, 1.2rem); color: #64748b; margin: 0; }

  .ny-feat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(12px, 2.5vw, 24px);
    max-width: 1200px; margin: 0 auto;
  }
  @media (max-width: 900px) { .ny-feat-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .ny-feat-grid { grid-template-columns: 1fr; } }

  .ny-feat .p-card { height: 100%; transition: box-shadow 0.3s; }
  .ny-feat .p-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; }
  .ny-feat .p-card .p-card-body { padding: clamp(16px, 3vw, 24px) !important; }
  .ny-feat .p-card .p-card-content { padding: 0 !important; }
  .ny-feat .p-card h3 { font-size: clamp(1rem, 2vw, 1.2rem); }
  .ny-feat .p-card p  { font-size: clamp(0.85rem, 1.4vw, 1rem); }
  .ny-feat .pi { font-size: clamp(2rem, 4vw, 3rem) !important; }
`;

const features = [
  {
    icon: "pi pi-chart-bar",
    color: "#f97316",
    title: "Test de personnalité",
    description: "Découvrez vos forces, votre personnalité et votre style de travail grâce à un test scientifique.",
  },
  {
    icon: "pi pi-user",
    color: "#2563eb",
    title: "Profil intelligent",
    description: "Votre profil évolue automatiquement en fonction de vos compétences et de vos aspirations.",
  },
  {
    icon: "pi pi-chart-line",
    color: "#f97316",
    title: "Insights de carrière",
    description: "Recevez des recommandations personnalisées pour améliorer votre trajectoire professionnelle.",
  },
];

export default function Features() {
  return (
    <>
      <style>{CSS}</style>
      <div className="ny-feat gradient-blue">
        <div className="ny-feat-head">
          <h2>Les fonctionnalités de NYOTA</h2>
          <p>Une plateforme intelligente pour révéler votre potentiel</p>
        </div>
        <div className="ny-feat-grid">
          {features.map((f, i) => (
            <Card key={i} className="text-center shadow-2">
              <i className={f.icon} style={{ fontSize:"3rem", color: f.color }} />
              <h3 className="mt-4 text-900 font-bold">{f.title}</h3>
              <p className="text-600 line-height-3">{f.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
