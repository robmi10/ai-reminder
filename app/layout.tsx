import Provider from "./_trpc/provider";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'


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
        </html>
      </Provider>
    </ClerkProvider>
  );
}
