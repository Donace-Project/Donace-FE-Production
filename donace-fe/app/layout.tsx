"use client";

import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src='https://cdn.jsdelivr.net/npm/@goongmaps/goong-js/dist/goong-js.js'></script>
        <link href='https://cdn.jsdelivr.net/npm/@goongmaps/goong-js/dist/goong-js.css' rel='stylesheet' />
        <script src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-geocoder@1.1.1/dist/goong-geocoder.min.js"></script>
        <link
          href="https://cdn.jsdelivr.net/npm/@goongmaps/goong-geocoder@1.1.1/dist/goong-geocoder.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
        <title>Donace Event</title>
      </head>
      <body

        className={clsx(
          "min-h-screen  bg-gradient-to-tr from-[rgba(254,178,178,0.8)] via-[rgba(251,211,141,0.8)] to-[rgba(246,173,199,0.8)] dark:from-[#2d3748] dark:via-[#2c7a7b] dark:to-[#ff9233] font-sans antialiased transition-colors duration-300 ease-in-out",
          fontSans.variable
        )}
      >
        <SessionProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col">
              <main className="container max-w-full mx-auto">{children}</main>
            </div>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
