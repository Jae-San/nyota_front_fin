import { Button } from "primereact/button"

const options = [
  { label: "Pas du tout d'accord", score: 1 },
  { label: "Pas d'accord", score: 2 },
  { label: "Neutre", score: 3 },
  { label: "D'accord", score: 4 },
  { label: "Tout à fait d'accord", score: 5 }
]

export default function QuestionCard({ question, onAnswer }) {

  return (

    <div className="surface-card p-5 border-round-xl shadow-2">

      <h2 className="text-xl md:text-2xl font-semibold mb-5 text-center">
        {question.question_text}
      </h2>

      <div className="flex flex-column gap-3">

        {options.map((opt) => (

          <button
            key={opt.score}
            onClick={() => onAnswer(opt.score)}
            className="
            p-4 border-2 border-round-xl text-lg font-medium
            surface-0 border-300 cursor-pointer
            transition-all transition-duration-200
            hover:border-primary hover:bg-primary hover:text-white
            "
          >
            {opt.label}
          </button>

        ))}

      </div>

    </div>

  )

}