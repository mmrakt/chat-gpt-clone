import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AuthProvider from "@app/_components/providers/AuthProvider";
import IsOpenDialogOfRemoveChatProvider from "@app/_components/providers/IsOpenDialogOfRemoveChatProvider";
import IsOpenSideMenuProvider from "@app/_components/providers/IsOpenSideMenuProvider";
import QueryClientProvider from "@app/_components/providers/QueryClientProvider";
import ThemeProvider from "@app/_components/providers/ThemeProvider";
import "@app/_styles/global.css";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatGPT Clone",
  description: "ChatGPT Clone built with Next.js",
};

const DisableSsrWrapper = dynamic(
  () => import("@app/_components/elements/DisableSsrWrapper"),
  { ssr: false },
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const pathname = headers().get("x-pathname") || "";

  if (session) {
    if (pathname === "/signin") {
      redirect("/");
    }
  } else {
    if (pathname !== "/signin") {
      redirect("/signin");
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <QueryClientProvider>
              <IsOpenSideMenuProvider>
                <IsOpenDialogOfRemoveChatProvider>
                  <DisableSsrWrapper>{children}</DisableSsrWrapper>
                </IsOpenDialogOfRemoveChatProvider>
              </IsOpenSideMenuProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
