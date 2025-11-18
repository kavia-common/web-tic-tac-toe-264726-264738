"use client";

import React from "react";

export type SquareValue = "X" | "O" | null;

export interface SquareProps {
  index: number;
  value: SquareValue;
  onClick: (index: number) => void;
  isWinning?: boolean;
  disabled?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * Square
 * A focusable, accessible button representing a single Tic Tac Toe cell.
 */
export default function Square({
  index,
  value,
  onClick,
  isWinning = false,
  disabled = false,
}: SquareProps) {
  const label = value
    ? `Square ${index + 1}, ${value}`
    : `Square ${index + 1}, empty`;

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={!!value}
      onClick={() => onClick(index)}
      disabled={disabled || !!value}
      className={[
        "flex items-center justify-center",
        "rounded-lg border transition-colors duration-200",
        "text-3xl font-semibold select-none focus:outline-none",
        "h-full w-full",
        "bg-white border-gray-200 hover:border-blue-400 active:scale-[0.99]",
        "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        isWinning ? "bg-blue-50 border-blue-400" : "",
        disabled || value ? "cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
      data-testid={`square-${index}`}
    >
      <span
        className={[
          "transition-colors duration-200",
          value === "X" ? "text-blue-600" : "",
          value === "O" ? "text-amber-600" : "",
        ].join(" ")}
      >
        {value}
      </span>
    </button>
  );
}
