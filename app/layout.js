import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Biter Bar",
  description: "Menu de productos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
