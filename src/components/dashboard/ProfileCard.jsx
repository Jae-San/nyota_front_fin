import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { updateProfile } from "../../api/candidateApi";

export default function ProfileCard({ initialData, onUpdate }) {

  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState(initialData || {});

  const [tempProfile, setTempProfile] = useState(initialData || {});

  useEffect(() => {

    if (initialData) {
      setProfile(initialData);
      setTempProfile(initialData);
    }

  }, [initialData]);

  const handleChange = (e, field) => {

    setTempProfile({
      ...tempProfile,
      [field]: e.target.value
    });

  };

  const save = async () => {

    try {

      await updateProfile({
        first_name: tempProfile.first_name,
        last_name: tempProfile.last_name,
        phone_number: tempProfile.phone_number
      });

      setProfile(tempProfile);

      setEditMode(false);

      if (onUpdate) {
        onUpdate();
      }

    } catch (error) {

      console.error("Erreur lors de la mise à jour du profil :", error);

    }

  };

  const cancel = () => {

    setTempProfile(profile);

    setEditMode(false);

  };

  // ... ta logique identique
  return (
    <Card title="Mon Profil" subTitle="Informations de contact" className="shadow-1 border-round-xl">
      <div className="grid p-fluid">
        <div className="col-12 md:col-6">
            <label className="text-sm font-semibold text-600 block mb-2">Prénom</label>
            <InputText value={tempProfile.first_name || ""} disabled={!editMode} onChange={(e)=>handleChange(e,"first_name")} />
        </div>
        <div className="col-12 md:col-6">
            <label className="text-sm font-semibold text-600 block mb-2">Nom</label>
            <InputText value={tempProfile.last_name || ""} disabled={!editMode} onChange={(e)=>handleChange(e,"last_name")} />
        </div>
        <div className="col-12 md:col-6 mt-2">
            <label className="text-sm font-semibold text-600 block mb-2">Email</label>
            <InputText value={tempProfile.email || ""} disabled className="surface-50" />
        </div>
        <div className="col-12 md:col-6 mt-2">
            <label className="text-sm font-semibold text-600 block mb-2">Téléphone</label>
            <InputText value={tempProfile.phone_number || ""} disabled={!editMode} onChange={(e)=>handleChange(e,"phone_number")} />
        </div>
      </div>

      <div className="flex justify-content-end gap-2 mt-4">
        {!editMode ? (
          <Button icon="pi pi-pencil" label="Modifier" className="p-button-text" onClick={()=>setEditMode(true)} />
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
