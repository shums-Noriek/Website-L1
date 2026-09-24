import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PostHogInit from "./PostHogInit";

/** One typeface across the whole site. */
const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noriek.com"),
  title: "Noriek — Luxury Interior Designers in Bangalore",
  description:
    "Noriek is a premier luxury interior design and build studio in Bangalore. From concept to completion, a tech-driven approach that brings together exceptional design, meticulous execution and refined craftsmanship.",
  openGraph: {
    title: "Noriek — Luxury Interior Designers in Bangalore",
    description:
      "A premier luxury interior design and build studio in Bangalore. Design, execution and craftsmanship, brought together.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <PostHogInit />
        {children}
      </body>
    </html>
  );
}
