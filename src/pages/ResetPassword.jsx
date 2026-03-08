import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import AuthLayout from "../layouts/AuthLayout"; // Import indispensable

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Mot de passe réinitialisé avec succès !");
        navigate("/login");
      } else {
        alert(data.message || "Erreur lors de la réinitialisation");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur serveur");
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full shadow-4 p-2 md:p-3">
        <h2 className="text-center text-900 font-bold mb-3">Nouveau mot de passe</h2>
        <p className="text-center text-600 mb-5">
          Choisissez un mot de passe sécurisé pour votre compte NYOTA.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-column gap-4">
          
          <div className="flex flex-column gap-2">
            <label className="font-semibold text-sm">Nouveau mot de passe</label>
            <Password
              placeholder="••••••••"
              className="w-full"
              inputClassName="w-full p-inputtext-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={true} // Recommandé ici pour aider l'utilisateur
              toggleMask
              required
            />
          </div>

          <div className="flex flex-column gap-2">
            <label className="font-semibold text-sm">Confirmer le mot de passe</label>
            <Password
              placeholder="••••••••"
              className="w-full"
              inputClassName="w-full p-inputtext-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              feedback={false}
              toggleMask
              required
            />
          </div>

          <Button 
            label="Réinitialiser le mot de passe" 
            type="submit" 
            className="w-full p-button-lg mt-3"
          />

          <Button 
            label="Annuler et retourner au login" 
            link 
            className="text-sm p-0" 
            onClick={() => navigate("/login")}
          />
        </form>
      </Card>
    </AuthLayout>
  );
}