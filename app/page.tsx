"use client";

import { useState } from "react";
import Image from "next/image";

function drawNumbers(): number[] {
  const pool = Array.from({ length: 59 }, (_, i) => i + 1);
  const drawn: number[] = [];

  while (drawn.length < 6) {
    const index = Math.floor(Math.random() * pool.length);
    drawn.push(pool.splice(index, 1)[0]);
  }

  return drawn.sort((a, b) => a - b);
}

export default function Home() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [savedRows, setSavedRows] = useState<number[][]>([]);
  const [message, setMessage] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  const messages = [
    "Good luck!",
    "Fingers crossed!",
    "Maybe this is the one!",
    "Here's hoping!",
    "Fortune favours the bold!",
    "You never know!",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-10 flex flex-col items-center gap-8 w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center gap-3 w-full justify-center pb-6 border-b border-gray-100">
          <Image
            src="/android-chrome-192x192.png"
            alt="Lottery logo"
            width={44}
            height={44}
          />
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">
            UK Lotto Draw
          </h1>
        </div>

        {/* Balls */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-3 justify-center">
            {numbers.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 rounded-full border-2 border-dashed border-gray-200"
                  />
                ))
              : numbers.map((num, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 flex items-center justify-center text-xl font-bold text-amber-900 shadow-md ring-2 ring-amber-200"
                  >
                    {num}
                  </div>
                ))}
          </div>
          {numbers.length > 0 && (
            <p className="text-gray-400 text-sm italic">{message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setNumbers(drawNumbers());
                setMessage(
                  messages[Math.floor(Math.random() * messages.length)],
                );
                setDuplicateWarning(false);
              }}
              className="px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold rounded-xl transition-colors shadow-sm"
            >
              {numbers.length === 0 ? "Draw Numbers" : "Draw Again"}
            </button>

            {numbers.length > 0 && (
              <>
                <button
                  onClick={() => {
                    const isDuplicate = savedRows.some(
                      (row) => row.join(",") === numbers.join(","),
                    );
                    if (isDuplicate) {
                      setDuplicateWarning(true);
                    } else {
                      setSavedRows((prev) => [...prev, numbers]);
                      setDuplicateWarning(false);
                    }
                  }}
                  className="px-7 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-base font-semibold rounded-xl transition-colors shadow-sm"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setNumbers([]);
                    setMessage("");
                    setDuplicateWarning(false);
                  }}
                  className="px-7 py-3 border border-gray-200 hover:bg-gray-50 text-gray-500 text-base font-semibold rounded-xl transition-colors"
                >
                  Clear
                </button>
              </>
            )}
          </div>

          {duplicateWarning && (
            <p className="text-amber-600 text-sm bg-amber-50 border border-amber-100 rounded-lg px-4 py-2">
              These numbers have already been saved.
            </p>
          )}
        </div>

        {/* Saved Rows */}
        {savedRows.length > 0 && (
          <div className="w-full flex flex-col gap-2 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Saved Lines{" "}
                <span className="text-indigo-400">({savedRows.length})</span>
              </h2>
              <button
                onClick={() => setSavedRows([])}
                className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
            {savedRows.map((row, i) => (
              <div
                key={i}
                className="flex gap-2 items-center bg-gray-50 rounded-xl px-4 py-3"
              >
                <span className="text-xs font-semibold text-gray-300 w-5 shrink-0">
                  #{i + 1}
                </span>
                <div className="flex gap-2 flex-1 justify-center">
                  {row.map((num, j) => (
                    <div
                      key={j}
                      className="w-9 h-9 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 flex items-center justify-center text-xs font-bold text-amber-900 shadow-sm"
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setSavedRows((prev) => prev.filter((_, idx) => idx !== i))
                  }
                  className="w-6 h-6 rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-500 text-gray-400 flex items-center justify-center text-sm transition-colors shrink-0"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="mt-6 text-xs text-gray-400">
        Made By{" "}
        <a
          href="https://stuartsm.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-600 transition-colors"
        >
          StuartSM
        </a>
      </p>
    </main>
  );
}
