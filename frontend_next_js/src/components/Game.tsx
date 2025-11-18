"use client";

import React, { useCallback, useMemo, useState } from "react";
import Square, { type SquareValue } from "./Square";
import { calculateWinner, getNextPlayer, isDraw } from "@/lib/gameUtils";

/**
 * PUBLIC_INTERFACE
 * Game
 * Main Tic Tac Toe component. Manages board state, status, and actions.
 */
export default function Game() {
  const [history, setHistory] = useState<Array<Array<SquareValue>>>([
    Array<SquareValue>(9).fill(null),
  ]);
  const [step, setStep] = useState<number>(0);

  const squares = history[step];

  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
  const draw = useMemo(() => isDraw(squares), [squares]);
  const moveCount = useMemo(
    () => squares.filter((s) => s !== null).length,
    [squares]
  );
  const currentPlayer = useMemo(() => getNextPlayer(moveCount), [moveCount]);

  const status = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return "Draw";
    return `Next player: ${currentPlayer}`;
  }, [winner, draw, currentPlayer]);

  const handleClick = useCallback(
    (index: number) => {
      if (winner || draw || squares[index]) return;

      const next = squares.slice();
      next[index] = currentPlayer;

      const nextHistory = history.slice(0, step + 1).concat([next]);
      setHistory(nextHistory);
      setStep(nextHistory.length - 1);
    },
    [currentPlayer, draw, history, step, squares, winner]
  );

  const handleRestart = useCallback(() => {
    setHistory([Array<SquareValue>(9).fill(null)]);
    setStep(0);
  }, []);

  const handleUndo = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    }
  }, [step]);

  const canUndo = step > 0 && !winner;

  return (
    <div className="w-full max-w-xl px-4 md:px-6">
      <div
        className={[
          "rounded-2xl shadow-sm",
          "bg-white border border-gray-100",
          "overflow-hidden",
        ].join(" ")}
      >
        <header
          className={[
            "p-6 sm:p-7",
            "bg-gradient-to-r from-blue-500/10 to-gray-50",
            "border-b border-gray-100",
          ].join(" ")}
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Tic Tac Toe
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Play locally with a friend. Ocean Professional theme.
          </p>
        </header>

        <section className="p-6 sm:p-7">
          <div
            className={[
              "flex items-center justify-between",
              "mb-4 sm:mb-6",
            ].join(" ")}
          >
            <div
              role="status"
              aria-live="polite"
              className={[
                "text-base sm:text-lg font-medium",
                winner
                  ? "text-blue-700"
                  : draw
                  ? "text-gray-700"
                  : "text-gray-800",
              ].join(" ")}
            >
              {status}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleUndo}
                disabled={!canUndo}
                className={[
                  "px-3 py-2 rounded-lg border text-sm font-medium transition-colors",
                  canUndo
                    ? "border-amber-500 text-amber-700 hover:bg-amber-50"
                    : "border-gray-200 text-gray-400 cursor-not-allowed",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                ].join(" ")}
                aria-label="Undo last move"
              >
                Undo
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className={[
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  "bg-blue-600 text-white hover:bg-blue-700",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                ].join(" ")}
                aria-label="Restart game"
              >
                Restart
              </button>
            </div>
          </div>

          <div
            className={[
              "grid grid-cols-3 gap-3",
              "w-full",
              // Maintain square board area
              "aspect-square",
            ].join(" ")}
          >
            {squares.map((val, i) => (
              <div key={i} className="w-full h-full">
                <Square
                  index={i}
                  value={val}
                  onClick={handleClick}
                  isWinning={!!line?.includes(i)}
                  disabled={!!winner || draw}
                />
              </div>
            ))}
          </div>

          <footer className="mt-6 text-xs text-gray-500 text-center">
            Tip: Use Undo to step back before the game ends.
          </footer>
        </section>
      </div>
    </div>
  );
}
