import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Triple W Rentals — Luxury RV Rentals · Tyler, Texas",
  description:
    "Luxury RV rentals delivered and set up for you across Tyler, Dallas, Houston, and Austin. Call (972) 965-6901. Open 24/7.",
  keywords:
    "RV rental Tyler Texas, luxury RV rental East Texas, RV delivery Texas, Triple W Rentals",
  openGraph: {
    title: "Triple W Rentals — Luxury RV Rentals · Tyler, Texas",
    description:
      "Luxury RVs delivered, set up, and ready to walk into. Tyler, Dallas, Houston, Austin.",
    url: "https://triplewrentals.com",
    siteName: "Triple W Rentals",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
