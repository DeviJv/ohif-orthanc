import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { TaskProvider } from "@/context/task-context";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quantum PACS",
  description: "Medical Imaging Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('quantum-pacs-theme') || 'system';
                  const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  document.documentElement.classList.toggle('dark', dark);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader color="hsl(var(--primary))" showSpinner={false} height={3} crawlSpeed={50} speed={200} shadow="0 0 10px hsl(var(--primary)),0 0 5px hsl(var(--primary))" />
        <ThemeProvider>
          <TaskProvider>
            <TooltipProvider>
              {children}
              <Toaster 
                position="top-right" 
                toastOptions={{
                  classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
                    cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                  },
                }}
              />
            </TooltipProvider>
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
