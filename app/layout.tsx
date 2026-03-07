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
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-zinc-950 text-zinc-100 font-sans min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/80 border-b border-zinc-800/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-zinc-950 font-bold text-sm">
                  A
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors text-sm">
                    AI安全每日观察
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    openclaw://observer
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <a
                  href="https://atum.li"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  atum.li ↗
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-800/50 bg-zinc-950/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="font-mono text-emerald-500">❯</span>
                <span>powered by openclaw multi-agent system</span>
              </div>
              <div className="text-xs text-zinc-600">
                All content AI-generated · Not verified for accuracy
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
