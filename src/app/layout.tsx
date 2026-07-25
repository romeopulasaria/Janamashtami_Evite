import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const greatVibes = Great_Vibes({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Shri Thakurji's 25th Birthday | Silver Jubilee Janmashtami Mahotsav",
  description: "Divine invitation microsite for Shri Thakurji's 25th Birthday Silver Jubilee Janmashtami Mahotsav, hosted by the Kumar Family on 29 August.",
  keywords: ["Shri Thakurji", "Janmashtami Mahotsav", "Silver Jubilee", "Krishna Birthday", "Divine Invitation"],
  openGraph: {
    title: "Shri Thakurji's 25th Birthday Silver Jubilee Janmashtami Mahotsav",
    description: "The Kumar Family lovingly invites you to celebrate Shri Thakurji's 25th Birthday Mahotsav.",
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
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-emerald-50 text-emerald-950 selection:bg-emerald-200 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
