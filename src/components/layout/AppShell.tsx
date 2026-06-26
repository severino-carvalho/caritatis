import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { RightRail } from "./RightRail";
import { BottomNav } from "./BottomNav";

interface Props {
  children: ReactNode;
  rightRail?: boolean;
  sidebar?: boolean;
}

export function AppShell({ children, rightRail = true, sidebar = true }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="mx-auto flex max-w-[1280px] gap-6 px-4 pb-24 pt-6 md:px-6 lg:pb-10">
        {sidebar && <Sidebar />}
        <main className="min-w-0 flex-1">{children}</main>
        {rightRail && <RightRail />}
      </div>
      <BottomNav />
    </div>
  );
}
