import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber"; // Importé
import { Dropdown } from "primereact/dropdown";     // Importé
import { Button } from "primereact/button";
import { updateExperience } from "../../api/candidateApi";

export default function ExperienceCard({ initialData, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [experience, setExperience] = useState(initialData || {});
  const [tempExperience, setTempExperience] = useState(initialData || {});

  // Options pour le Dropdown
  const yesNoOptions = [
    { label: 'Oui', value: 'Oui' },
    { label: 'Non', value: 'Non' }
  ];

  useEffect(() => {
    if (initialData) {
      // On s'assure que si la donnée arrive en booléen, on l'affiche en "Oui/Non"
      const formattedData = {
        ...initialData,
        has_prior_experience: initialData.has_prior_experience === true ? "Oui" : (initialData.has_prior_experience === false ? "Non" : "")
      };
      setExperience(formattedData);
      setTempExperience(formattedData);
    }
  }, [initialData]);

  const handleChange = (val, field) => {
    setTempExperience({
      ...tempExperience,
      [field]: val
    });
  };

  const save = async () => {
    try {
      // --- CRUCIAL : Conversion pour SQLAlchemy ---
      const payload = {
        ...tempExperience,
        // On envoie un vrai booléen au backend
        has_prior_experience: tempExperience.has_prior_experience === "Oui",
        years_of_experience: parseInt(tempExperience.years_of_experience) || 0
      };

      await updateExperience(payload);
      setExperience(tempExperience);
      setEditMode(false);

      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const cancel = () => {
    setTempExperience(experience);
    setEditMode(false);
  };

  return (
    <Card
      title={<span><i className="pi pi-briefcase mr-2 text-primary"></i>Expérience</span>}
      className="h-full shadow-1 border-round-xl"
    >
      <div className="flex flex-column gap-4">
        
        {/* SÉLECTEUR OUI/NON */}
        <div className="flex flex-column gap-2">
          <label className="text-sm font-semibold text-600">Avez-vous déjà une expérience ?</label>
          <Dropdown
            value={tempExperience.has_prior_experience}
            options={yesNoOptions}
            onChange={(e) => handleChange(e.value, "has_prior_experience")}
            disabled={!editMode}
            placeholder="Sélectionnez"
            className={!editMode ? "surface-50 w-full" : "w-full"}
          />
        </div>

        <div className="flex flex-column gap-2">
          <label className="text-sm font-semibold text-600">Industrie</label>
          <InputText
            value={tempExperience.industry || ""}
            disabled={!editMode}
            onChange={(e) => handleChange(e.target.value, "industry")}
            className={!editMode ? "surface-50" : ""}
          />
        </div>

        {/* CHAMP NUMÉRIQUE */}
        <div className="flex flex-column gap-2">
          <label className="text-sm font-semibold text-600">Années d'expérience</label>
          <InputNumber
            value={tempExperience.years_of_experience}
            onValueChange={(e) => handleChange(e.value, "years_of_experience")}
            disabled={!editMode}
            min={0}
            max={50}
            showButtons={editMode}
            className={!editMode ? "surface-50 w-full" : "w-full"}
          />
        </div>

        <div className="flex flex-column gap-2">
          <label className="text-sm font-semibold text-600">Spécialisation</label>
          <InputText
            value={tempExperience.specialization || ""}
            disabled={!editMode}
            onChange={(e) => handleChange(e.target.value, "specialization")}
            className={!editMode ? "surface-50" : ""}
          />
        </div>
      </div>

      <div className="flex justify-content-end gap-2 mt-4">
        {!editMode ? (
          <Button icon="pi pi-pencil" label="Modifier" text onClick={() => setEditMode(true)} />
        ) : (
          <>
            <Button icon="pi pi-check" label="Enregistrer" severity="success" onClick={save} />
            <Button icon="pi pi-times" label="Annuler" severity="secondary" text onClick={cancel} />
          </>
        )}
      </div>
    </Card>
  );
}