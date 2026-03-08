import { ProgressBar } from "primereact/progressbar"

export default function TestProgress({ current, total }) {

  const progress = Math.round(((current + 1) / total) * 100)

  return (

    <div className="mb-4">

      <div className="flex justify-content-between mb-2 text-sm font-semibold">

        <span>Question {current + 1} / {total}</span>

        <span>{progress}%</span>

      </div>

      <ProgressBar value={progress} showValue={false} style={{ height: "10px" }} />

    </div>

  )

}