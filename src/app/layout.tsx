import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import { ThemeProvider } from "@/components/layouts/theme-provider";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/auth.context";

const inconsolata = Inconsolata({
  subsets: ["vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlashEase",
  description: "Simple to learn, easy to remember!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("text-lg", inconsolata.className)}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">
                <div className="py-16 sm:py-24">{children}</div>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
