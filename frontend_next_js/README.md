This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tic Tac Toe – Ocean Professional

A modern, accessible Tic Tac Toe game with a clean Ocean Professional theme.

### Features
- Local two-player game with alternating X/O turns
- 3x3 responsive, square board
- Winner detection with winning-line highlight
- Draw detection
- Status area: Next player / Winner / Draw
- Controls: Restart, Undo (optional)
- Keyboard accessible squares with visible focus rings
- No external services or environment variables required

### Project Structure (relevant parts)
- `src/app/page.tsx` – renders the game page
- `src/components/Game.tsx` – main game container and state
- `src/components/Square.tsx` – accessible square button
- `src/lib/gameUtils.ts` – pure helpers (`calculateWinner`, `isDraw`, `getNextPlayer`)
- `src/app/globals.css` – global styles and theme vars

### Getting Started
Run the development server:
```bash
npm install
npm run dev
```

Open http://localhost:3000 to play.

### Notes
- Built with Next.js App Router and Tailwind CSS utilities.
- No secrets or external APIs used.
