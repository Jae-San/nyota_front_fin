import { Card } from "primereact/card"
import { Button } from "primereact/button"

import logo from "../../assets/Logo_NYOTA.svg"

export default function TestIntro({ onStart }) {

  return (

    <div className="flex justify-content-center align-items-center min-h-screen p-4">

      <Card className="text-center md:w-6">

        <img src={logo} alt="NYOTA" style={{ width: 120 }} />

        <h2 className="mt-3">
          Test de personnalité NYOTA
        </h2>

        <p className="text-600">

          Ce test analyse votre personnalité professionnelle
          afin de mieux aligner vos compétences et votre
          orientation de carrière.

        </p>

        <p className="mt-3 text-sm text-500">
          Durée moyenne : 15 minutes
        </p>

        <Button
          label="Commencer le test"
          icon="pi pi-play"
          className="mt-4"
          onClick={onStart}
        />

      </Card>

    </div>

  )

}