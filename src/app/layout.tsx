import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import ParentContext from "@/context/ParentContext/ParentContext";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Specify desired weights
});

export const metadata: Metadata = {
  title: "Rupublik Food",
  description: "Rupublik resutrant for delisious burger in Egypt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link rel="icon" href={logo.src} /> */}
      </head>
      <body className={rubik.className}>
        <ParentContext>
          <Toaster position="top-right" />
          {/* Redux provider for all aplication */}

          <div className="w-full overflow-hidden">
            {/* Navbar component */}
            <NavBar />
            {/* pages of website */}
            <div className="min-h-screen pt-[128px] sm:pt-[96px] z-50  bg-mColor  bg-back">
              <div className="   pb-10 flex-grow relative ">{children}</div>
            </div>
            {/* Footer component */}
            <Footer />
          </div>
        </ParentContext>
      </body>
    </html>
  );
}
