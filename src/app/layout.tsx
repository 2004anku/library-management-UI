import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalLoader from "@/components/globalLoader/globalLoader";
const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookHub",
  description: "Library Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <GlobalLoader />
        {children}
      </body>
    </html>
  );
}
