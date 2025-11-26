import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { I18nProvider } from "./components/i18n-provider";
import { RightSidebarMenu } from "./components/RightSidebarMenu";
import Script from "next/script";
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevCambo",
  description: "A learning platform for web developers.",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <head>
        {/* <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" /> */}
      </head>
      <body className={inter.className}>
        <I18nProvider locale={params.locale} namespaces={["common"]}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 ">{children}</main>
            <Footer />
            <RightSidebarMenu />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}