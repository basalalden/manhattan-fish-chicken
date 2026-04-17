import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  verification: {
    other: { "msvalidate.01": "6FA8E5909E9421CA66F9A620157F9FC8" },
  },
  title: {
    default: "Manhattan Fish & Chicken — Fresh Fish, Poultry & Seafood Market | Metro Detroit",
    template: "%s | Manhattan Fish & Chicken",
  },
  description:
    "Manhattan Fish & Chicken: Fresh fish, poultry & seafood market. Buy it raw or we'll fry it for you. 7 locations in Metro Detroit. Open daily including all holidays!",
  keywords: [
    "Manhattan Fish and Chicken",
    "fish market Detroit",
    "fish market Detroit",
    "fresh fish Detroit",
    "chicken wings Detroit",
    "seafood Detroit",
    "fish plates",
    "fried fish near me",
    "Manhattan fish chicken menu",
  ],
  metadataBase: new URL("https://www.manhattanchicken.com"),
  openGraph: {
    title: "Manhattan Fish & Chicken — Fresh Fish, Poultry & Seafood Market",
    description:
      "Fresh fish, poultry & seafood market plus hot carry-out favorites. 7 locations across Metro Detroit. Open daily including all holidays!",
    url: "https://www.manhattanchicken.com",
    siteName: "Manhattan Fish & Chicken",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manhattan Fish & Chicken — Fresh Fish, Poultry & Seafood Market",
    description:
      "Fresh fish, poultry & seafood market. 7 Metro Detroit locations. Fish, chicken, shrimp, family meals & more.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
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
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w64prv5vdz");
          `}
        </Script>
      </body>
    </html>
  );
}
