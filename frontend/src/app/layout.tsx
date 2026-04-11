import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LiveChat from "@/components/shared/LiveChat";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "NrityaVaani | Real-Time Mudra Recognition",
  description: "Advanced platform for Bharatanatyam mudra recognition and classical dance training.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased bg-background text-foreground selection:bg-primary/30 selection:text-primary min-h-screen">
        <div className="mesh-gradient" />
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
          <Footer />
          <LiveChat />
          <Toaster position="bottom-right" theme="dark" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
