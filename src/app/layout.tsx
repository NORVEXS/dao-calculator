import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/i18n/provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const SITE_URL = "https://dao-calculator.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DAo Calculator — Overcast Daylight Autonomy from Daylight Factor",
    template: "%s · DAo Calculator",
  },
  description:
    "Convierte el Factor de Luz Diurna (DF) en Autonomía Lumínica con cielo cubierto (DAo) y Autonomía Lumínica Continua (DAo.con) al instante. Una calculadora científica con mapas de calor, curvas de respuesta y análisis de secciones verticales.",
  keywords: [
    "Daylight Factor",
    "Overcast Daylight Autonomy",
    "DAo",
    "DAo.con",
    "daylighting",
    "daylight metrics",
    "building science",
    "CIE overcast sky",
    "Acosta",
    "Campano",
  ],
  authors: [{ name: "Based on the method by I. Acosta & M. A. Campano" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "DAo Calculator — Overcast Daylight Autonomy from Daylight Factor",
    description:
      "Convert DF into DAo and DAo.con instantly with scientific-grade visualizations.",
    siteName: "DAo Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "DAo Calculator",
    description: "Convert Daylight Factor into Overcast Daylight Autonomy.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1422" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} min-h-dvh antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Toaster richColors position="top-center" />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
