import React, { useEffect, useState } from "react";

// 1. Correction du chemin API (remontée de 2 niveaux : dashboard -> components -> src)
import { startTest } from "../../api/candidateApi"; 

// 2. Correction du chemin TestPage (ils sont dans le même dossier 'dashboard')
import { TestPage } from "./TestPage"; 

// Si tu as besoin d'autres composants comme PersonalityTestCard
import { PersonalityTestCard } from "./PersonalityTestCard";

export default function TestContainer() {

    const [questions, setQuestions] = useState([])
    const [started, setStarted] = useState(false)

    useEffect(() => {

        loadQuestions()

    }, [])

    const loadQuestions = async () => {

        try {

            const data = await startTest()

            setQuestions(data.questions)

            setStarted(true)

        } catch (error) {

            console.error(error)

        }

    }

    if (!started) return null

    return (

        <TestPage
            questions={questions}
            onFinish={() => window.location.href = "/dashboard"}
        />

    )

}