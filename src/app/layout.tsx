import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TTWL VOCA",
  description: "The things we learned - Toeic Note",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
