import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    default: "MyTots – Journal your thoughts.",
    template: "%s | MyTots",
  },
  description:
    "MyTots is a journaling network where you can write personal entries, read others' journals, and connect through shared experiences.",
  keywords: [
    "journal",
    "diary",
    "thoughts",
    "journaling network",
    "personal stories",
    "write online",
    "digital diary",
  ],
  authors: [{ name: "MyTots Team" }],
  creator: "MyTots",
  openGraph: {
    title: "MyTots – Share Your Thoughts",
    description:
      "Join MyTots, a journaling community where your stories connect you with others.",
    url: "https://MyTots.vercel.app",
    siteName: "MyTots",
    images: [
      {
        url: "https://mytots.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "MyTots Journaling Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Italiana&family=Italianno&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
