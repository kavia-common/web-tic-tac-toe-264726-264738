import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tic Tac Toe – Ocean Professional",
  description: "Play a modern, responsive Tic Tac Toe game in your browser.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
