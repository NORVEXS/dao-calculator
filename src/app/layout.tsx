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
    "Convert Daylight Factor (DF) into Overcast Daylight Autonomy (DAo) and Continuous Overcast Daylight Autonomy (DAo.con) instantly. A premium scientific calculator with heatmaps, response curves and vertical-section analysis.",
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
  applicationName: "DAo Calculator",
  category: "science",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "DAo Calculator — Overcast Daylight Autonomy from Daylight Factor",
    description:
      "Convert DF into DAo and DAo.con instantly with scientific-grade visualizations.",
    siteName: "DAo Calculator",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DAo Calculator — Overcast Daylight Autonomy from the Daylight Factor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAo Calculator — Overcast Daylight Autonomy from Daylight Factor",
    description:
      "Convert Daylight Factor into Overcast Daylight Autonomy with scientific-grade visualizations.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} grain min-h-dvh antialiased`}
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
