import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

const miniAppEmbed = JSON.stringify({
  version: "1",
  imageUrl: "https://chresoqa.vercel.app/logo.png",
  button: {
    title: "Register for Events",
    action: {
      type: "launch_miniapp",
      name: "CampusQA",
      url: "https://chresoqa.vercel.app",
      splashImageUrl: "https://chresoqa.vercel.app/logo.png",
      splashBackgroundColor: "#00A65A",
    },
  },
});

const frameEmbed = JSON.stringify({
  version: "1",
  imageUrl: "https://chresoqa.vercel.app/logo.png",
  button: {
    title: "Register for Events",
    action: {
      type: "launch_frame",
      name: "CampusQA",
      url: "https://chresoqa.vercel.app",
      splashImageUrl: "https://chresoqa.vercel.app/logo.png",
      splashBackgroundColor: "#00A65A",
    },
  },
});

export const metadata: Metadata = {
  title: "CampusQA — Event Registration",
  description: "Register for campus events: Orientations, Tutorials, and Live Q&As. Built for students, powered by modern tech.",
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "fc:miniapp": miniAppEmbed,
    "fc:frame": frameEmbed,
    "base:app_id": "69a6041ba0fdf68983d307c1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
