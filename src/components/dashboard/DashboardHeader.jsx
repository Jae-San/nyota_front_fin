import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"

export default function DashboardHeader({ firstName, lastName }) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const initials = `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`

  const headerStyle = {
    background: "linear-gradient(261.62deg, #EEA6FF 8.15%, #1D67F1 98.68%)",
    color: "white" // Assure la lisibilité sur le dégradé
  }

  return (
    <div 
      className="flex justify-content-between align-items-center mb-5 p-4 border-round-xl shadow-2"
      style={headerStyle}
    >
      <div>
        <h2 className="m-0 font-bold text-white">Tableau de bord</h2>
        <p className="m-0 mt-1" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
          Bienvenue {firstName ? firstName : ""} dans votre espace NYOTA
        </p>
      </div>

      <div className="flex align-items-center gap-3">
        <div className="text-right hidden md:block">
          <span className="block font-bold text-white">
            {firstName} {lastName}
          </span>
          <span className="text-sm" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            Candidat
          </span>
        </div>

        <Avatar
          label={initials}
          size="large"
          shape="circle"
          className="bg-white text-primary font-bold" 
          /* L'avatar en blanc ressortira mieux sur le fond bleu/mauve */
        />

        <Button
          icon="pi pi-sign-out"
          label="Déconnexion"
          text
          onClick={logout}
          style={{ color: "white" }} 
          /* Le rouge 'danger' risquerait de jurer avec le violet, le blanc est plus élégant ici */
        />
      </div>
    </div>
  )
}