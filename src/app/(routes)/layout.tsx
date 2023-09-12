import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import AuthProvider from "@app/_components/providers/AuthProvider";
import IsOpenSideMenuProvider from "@app/_components/providers/IsOpenSideMenuProvider";
import QueryClientProvider from "@app/_components/providers/QueryClientProvider";
import ThemeProvider from "@app/_components/providers/ThemeProvider";
import "@app/_styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatGPT Clone",
  description: "ChatGPT Clone built with Next.js",
};

const DisableSsrWrapper = dynamic(
  () => import("@app/_components/elements/DisableSsrWrapper"),
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
              <IsOpenSideMenuProvider>
                <Suspense fallback="">
                  <DisableSsrWrapper>{children}</DisableSsrWrapper>
                </Suspense>
              </IsOpenSideMenuProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </AuthProvider>
        <aside className=""></aside>
      </body>
    </html>
  );
}
