// components/RoutineQuiz.tsx
"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { QuizAnswers, RoutineRecommendation, generateRoutine } from "@/lib/routineEngine";
import RoutineResult from "./RoutineResult";

const QUIZ_STEPS = [
  {
    id: "skinType",
    question: "What's your skin type?",
    answers: [
      { id: "oily", label: "Oily" },
      { id: "dry", label: "Dry" },
      { id: "combination", label: "Combination" },
      { id: "sensitive", label: "Sensitive" },
    ],
  },
  {
    id: "mainConcern",
    question: "What's your main skin concern?",
    answers: [
      { id: "acne", label: "Acne & Breakouts" },
      { id: "pigmentation", label: "Dark Spots & Pigmentation" },
      { id: "dullness", label: "Dullness & Uneven Tone" },
      { id: "dehydration", label: "Dehydration & Dryness" },
    ],
  },
  {
    id: "budget",
    question: "What's your budget for a routine?",
    answers: [
      { id: "under_500", label: "Under ₹500 per product" },
      { id: "under_1000", label: "Under ₹1,000 per product" },
      { id: "under_2000", label: "Under ₹2,000 per product" },
    ],
  },
  {
    id: "experience",
    question: "What's your skincare experience?",
    answers: [
      { id: "beginner", label: "Beginner (new to skincare)" },
      { id: "intermediate", label: "Intermediate (using actives)" },
    ],
  },
];

export default function RoutineQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [showResult, setShowResult] = useState(false);
  const [routine, setRoutine] = useState<RoutineRecommendation | null>(null);

  const step = QUIZ_STEPS[currentStep];
  const selectedAnswer = answers[step.id as keyof QuizAnswers];
  const isAnswered = !!selectedAnswer;
  const isLastStep = currentStep === QUIZ_STEPS.length - 1;

  const handleSelectAnswer = (answerId: string) => {
    setAnswers({
      ...answers,
      [step.id]: answerId,
    });
  };

  const handleNext = () => {
    if (!isAnswered) return;

    if (isLastStep) {
      // Generate routine
      const completeAnswers = answers as QuizAnswers;
      const generatedRoutine = generateRoutine(completeAnswers);
      setRoutine(generatedRoutine);
      setShowResult(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setRoutine(null);
  };

  if (showResult && routine) {
    return <RoutineResult routine={routine} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div style={{
  width: "100%",
  maxWidth: "720px",
  margin: "0 auto"
}}>
        {/* Progress */}
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            Step {currentStep + 1} of {QUIZ_STEPS.length}
          </p>
          <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              style={{
    height: "2px",
    background: "#000",
    width: `${((currentStep + 1) / QUIZ_STEPS.length) * 100}%`,
    transition: "0.3s ease"
  }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-12">
          <h1 style={{
  fontFamily: "'DM Serif Display', serif",
  fontSize: "36px",
  textAlign: "center",
  marginBottom: "10px",
  fontWeight: 400,
  color: "#111"
}}>
  {step.question}
</h1>
        </div>

        {/* Answers */}
        <div className="space-y-3 mb-12">
          {step.answers.map((answer) => (
            <button
  key={answer.id}
  onClick={() => handleSelectAnswer(answer.id)}
  style={{
    width: "100%",
    padding: "16px 20px",
    border: selectedAnswer === answer.id ? "1px solid #000" : "1px solid #d6d0c9",
    background: selectedAnswer === answer.id ? "#000" : "#fff",
    color: selectedAnswer === answer.id ? "#fff" : "#000",
    textAlign: "left",
    transition: "all 0.2s ease",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    letterSpacing: "0.02em"
  }}
>
  {answer.label}
</button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 transition-all duration-200 ${
              currentStep === 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-black hover:text-gray-600"
            }`}
          >
            <ChevronLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`flex items-center gap-2 px-6 py-3 bg-black text-white transition-all duration-200 ${
              isAnswered ? "hover:bg-gray-900" : "opacity-50 cursor-not-allowed"
            }`}
          >
            <span className="text-sm font-medium">
              {isLastStep ? "Generate Routine" : "Next"}
            </span>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center mt-12">
          Results are based on general skin profiles, not medical advice. Consult a dermatologist for personalized recommendations.
        </p>
      </div>
    </div>
  );
}
