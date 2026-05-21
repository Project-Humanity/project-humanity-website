import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Humanity",
  description:
    "An open source community for people who want to build something worth being part of. Building things that make life better, in the open.",
};

export const viewport: Viewport = {
  themeColor: "#060606",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <div className="dot-grid" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
        <SmoothScroll />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
