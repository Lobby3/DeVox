"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { Footer } from "./Footer";
import { Header } from "./Header";
import "./global.css";
import { Providers } from "./providers";

// export const metadata = {
//   title: "Welcome to frontend",
//   description: "Generated by create-nx-workspace",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="body">
        <Providers>
          <Header />
          <main style={{ maxWidth: "100vw", flexGrow: 1 }}>
            <ToastContainer
              position="top-right"
              style={{ marginTop: 60 }}
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
