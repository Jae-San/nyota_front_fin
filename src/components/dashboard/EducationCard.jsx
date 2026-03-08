import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { updateEducation } from "../../api/candidateApi";

export default function EducationCard({ initialData, onUpdate }) {

  const [editMode, setEditMode] = useState(false);

  const [education, setEducation] = useState(initialData || {});

  const [tempEducation, setTempEducation] = useState(initialData || {});

  useEffect(() => {

    if (initialData) {
      setEducation(initialData);
      setTempEducation(initialData);
    }

  }, [initialData]);

  const handleChange = (e, field) => {

    setTempEducation({
      ...tempEducation,
      [field]: e.target.value
    });

  };

  const save = async () => {

    try {

      await updateEducation({
        education_level: tempEducation.education_level,
        institution_name: tempEducation.institution_name
      });

      setEducation(tempEducation);

      setEditMode(false);

      if (onUpdate) {
        onUpdate();
      }

    } catch (error) {

      console.error("Erreur lors de la mise à jour de l'éducation :", error);

    }

  };

  const cancel = () => {

    setTempEducation(education);
    setEditMode(false);

  };

  return (

    <Card 
        title={<span><i className="pi pi-graduation-cap mr-2 text-primary"></i>Éducation</span>}
        className="h-full shadow-1 border-round-xl"
    >

      <div className="flex flex-column gap-4">

        <div className="flex flex-column gap-2">
            <label className="text-sm font-semibold text-600">Niveau d'études</label>

            <InputText 
                value={tempEducation.education_level || ""}
                disabled={!editMode}
                onChange={(e)=>handleChange(e,"education_level")}
                className={!editMode ? "surface-50" : ""}
            />
        </div>

        <div className="flex flex-column gap-2">
            <label className="text-sm font-semibold text-600">Établissement</label>

            <InputText 
                value={tempEducation.institution_name || ""}
                disabled={!editMode}
                onChange={(e)=>handleChange(e,"institution_name")}
                className={!editMode ? "surface-50" : ""}
            />
        </div>

      </div>

      <div className="flex justify-content-end gap-2 mt-4">

        {!editMode ? (

          <Button
            icon="pi pi-pencil"
            label="Modifier"
            text
            onClick={()=>setEditMode(true)}
          />

        ) : (

          <>
            <Button
              icon="pi pi-check"
              label="Enregistrer"
              severity="success"
              onClick={save}
            />

            <Button
              icon="pi pi-times"
              label="Annuler"
              severity="secondary"
              text
              onClick={cancel}
            />
          </>

        )}

      </div>

    </Card>

  );

}