import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interactive Calendar | Premium Wall Calendar Experience",
  description:
    "A premium, interactive wall calendar with dynamic theming, date range selection, notes, and animated transitions. Built with Next.js, Tailwind CSS, and Framer Motion.",
  keywords: [
    "calendar",
    "interactive calendar",
    "date picker",
    "wall calendar",
    "Next.js",
    "React",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.className} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
