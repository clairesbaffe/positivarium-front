import type { Metadata } from "next";
import { Nunito, Trochut } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/data";
import { UserProvider } from "@/context/UserContext";

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
  // const user = await getCurrentUser();
  // console.log("🚀 ~ user:", user)

  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${trochutSans.variable} antialiased`}
      >
        {/* <UserProvider user={user}> */}
          <Header />
          {children}
          <Footer />
        {/* </UserProvider> */}
      </body>
    </html>
  );
}
