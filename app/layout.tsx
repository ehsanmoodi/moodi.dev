import { Metadata } from "next";

import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Moodi.dev",
  description:
    "My Name is Ehsan Moodi. I am a front-end developer. Welcome to my personal page.",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
