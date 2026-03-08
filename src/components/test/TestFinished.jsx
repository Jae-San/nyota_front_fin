import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"

export default function TestFinished() {

  const navigate = useNavigate()

  return (

    <div className="flex justify-content-center align-items-center min-h-screen">

      <Card className="text-center md:w-6">

        <i className="pi pi-check-circle text-green-500 text-6xl"></i>

        <h2 className="mt-3">
          Test terminé
        </h2>

        <p className="text-600">
          Votre test a été enregistré avec succès.
        </p>

        <Button
          label="Retour au Dashboard"
          className="mt-4"
          onClick={() => navigate("/dashboard")}
        />

      </Card>

    </div>

  )

}