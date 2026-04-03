import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Manhattan Fish & Chicken — Fresh Fish Market & Carry-Out Restaurant | Metro Detroit",
    template: "%s | Manhattan Fish & Chicken",
  },
  description:
    "Manhattan Fish & Chicken: Fresh fish market and carry-out restaurant with 7 locations in Metro Detroit. Fresh fish, poultry, seafood, chicken wings, shrimp, family meals & more. Open daily including all holidays!",
  keywords: [
    "Manhattan Fish and Chicken",
    "fish market Detroit",
    "carry out restaurant Detroit",
    "fresh fish Detroit",
    "chicken wings Detroit",
    "seafood Detroit",
    "fish plates",
    "fried fish near me",
    "Manhattan fish chicken menu",
  ],
  metadataBase: new URL("https://www.manhattanchicken.com"),
  openGraph: {
    title: "Manhattan Fish & Chicken — Fresh Fish Market & Carry-Out Restaurant",
    description:
      "Fresh fish, poultry & seafood market plus hot carry-out favorites. 7 locations across Metro Detroit. Open daily including all holidays!",
    url: "https://www.manhattanchicken.com",
    siteName: "Manhattan Fish & Chicken",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manhattan Fish & Chicken — Fresh Fish Market & Carry-Out",
    description:
      "Fresh fish market and carry-out restaurant. 7 Metro Detroit locations. Fish plates, chicken wings, shrimp, family meals & more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.manhattanchicken.com",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#1a1a1a]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EJX6L494V0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EJX6L494V0');
          `}
        </Script>
      </body>
    </html>
  );
}
