import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "LearnSphere – AI-Powered ML Learning Assistant",
  description: "An intelligent learning companion for Machine Learning that adapts to different learning styles with multi-modal content generation including text, code, and visual learning.",
  keywords: "machine learning, AI, education, learning, ML, artificial intelligence, code generation, visual diagrams",
  openGraph: {
    title: "LearnSphere – AI-Powered ML Learning Assistant",
    description: "Multi-modal AI learning platform for Machine Learning concepts",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
