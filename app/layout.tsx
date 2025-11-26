import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { I18nProvider } from "./components/i18n-provider";
import { RightSidebarMenu } from "./components/RightSidebarMenu";
import Script from "next/script";
import './globals.css';
import { AuthProvider } from "./contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });
const hanuman = localFont({
  src: [
    {
      path: "../public/fonts/Hanuman-Regular.ttf",
      weight: "400",
      style: "normal",
    },
      {
      path: "../public/fonts/Hanuman-bold.ttf",
      weight: "700",
      style: "normal",
    }
  ],
  variable: "--font-hanuman",
});

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
      <body className={hanuman.className}>
        <I18nProvider locale={params.locale} namespaces={["common"]}>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 ">{children}</main>
              <Footer />
              <RightSidebarMenu />
            </div>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}