import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { FileUpload } from "primereact/fileupload";
import { getCV } from "../../api/candidateApi";

export default function CVCard({ onUpdate }) {
  const [cv, setCV] = useState(null);

  const loadCV = async () => {
    try {
      const data = await getCV();
      setCV(data);
    } catch (error) {
      console.error("Erreur chargement CV", error);
    }
  };

  useEffect(() => {
    loadCV();
  }, []);

  // --- LA FONCTION MANQUANTE POUR LE TOKEN ---
  const onBeforeSend = (event) => {
    const token = localStorage.getItem("token");
    if (token) {
      event.xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }
  };

  return (
    <Card 
      title={<span><i className="pi pi-file-pdf mr-2 text-primary"></i>Mon CV</span>}
      className="shadow-1 border-round-xl"
    >
      {cv ? (
        <div className="mb-4 p-3 surface-50 border-round flex align-items-center justify-content-between">
          <div>
            <span className="block font-semibold text-900">CV actuel</span>
            <small className="text-600">{cv.file_name}</small>
          </div>
          <i className="pi pi-check-circle text-success text-xl"></i>
        </div>
      ) : (
        <p className="text-600 text-sm mb-4">Aucun CV téléchargé pour le moment.</p>
      )}

      <FileUpload
        mode="advanced" // Utilise le mode advanced pour une meilleure UI avec "auto"
        name="cv"
        url="http://localhost:5000/candidates/documents/upload-cv"
        accept=".pdf" // Le PDF est préférable pour les CV
        maxFileSize={2000000}
        onBeforeSend={onBeforeSend} // Appel de la fonction définie au-dessus
        auto
        chooseLabel="Remplacer le CV"
        uploadLabel="Uploader"
        onUpload={() => {
          loadCV();
          if (onUpdate) onUpdate();
        }}
        // Message d'erreur si le token expire ou autre
        onError={(e) => console.error("Erreur lors de l'upload", e)}
      />
    </Card>
  );
}