import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { ConditionalFooter } from "@/components/conditional-footer";
import { Providers } from "@/app/providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlintAi — Plugin marketplace on Solana",
  description:
    "Browse and publish OpenClaw plugins with pricing, installs, and usage on Solana.",
  icons: {
    icon: [{ url: "/orbit-icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-sw-fg">
        <Providers>
          <div className="flex min-h-full flex-1 flex-col">
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            <ConditionalFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
