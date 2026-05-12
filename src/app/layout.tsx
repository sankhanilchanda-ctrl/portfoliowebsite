import type { Metadata } from "next";
import { Cormorant_Garamond, Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // DM_Sans Google Font 300 might be substituted to 400 or available via range. Using standard.
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "Sankhanil Chanda — CA Aspirant | Financial Applications",
  description: "Portfolio of Sankhanil Chanda — Chartered Accountant Aspirant. Expertise in Accounting, Taxation, Financial Analysis, and Consulting.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231E3A26"/><text x="50" y="65" font-family="serif" font-weight="700" font-size="50" fill="%23F8F5EC" text-anchor="middle">SC</text></svg>',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased selection-sage bg-cream text-trueblack min-h-screen flex flex-col">
        <ScrollProgress />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
