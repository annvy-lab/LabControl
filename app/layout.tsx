import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "LabControl",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} antialiased bg-[var(--background)]`}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            success: { duration: 4000 },
            error: { duration: 2000 },
          }}
        />
        {children}
      </body>
    </html>
  );
}
