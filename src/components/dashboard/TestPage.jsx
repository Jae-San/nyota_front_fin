import React, { useState } from 'react'
import { submitTest } from '../../api/candidateApi'

const LIKERT_OPTIONS = [
    { label: "Pas du tout d'accord", score: 1 },
    { label: "Pas d'accord", score: 2 },
    { label: "Neutre", score: 3 },
    { label: "D'accord", score: 4 },
    { label: "Tout à fait d'accord", score: 5 }
]

export const TestPage = ({ questions, onFinish }) => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState({})
    const [selectedScore, setSelectedScore] = useState(null)

    const currentQuestion = questions[currentIndex]

    if (!currentQuestion) return null

    const handleAnswer = async (score) => {

        const updatedAnswers = {
            ...answers,
            [currentQuestion.id]: score
        }

        setAnswers(updatedAnswers)
        setSelectedScore(score)

        setTimeout(async () => {

            if (currentIndex < questions.length - 1) {

                setCurrentIndex(prev => prev + 1)
                setSelectedScore(null)

            } else {

                await submitTest(updatedAnswers)

                onFinish()

            }

        }, 800)

    }

    return (

        <div className="flex flex-column align-items-center p-4 min-h-screen bg-gray-50">

            <div className="w-full md:w-7 mt-6">

                <div className="text-center mb-3 text-600 font-medium">
                    Question {currentIndex + 1} / {questions.length}
                </div>

                <div className="bg-white shadow-2 border-round-xl p-6 text-center mb-4">

                    <h2 className="text-2xl md:text-4xl font-semibold mb-8 line-height-3">

                        {currentQuestion.question_text}

                    </h2>

                    <div className="flex flex-column gap-3">

                        {LIKERT_OPTIONS.map((opt) => (

                            <button
                                key={opt.score}
                                onClick={() => handleAnswer(opt.score)}
                                className={`
                                    p-4 border-2 border-round-xl text-xl font-medium
                                    ${selectedScore === opt.score
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white border-100 hover:bg-orange-500 hover:text-white'}
                                `}
                            >

                                {opt.label}

                            </button>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    )

}