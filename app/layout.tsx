import React from "react";
import "../globals.css";

export const metadata = {
  title: "BAEKSA",
  description: "BAEKSA 파티 페이지"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}