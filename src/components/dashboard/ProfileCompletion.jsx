import { Card } from "primereact/card"
import { ProgressBar } from "primereact/progressbar"

export default function ProfileCompletion({ data }) {

  const calculateCompletion = () => {

    if (!data) return 0

    let total = 6
    let score = 0

    // Profil
    if (data.first_name && data.last_name) score++

    // Education
    if (data.education) score++

    // Experience
    if (data.experience) score++

    // Preferences
    if (data.preferences) score++

    // CV
    if (data.cv) score++

    // Test personnalité
    if (data.personality) score++

    return Math.round((score / total) * 100)

  }

  const completion = calculateCompletion()

  return (

    <Card className="mb-4 border-none shadow-1 border-round-xl">

      <div className="flex align-items-center justify-content-between mb-2">

        <span className="font-bold text-900">
          Score de complétion
        </span>

        <span className="text-primary font-bold">
          {completion}%
        </span>

      </div>

      <ProgressBar
        value={completion}
        showValue={false}
        style={{ height: "8px" }}
      />

      <small className="text-600 block mt-2">
        Plus votre profil est complet, meilleures sont vos chances.
      </small>

    </Card>

  )

}