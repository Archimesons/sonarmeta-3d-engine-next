import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "氦闪 - 专业且开源的Web端3D渲染器",
  description: "氦闪 - 一个专业且开源的Web端3D渲染器",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
