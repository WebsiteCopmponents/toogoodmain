import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const galnoy = localFont({
  src: "../public/fonts/Galnoy/Galnoy-BoldDisplay.otf",
  variable: "--font-galnoy",
  display: "swap",
  weight: "700",
});

const sortsMill = localFont({
  src: [
    {
      path: "../public/fonts/sorts-mill/webfonts/GoudyStM-webfont.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/sorts-mill/webfonts/GoudyStM-Italic-webfont.woff",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-sorts-mill",
  display: "swap",
});

const circular = localFont({
  src: [
    {
      path: "../public/fonts/circular -body-font/lineto-circular-bold.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/circular -body-font/lineto-circular-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-circular",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TooGood.agency",
  description:
    "A UK online studio for web design, mobile, custom dashboards, and UI/UX.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${galnoy.variable} ${circular.variable} ${sortsMill.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
