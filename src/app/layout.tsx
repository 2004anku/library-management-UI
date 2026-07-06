import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import GlobalLoader from "@/components/GlobalLoader/globalLoader";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
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
      <body
        className={`
    ${inter.variable}
    ${rajdhani.variable}
    min-h-full
    flex flex-col
  `}
      >
        <QueryProvider>
          <GlobalLoader />
          <Toaster position="top-right" />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
