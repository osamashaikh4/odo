import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from "@/components/common/ReactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--poppins",
  weight: ["300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Order and Shipping Management",
  description: "Manage your orders and shipments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Providers>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </Providers>
        <ToastContainer position="top-right" hideProgressBar />
      </body>
    </html>
  );
}
