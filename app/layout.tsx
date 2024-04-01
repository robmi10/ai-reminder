import { Toaster } from "@/components/ui/toaster";
import Provider from "./_trpc/provider";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Footer from "./components/footer/footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Provider>
        <html lang="en">
          <body>{children}</body>
          <Footer />
        </html>
      </Provider>
    </ClerkProvider>
  );
}
