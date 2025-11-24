"use client";

import React, { useState } from "react";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Multi Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
];

export function Quiz() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === questions[0].answer);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {questions[0].question}
      </h3>
      <div className="mt-4 space-y-2">
        {questions[0].options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={`w-full rounded-md border p-2 text-left transition-colors ${
              selectedOption === option
                ? isCorrect
                  ? "border-green-500 bg-green-100 text-green-800"
                  : "border-red-500 bg-red-100 text-red-800"
                : "border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {isCorrect === true && (
        <p className="mt-4 font-bold text-green-600">Correct!</p>
      )}
      {isCorrect === false && (
        <p className="mt-4 font-bold text-red-600">Incorrect. Please try again.</p>
      )}
    </div>
  );
}
