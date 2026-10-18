import type { Metadata } from "next";
import { Raleway, Inter } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alpine Overland | Sandy, UT",
  description: "Find your dream overland vehicle at Alpine Overland in Sandy, Utah. Specializing in trucks, SUVs, and luxury off-road vehicles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${raleway.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
