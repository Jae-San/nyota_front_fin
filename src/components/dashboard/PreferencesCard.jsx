import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { updatePreferences } from "../../api/candidateApi";

export default function PreferencesCard({ initialData, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  
  // Correction 1: Initialisation sécurisée pour éviter le crash au premier rendu
  const [tempPreferences, setTempPreferences] = useState({
    ...initialData,
    languages: Array.isArray(initialData?.languages) ? initialData.languages : []
  });

  // --- LISTE DES LANGUES ---
  const languageOptions = [
    { name: "Fon", code: "Fon" }, { name: "Mahi", code: "Mahi" }, { name: "Goun", code: "Goun" },
    { name: "Ewé", code: "Ewe" }, { name: "Français", code: "Français" }, { name: "Anglais", code: "Anglais" },
    { name: "Swahili", code: "Swahili" }, { name: "Haoussa", code: "Haoussa" }, { name: "Portugais", code: "Portugais" },
    { name: "Berbère", code: "Berbere" }, { name: "Yoruba", code: "Yoruba" }, { name: "Igbo", code: "Igbo" },
    { name: "Zoulou", code: "Zoulou" }, { name: "Xhosa", code: "Xhosa" }, { name: "Amharique", code: "Amharique" },
    { name: "Oromo", code: "Oromo" }, { name: "Somali", code: "Somali" }, { name: "Kanouri", code: "Kanouri" },
    { name: "Songhaï", code: "Songhai" }, { name: "Fula (Peul)", code: "Fula" }, { name: "Shona", code: "Shona" },
    { name: "Chewa", code: "Chewa" }, { name: "Tswana", code: "Tswana" }, { name: "Lingala", code: "Lingala" },
    { name: "Kinyarwanda", code: "Kinyarwanda" }, { name: "Kirundi", code: "Kirundi" }, { name: "Tigrigna", code: "Tigrigna" },
    { name: "Wolof", code: "Wolof" }, { name: "Mandingue", code: "Mandingue" }, { name: "Sango", code: "Sango" },
    { name: "Sesotho", code: "Sesotho" }, { name: "Tsonga", code: "Tsonga" }, { name: "Venda", code: "Venda" },
    { name: "Kikuyu", code: "Kikuyu" }, { name: "Luba-Katanga", code: "Luba-Katanga" }, { name: "Bambara", code: "Bambara" },
    { name: "Dinka", code: "Dinka" }, { name: "Kongo", code: "Kongo" }, { name: "Luganda", code: "Luganda" }
  ];

  // --- OPTIONS DEVISES ---
  const currencyOptions = [
    { label: "FCFA", value: "XOF" }, { label: "Euro (€)", value: "EUR" },
    { label: "Dollar ($)", value: "USD" }, { label: "Naira (₦)", value: "NGN" },
    { label: "Cedi ghanéen (GH₵)", value: "GHS" }, { label: "Shilling kenyan (KSh)", value: "KES" },
    { label: "Dirham marocain (MAD)", value: "MAD" }, { label: "Rand sud-africain (R)", value: "ZAR" },
    { label: "Livre égyptienne (E£)", value: "EGP" }, { label: "Dinar algérien (DA)", value: "DZD" },
    { label: "Dinar tunisien (DT)", value: "TND" }, { label: "Shilling ougandais (USh)", value: "UGX" },
    { label: "Kwanza angolais (Kz)", value: "AOA" }, { label: "Birr éthiopien (Br)", value: "ETB" },
    { label: "Roupie mauricienne (Rs)", value: "MUR" }, { label: "Livre sterling (£)", value: "GBP" },
    { label: "Franc suisse (CHF)", value: "CHF" }, { label: "Couronne norvégienne (kr)", value: "NOK" },
    { label: "Couronne suédoise (kr)", value: "SEK" }, { label: "Couronne danoise (kr)", value: "DKK" },
    { label: "Zloty polonais (zł)", value: "PLN" }, { label: "Yen japonais (¥)", value: "JPY" },
    { label: "Yuan chinois (¥)", value: "CNY" }, { label: "Roupie indienne (₹)", value: "INR" },
    { label: "Riyal saoudien (SR)", value: "SAR" }, { label: "Dirham des Émirats (AED)", value: "AED" },
    { label: "Won sud-coréen (₩)", value: "KRW" }, { label: "Dollar de Singapour (S$)", value: "SGD" },
    { label: "Roupie indonésienne (Rp)", value: "IDR" }, { label: "Dollar canadien (C$)", value: "CAD" },
    { label: "Real brésilien (R$)", value: "BRL" }, { label: "Peso mexicain ($)", value: "MXN" },
    { label: "Dollar australien (A$)", value: "AUD" }, { label: "Dollar néo-zélandais (NZ$)", value: "NZD" }
  ];

    const availabilityOptions = [
    { label: 'Immédiatement', value: 'Immédiatement' },
    { label: 'Dans une semaine', value: 'Dans une semaine' },
    { label: 'Dans deux semaines', value: 'Dans deux semaines' },
    { label: 'Dans un mois', value: 'Dans un mois' },
    { label: 'Dans 3 mois', value: 'Dans 3 mois' },
    { label: 'Dans 6 mois', value: 'Dans 6 mois' },
    { label: 'Dans 1 an', value: 'Dans 1 an' },
    { label: "Plus d'un an", value: "Plus d'un an" }
    ];

  const workModeOptions = ["Remote", "Hybrid", "On-site"];
  const relocalisationOptions = [
    { label: "Oui", value: true },
    { label: "Non", value: false }
  ];

  useEffect(() => {
    if (initialData) {
      const data = { ...initialData };
      
      // Formatage de la date
      if (data.availability_date) data.availability_date = new Date(data.availability_date);
      
      // Correction 2: Conversion robuste String -> Array avec nettoyage
      if (typeof data.languages === "string" && data.languages.trim().length > 0) {
        data.languages = data.languages.split(",").map(l => l.trim());
      } else {
        data.languages = []; // Toujours un tableau
      }
      
      setTempPreferences(data);
    }
  }, [initialData]);

  const save = async () => {
    try {
      const payload = {
        ...tempPreferences,
        // Conversion Array -> String pour PostgreSQL (ex: "Fon, Français")
        languages: Array.isArray(tempPreferences.languages) ? tempPreferences.languages.join(", ") : "",
        availability_date: tempPreferences.availability_date instanceof Date 
          ? tempPreferences.availability_date.toISOString().split('T')[0] 
          : tempPreferences.availability_date
      };

      await updatePreferences(payload);
      setEditMode(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Erreur mise à jour préférences:", error);
    }
  };

  return (
    <Card 
      title={<span><i className="pi pi-sliders-h mr-2 text-primary"></i>Préférences professionnelles</span>} 
      className="shadow-1 border-round-xl overflow-hidden"
    >
      <div className="grid p-fluid">
        
        <div className="col-12 md:col-6 field mt-2">
          <label className="font-bold text-sm text-600">Industrie souhaitée</label>
          <InputText 
            value={tempPreferences.target_industry || ""} 
            onChange={(e) => setTempPreferences({...tempPreferences, target_industry: e.target.value})}
            disabled={!editMode} placeholder="Ex: Informatique, Finance..." 
          />
        </div>

        <div className="col-12 md:col-6 field mt-2">
          <label className="font-bold text-sm text-600">Poste recherché</label>
          <InputText 
            value={tempPreferences.target_job_title || ""} 
            onChange={(e) => setTempPreferences({...tempPreferences, target_job_title: e.target.value})}
            disabled={!editMode} placeholder="Ex: Développeur Fullstack" 
          />
        </div>

        <div className="col-12 field mt-2">
          <label className="font-bold text-sm text-600">Langues parlées</label>
          <MultiSelect 
            // Correction 3: Sécurité ultime au niveau du composant
            value={Array.isArray(tempPreferences.languages) ? tempPreferences.languages : []} 
            options={languageOptions} 
            onChange={(e) => setTempPreferences({...tempPreferences, languages: e.value})}
            optionLabel="name" optionValue="code"
            disabled={!editMode} display="chip" placeholder="Choisir vos langues"
            filter className="w-full"
          />
        </div>

        <div className="col-12 md:col-6 field mt-2">
          <label className="font-bold text-sm text-600">Salaire minimum souhaité</label>
          <div className="p-inputgroup">
            <Dropdown 
              value={tempPreferences.currency || "XOF"} 
              options={currencyOptions} 
              onChange={(e) => setTempPreferences({...tempPreferences, currency: e.value})}
              disabled={!editMode} style={{ width: '130px' }} filter
            />
            <InputNumber 
              value={tempPreferences.expected_salary_min} 
              onValueChange={(e) => setTempPreferences({...tempPreferences, expected_salary_min: e.value})}
              disabled={!editMode} placeholder="Montant" mode="decimal" 
            />
          </div>
        </div>

        <div className="col-12 md:col-6 field mt-2">
            <label className="font-bold text-sm text-600">Disponibilité</label>
                <Dropdown 
                    value={tempPreferences.availability_date} 
                    options={availabilityOptions} 
                    onChange={(e) => setTempPreferences({...tempPreferences, availability_date: e.value})}
                    disabled={!editMode} 
                    placeholder="Sélectionner votre disponibilité"
                    className="w-full" // Pour qu'il prenne toute la largeur du conteneur
            />
        </div>

        <div className="col-12 md:col-6 field mt-2">
          <label className="font-bold text-sm text-600">Mode de travail préféré</label>
          <Dropdown 
            value={tempPreferences.work_mode} 
            options={workModeOptions} 
            onChange={(e) => setTempPreferences({...tempPreferences, work_mode: e.value})}
            disabled={!editMode} placeholder="Ex: Remote" 
          />
        </div>

                <div className="col-12 md:col-6 field mt-2">
          <label className="font-bold text-sm text-600">Nationalité</label>
          <InputText 
            value={tempPreferences.target_nationality || ""} 
            onChange={(e) => setTempPreferences({...tempPreferences, target_nationality: e.target.value})}
            disabled={!editMode} placeholder="Ex: Béninoise" 
          />
        </div>

                <div className="col-12 md:col-6 field mt-2">
          <label className="font-bold text-sm text-600">Localisation actuelle</label>
          <InputText 
            value={tempPreferences.target_current_location || ""} 
            onChange={(e) => setTempPreferences({...tempPreferences, target_current_location: e.target.value})}
            disabled={!editMode} placeholder="Ex: Rwanda" 
          />
        </div>

        <div className="col-12 md:col-6 field mt-2">
          <label className="font-bold text-sm text-600">Prêt pour relocalisation ?</label>
          <SelectButton 
            value={tempPreferences.open_to_relocation} 
            options={relocalisationOptions} 
            onChange={(e) => setTempPreferences({...tempPreferences, open_to_relocation: e.value})}
            disabled={!editMode}
          />
        </div>
      </div>

      <div className="flex justify-content-end gap-2 mt-4 pt-3 border-top-1 border-200">
        {!editMode ? (
          <Button icon="pi pi-pencil" label="Modifier" onClick={() => setEditMode(true)} className="p-button-text" />
        ) : (
          <>
            <Button icon="pi pi-check" label="Enregistrer" severity="success" onClick={save} />
            <Button icon="pi pi-times" label="Annuler" severity="secondary" text onClick={() => setEditMode(false)} />
          </>
        )}
      </div>
    </Card>
  );
}