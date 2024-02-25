import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Work_Sans } from "next/font/google";
import { auth } from "../auth";
import "./globals.css";

const sans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Netflix",
  description: "Figma Clone ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${sans.className} bg-primary-grey-200`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
