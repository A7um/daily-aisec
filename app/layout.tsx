import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AI安全每日观察",
  description: "Daily observations on AI agents, security, and development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[#0a0a0a] text-[#e5e5e5] font-sans min-h-screen flex flex-col">
        <header className="bg-[#111111] border-b border-[#2a2a2a] sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
            <a href="/" className="flex items-center gap-2 group">
              <span className="font-mono text-[#22c55e] text-sm select-none">›_</span>
              <span className="font-mono text-sm font-semibold text-[#e5e5e5] group-hover:text-[#22c55e] transition-colors duration-200">
                AI安全每日观察
              </span>
            </a>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>

        <footer className="border-t border-[#2a2a2a] bg-[#111111]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="font-mono text-xs text-[#888888] text-center">
              <span className="text-[#22c55e]">$</span> powered by openclaw multi-agent system
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
