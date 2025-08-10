import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
  chat,
}: Readonly<{
  children: React.ReactNode;
  chat: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      {children}
      <SidebarInset>{chat}</SidebarInset>
    </SidebarProvider>
  );
}
