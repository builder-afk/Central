import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/ui/LenisProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Builder's Central — Property Marketing Infrastructure for Builders",
  description:
    "3D property tours, virtual staging, drone content, interactive floor plans, and analytics dashboards. The complete digital marketing toolkit for builders and real estate developers.",
  keywords: [
    "property marketing",
    "3D property tour",
    "virtual property tour",
    "real estate marketing",
    "builder marketing",
    "property visualization",
    "virtual staging",
    "drone property video",
    "real estate technology",
  ],
  openGraph: {
    title: "Builder's Central — Property Marketing Infrastructure",
    description:
      "3D tours, virtual staging, drone content, and analytics. The complete digital marketing toolkit for builders.",
    siteName: "Builder's Central",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen noise-overlay">
        <LenisProvider>
          {children}
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}
