import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haptic-Q: Surgeon Dashboard",
  description: "Haptic-Q: A high-precision Synchronized Real-Time Feedback Dashboard for Remote Robotic Surgery, featuring synchronized tele-robotic control and secure feedback mechanisms for surgeons.",
  openGraph: {
    title: "Haptic-Q: Surgeon Dashboard",
    description: "Haptic-Q: A high-precision Synchronized Real-Time Feedback Dashboard for Remote Robotic Surgery, featuring synchronized tele-robotic control and secure feedback mechanisms for surgeons.",
    url: "https://remote-assisted-surgery.pages.dev/",
    siteName: "Haptic-Q Surgeon Dashboard",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haptic-Q: Surgeon Dashboard",
    description: "Secure Tele-Robotic Surgery Console with Real-Time Haptic Feedback.",
    images: ["/og-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Haptic-Q: Surgeon Dashboard</title>
        <meta name="description" content="Haptic-Q: A high-precision Synchronized Real-Time Feedback Dashboard for Remote Robotic Surgery, featuring synchronized tele-robotic control and secure feedback mechanisms for surgeons." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://remote-assisted-surgery.pages.dev/" />
        <meta property="og:title" content="Haptic-Q: Surgeon Dashboard" />
        <meta property="og:description" content="Haptic-Q: A high-precision Synchronized Real-Time Feedback Dashboard for Remote Robotic Surgery, featuring synchronized tele-robotic control and secure feedback mechanisms for surgeons." />
        <meta property="og:image" content="https://remote-assisted-surgery.pages.dev/og-preview.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://remote-assisted-surgery.pages.dev/" />
        <meta property="twitter:title" content="Haptic-Q: Surgeon Dashboard" />
        <meta property="twitter:description" content="Haptic-Q: A high-precision Synchronized Real-Time Feedback Dashboard for Remote Robotic Surgery, featuring synchronized tele-robotic control and secure feedback mechanisms for surgeons." />
        <meta property="twitter:image" content="https://remote-assisted-surgery.pages.dev/og-preview.png" />

        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
