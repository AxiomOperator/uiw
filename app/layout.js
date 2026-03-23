import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Iran War Cost Tracker — The Cost to Working Americans",
    template: "%s | Iran War Cost Tracker",
  },
  description:
    "A public accountability dashboard tracking the estimated financial cost of the Iran war to the American people, with a focus on employed U.S. adults.",
  openGraph: {
    title: "Iran War Cost Tracker",
    description:
      "How much is the Iran war costing working Americans? A data-forward public accountability dashboard.",
    type: "website",
    locale: "en_US",
  },
  metadataBase: new URL("https://iranwarcost.org"),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
