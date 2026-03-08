import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startTest, submitTest } from "../../api/testApi";

const CSS = `
  .pt-wrap {
    min-height: 100vh;
    background: #f9fafb;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: clamp(24px, 5vw, 56px) clamp(12px, 4vw, 32px) 80px;
  }

  .pt-card {
    background: #fff;
    border-radius: 24px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.08);
    padding: clamp(24px, 5vw, 48px);
    width: 100%;
    max-width: 680px;
  }

  /* Progress bar */
  .pt-progress-wrap {
    margin-bottom: 32px;
  }
  .pt-progress-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .pt-progress-label span:first-child {
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
  }
  .pt-progress-label span:last-child {
    font-size: 13px;
    font-weight: 700;
    color: #FF7A00;
  }
  .pt-progress-track {
    height: 6px;
    background: #f3f4f6;
    border-radius: 99px;
    overflow: hidden;
  }
  .pt-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #FF7A00, #ffb347);
    border-radius: 99px;
    transition: width 0.4s ease;
  }

  /* Question */
  .pt-question {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    font-weight: 700;
    color: #1D1D1F;
    line-height: 1.45;
    margin: 0 0 32px;
    text-align: center;
  }

  /* Options Likert */
  .pt-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .pt-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 20px;
    border: 2px solid #e5e7eb;
    border-radius: 14px;
    background: #fff;
    cursor: pointer;
    transition: all 0.18s ease;
    text-align: left;
    font-size: 15px;
    font-weight: 500;
    color: #374151;
    width: 100%;
  }
  .pt-option:hover {
    border-color: #FF7A00;
    background: #fff8f3;
    color: #FF7A00;
    transform: translateX(4px);
  }
  .pt-option.selected {
    border-color: #FF7A00;
    background: #FF7A00;
    color: #fff;
    transform: translateX(4px);
  }
  .pt-option-dot {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid currentColor;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.18s;
  }
  .pt-option.selected .pt-option-dot {
    background: rgba(255,255,255,0.3);
    border-color: #fff;
  }
  .pt-option-dot-inner {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
    opacity: 0;
    transition: opacity 0.18s;
  }
  .pt-option.selected .pt-option-dot-inner { opacity: 1; }

  /* Navigation */
  .pt-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 28px;
    gap: 12px;
  }
  .pt-btn {
    height: 48px;
    border-radius: 25px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }
  .pt-btn-secondary {
    background: #f3f4f6;
    color: #6b7280;
  }
  .pt-btn-secondary:hover:not(:disabled) {
    background: #e5e7eb;
    color: #374151;
  }
  .pt-btn-secondary:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .pt-btn-primary {
    background: #FF7A00;
    color: #fff;
    box-shadow: 0 4px 16px rgba(255,122,0,0.3);
  }
  .pt-btn-primary:hover:not(:disabled) {
    background: #e06a00;
    transform: translateY(-1px);
  }
  .pt-btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* Finish screen */
  .pt-finish {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: clamp(32px,6vw,64px) 24px;
    max-width: 560px;
  }
  .pt-finish-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF7A00, #ffb347);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    box-shadow: 0 8px 32px rgba(255,122,0,0.3);
  }
  .pt-finish h2 {
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    font-weight: 800;
    color: #1D1D1F;
    margin: 0 0 12px;
  }
  .pt-finish p {
    font-size: 16px;
    color: #6b7280;
    line-height: 1.6;
    margin: 0 0 32px;
  }

  /* Loading */
  .pt-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 16px;
    color: #6b7280;
    font-size: 15px;
  }
  .pt-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f4f6;
    border-top-color: #FF7A00;
    border-radius: 50%;
    animation: pt-spin 0.8s linear infinite;
  }
  @keyframes pt-spin { to { transform: rotate(360deg); } }

  /* Error */
  .pt-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 12px;
    padding: 12px 16px;
    color: #dc2626;
    font-size: 14px;
    margin-top: 16px;
    text-align: center;
  }

  @media (max-width: 480px) {
    .pt-option { padding: 12px 14px; font-size: 14px; }
    .pt-nav { flex-direction: column-reverse; }
    .pt-btn { width: 100%; justify-content: center; }
  }
`;

