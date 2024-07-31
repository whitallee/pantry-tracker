import type { Metadata } from "next";
import { Proza_Libre } from "next/font/google";
import "./globals.css";

const proza_libre = Proza_Libre({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Pantry Tracker",
  description: "Whit's pantry tracker to keep track of his pantry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={proza_libre.className}>{children}</body>
    </html>
  );
}
