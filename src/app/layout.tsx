import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import ThemeProvider from "./components/providers/ThemeProvider";
import { Suspense } from "react";
import IsPromptedProvider from "./components/providers/IsPromptedProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatGPT Clone",
  description: "ChatGPT Clone built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {/* <IsPromptedProvider> */}
          <Suspense fallback="">
            <main className="h-screen bg-white text-gray-200 dark:bg-gray-400 dark:text-white ">
              {children}
            </main>
          </Suspense>
          {/* </IsPromptedProvider> */}
        </ThemeProvider>
        <aside className=""></aside>
      </body>
    </html>
  );
}
