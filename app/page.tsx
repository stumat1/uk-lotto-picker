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
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-8 w-full max-w-xl">
        <div className="flex items-center gap-3">
          <Image src="/android-chrome-192x192.png" alt="Lottery logo" width={60} height={60} />
          <h1 className="text-4xl font-bold text-gray-800">UK Lotto Draw</h1>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-4 flex-wrap justify-center">
            {numbers.map((num, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-bold text-gray-800 shadow-md"
              >
                {num}
              </div>
            ))}
          </div>
          {numbers.length > 0 && (
            <p className="text-gray-500 text-lg font-medium">{message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setNumbers(drawNumbers());
              setMessage(messages[Math.floor(Math.random() * messages.length)]);
              setDuplicateWarning(false);
            }}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-semibold rounded-full transition-colors shadow-lg"
          >
            {numbers.length === 0 ? "Draw Numbers" : "Draw Again"}
          </button>

          {duplicateWarning && (
            <p className="text-red-500 text-sm font-medium">These numbers have already been saved.</p>
          )}

          {numbers.length > 0 && (
            <>
              <button
                onClick={() => {
                const isDuplicate = savedRows.some(
                  (row) => row.join(",") === numbers.join(",")
                );
                if (isDuplicate) {
                  setDuplicateWarning(true);
                } else {
                  setSavedRows((prev) => [...prev, numbers]);
                  setDuplicateWarning(false);
                }
              }}
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-semibold rounded-full transition-colors shadow-lg"
              >
                Save
              </button>

              <button
                onClick={() => { setNumbers([]); setMessage(""); setDuplicateWarning(false); }}
                className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xl font-semibold rounded-full transition-colors shadow-lg"
              >
                Clear
              </button>
            </>
          )}
        </div>

        {savedRows.length > 0 && (
          <div className="w-full flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-600">Saved Rows</h2>
              <button
                onClick={() => setSavedRows([])}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
            {savedRows.map((row, i) => (
              <div key={i} className="flex gap-2 justify-center items-center">
                {row.map((num, j) => (
                  <div
                    key={j}
                    className="w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center text-sm font-bold text-gray-800 shadow-sm"
                  >
                    {num}
                  </div>
                ))}
                <button
                  onClick={() => setSavedRows((prev) => prev.filter((_, idx) => idx !== i))}
                  className="ml-2 w-8 h-8 rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-600 text-gray-500 flex items-center justify-center font-bold transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