const LIKERT = [
  { label: "Pas du tout d'accord", score: 1 },
  { label: "Pas d'accord",         score: 2 },
  { label: "Neutre",               score: 3 },
  { label: "D'accord",             score: 4 },
  { label: "Tout à fait d'accord", score: 5 },
];

export default function PersonalityTest() {
  const navigate = useNavigate();

  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [questions, setQuestions]   = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers]       = useState({});
  const [selected, setSelected]     = useState(null);
  const [finished, setFinished]     = useState(false);
  const [error, setError]           = useState(null);

  useEffect(() => {
    startTest()
      .then(data => setQuestions(data?.questions || []))
      .catch(err => setError(err?.message || "Impossible de charger le test."))
      .finally(() => setLoading(false));
  }, []);

  // Restaurer la sélection si on revient en arrière
  useEffect(() => {
    if (questions[currentIndex]) {
      setSelected(answers[questions[currentIndex].id] ?? null);
    }
  }, [currentIndex, questions]);

  const handleSelect = (score) => {
    setSelected(score);
  };

  const handleNext = async () => {
    if (selected === null) return;
    const question = questions[currentIndex];
    const updatedAnswers = { ...answers, [question.id]: selected };
    setAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      // Dernière question → soumettre
      setSubmitting(true);
      setError(null);
      try {
        await submitTest(updatedAnswers);
        setFinished(true);
        setTimeout(() => navigate("/dashboard"), 3000);
      } catch (err) {
        setError(err?.message || "Erreur lors de l'envoi. Veuillez réessayer.");
        setSubmitting(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  const isLast = currentIndex === questions.length - 1;
  const progress = questions.length > 0
    ? Math.round(((currentIndex + (selected !== null ? 1 : 0)) / questions.length) * 100)
    : 0;

  // ── Écrans ──────────────────────────────────────────────────────────────────

  if (loading) return (
    <>
      <style>{CSS}</style>
      <div className="pt-loading">
        <div className="pt-spinner" />
        <span>Chargement du test…</span>
      </div>
    </>
  );

  if (finished) return (
    <>
      <style>{CSS}</style>
      <div className="pt-wrap">
        <div className="pt-finish">
          <div className="pt-finish-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Test complété !</h2>
          <p>
            Vos réponses ont bien été enregistrées. Nous allons analyser votre profil
            pour vous proposer les meilleures opportunités.
          </p>
          <button className="pt-btn pt-btn-primary" onClick={() => navigate("/dashboard")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour au dashboard
          </button>
        </div>
      </div>
    </>
  );

  const question = questions[currentIndex];
  if (!question) return null;

  return (
    <>
      <style>{CSS}</style>
      <div className="pt-wrap">
        <div className="pt-card">

          {/* Progress */}
          <div className="pt-progress-wrap">
            <div className="pt-progress-label">
              <span>Question {currentIndex + 1} sur {questions.length}</span>
              <span>{progress}%</span>
            </div>
            <div className="pt-progress-track">
              <div className="pt-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Question */}
          <p className="pt-question">{question.question_text}</p>

          {/* Options */}
          <div className="pt-options">
            {LIKERT.map(opt => (
              <button
                key={opt.score}
                className={`pt-option${selected === opt.score ? " selected" : ""}`}
                onClick={() => handleSelect(opt.score)}
              >
                <div className="pt-option-dot">
                  <div className="pt-option-dot-inner" />
                </div>
                {opt.label}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && <div className="pt-error">{error}</div>}

          {/* Navigation */}
          <div className="pt-nav">
            <button
              className="pt-btn pt-btn-secondary"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Précédent
            </button>

            <button
              className="pt-btn pt-btn-primary"
              onClick={handleNext}
              disabled={selected === null || submitting}
            >
              {submitting ? "Envoi…" : isLast ? "Terminer" : "Suivant"}
              {!submitting && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
