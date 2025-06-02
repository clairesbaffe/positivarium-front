import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { UserProvider } from "@/context/UserContext";

import { Nunito, Trochut } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunitoSans = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const trochutSans = Trochut({
  variable: "--font-trochut-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Le Positivarium",
  description: "Parce que le positif mérite d'être partagé",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    let user = null;

  try {
    user = await getCurrentUser();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    // Optionnel : redirect, throw, ou afficher un fallback plus bas
  }

  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${trochutSans.variable} antialiased`}
      >
        <UserProvider user={user}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <ToastContainer />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
