import { ConversationsProvider } from "@/context/ConversationContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen">
        <ConversationsProvider>{children}</ConversationsProvider>
      </body>
    </html>
  );
}
