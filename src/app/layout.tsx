import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CREATE STUDIO | Premium Architectural Design Studio",
  description:
    "An immersive, Awwwards-level creative portfolio showcasing advanced design paradigms, typography, and interactive spatial engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-background text-foreground overflow-x-hidden cursor-none">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
