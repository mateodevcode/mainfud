import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import { Delius_Swash_Caps, Spicy_Rice } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { DonaCeciProvider } from "@/context/DonaCeciContext";
import { AuthProvider } from "./Providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto_mono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});
// Nuevas fuentes
const deliusSwashCaps = Delius_Swash_Caps({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-delius-swash-caps",
});

const spicyRice = Spicy_Rice({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-spicy-rice",
});

export const metadata = {
  title: "Doña Ceci",
  description: "Empanadas artesanales🥟",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Google Maps JS API con Web Components */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&callback=console.debug&libraries=maps,marker&v=beta`}
          strategy="afterInteractive"
          async
        />
      </head>
      <body
        className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        ${roboto_mono.variable}
        ${deliusSwashCaps.variable}
        ${spicyRice.variable}
      `}
      >
        <AuthProvider>
          <DonaCeciProvider>
            {children}

            <Toaster />
          </DonaCeciProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
