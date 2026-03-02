import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

const miniAppEmbed = JSON.stringify({
  version: "1",
  imageUrl: "https://e-campusqa.vercel.app/logo.png",
  button: {
    title: "Register for Events",
    action: {
      type: "launch_miniapp",
      name: "CampusQA",
      url: "https://e-campusqa.vercel.app",
      splashImageUrl: "https://e-campusqa.vercel.app/logo.png",
      splashBackgroundColor: "#00A65A",
    },
  },
});

const frameEmbed = JSON.stringify({
  version: "1",
  imageUrl: "https://e-campusqa.vercel.app/logo.png",
  button: {
    title: "Register for Events",
    action: {
      type: "launch_frame",
      name: "CampusQA",
      url: "https://e-campusqa.vercel.app",
      splashImageUrl: "https://e-campusqa.vercel.app/logo.png",
      splashBackgroundColor: "#00A65A",
    },
  },
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "CampusQA — Event Registration",
    description: "Register for campus events: Orientations, Tutorials, and Live Q&As. Built for students, powered by modern tech.",
    icons: {
      icon: "/favicon.ico",
    },
    other: {
      "fc:miniapp": JSON.stringify({
        version: 'next',
        imageUrl: 'https://e-campusqa.vercel.app/logo.png',
        button: {
          title: `Launch E-CampusQA`,
          action: {
            type: 'launch_miniapp',
            name: 'E-CampusQA',
            url: 'https://e-campusqa.vercel.app',
            splashImageUrl: 'https://e-campusqa.vercel.app/logo.png',
            splashBackgroundColor: '#000000',
          },
        },
      }),
      "fc:frame": frameEmbed,
      "base:app_id": "69a6041ba0fdf68983d307c1",
    },
  };
}

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
