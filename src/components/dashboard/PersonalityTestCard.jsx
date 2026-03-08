import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { getTestStatus } from '../../api/candidateApi'

export const PersonalityTestCard = ({ onStart }) => {
    const [testDone, setTestDone] = useState(false)

    // 1. Déclare la fonction AVANT de l'utiliser
    const checkStatus = async () => {
        try {
            const data = await getTestStatus();
            // Attention : ton backend renvoie data.status === "completed" 
            // d'après tes routes Flask précédentes.
            setTestDone(data.status === "completed");
        } catch (error) {
            console.error("Erreur lors de la vérification du statut :", error);
        }
    };

    // 2. Appelle la fonction dans le useEffect
    useEffect(() => {
        checkStatus();
    }, []);
    // ... ta fonction checkStatus identique

    return (
        <Card className="shadow-2 border-round-xl border-left-3 border-orange-500 overflow-hidden">
            <div className="text-center p-2">
                <span className="text-orange-600 font-bold uppercase text-xs p-1 surface-100 border-round">
                    Propulsé par l'IA
                </span>
                <h2 className="text-2xl font-bold mt-3 mb-2">Bilan NYOTA</h2>
                <p className="text-600 text-sm mb-4">
                    Alignez votre personnalité avec vos ambitions.
                </p>
                
                <div className="surface-50 p-3 border-round-lg mb-4 text-sm">
                    <p className="m-0 text-600">
                        <i className="pi pi-clock mr-2 text-orange-500"></i>
                        ~15 minutes
                    </p>
                </div>

                <Button
                    label={testDone ? "Test complété" : "Lancer mon bilan"}
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    className={`w-full p-button-orange border-round-lg font-bold shadow-2 
                    ${testDone ? "p-button-success" : ""}`}
                    disabled={testDone}
                    onClick={onStart}
                />
            </div>
        </Card>
    );
};
