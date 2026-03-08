import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import preview from "../../assets/screenshots/dashboard-preview.png";

export default function ProductPreview() {

  const navigate = useNavigate();

  return (

    <div className="grid align-items-center p-6 gradient-orange">

      {/* Image */}

      <div className="col-12 md:col-6">

        <img
          src={preview}
          alt="NYOTA dashboard"
          style={{
            width: "100%",
            borderRadius: "12px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.1)"
          }}
        />

      </div>

      {/* Texte */}

      <div className="col-12 md:col-6">

        <h2 style={{ fontSize: "2.5rem", color: "#1e293b" }}>
          Une plateforme conçue pour révéler votre potentiel
        </h2>

        <p style={{ fontSize: "1.2rem", color: "#64748b" }}>

          NYOTA combine intelligence psychométrique et analyse
          des compétences pour vous guider vers les opportunités
          professionnelles qui vous correspondent vraiment.

        </p>

        <ul style={{ marginTop: "20px", lineHeight: "2" }}>

          <li>✔ Dashboard intelligent</li>
          <li>✔ Test psychométrique avancé</li>
          <li>✔ Analyse des compétences</li>
          <li>✔ Recommandations personnalisées</li>

        </ul>

        <Button
          label="Créer mon compte"
          className="mt-4"
          onClick={() => navigate("/register")}
        />

      </div>

    </div>

  );

}