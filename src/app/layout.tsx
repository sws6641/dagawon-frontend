import React, { ReactNode } from "react";
import Provider from "@components/common/Provider";
import "@styles/globals.css";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
    <head></head>
    <body>
    <Provider>
      <div id="app">
        {children}
      </div>
      <div id="portal" />
    </Provider>
    </body>
    </html>
  );
}
