import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import ThemeProvider from "./components/providers/ThemeProvider";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import AuthProvider from "./components/providers/AuthProvider";
import QueryClientProvider from "./components/providers/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatGPT Clone",
  description: "ChatGPT Clone built with Next.js",
};

const DisableSsrWrapper = dynamic(
  () => import("./components/DisableSsrWrapper"),
  { ssr: false },
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <QueryClientProvider>
              <Suspense fallback="">
                <DisableSsrWrapper>{children}</DisableSsrWrapper>
              </Suspense>
            </QueryClientProvider>
          </ThemeProvider>
        </AuthProvider>
        <aside className=""></aside>
      </body>
    </html>
  );
}
