"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Zap, 
  BookOpen, 
  Bot, 
  Users, 
  Trophy, 
  Target, 
  BarChart3,
  ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { section: "Student", items: [
    { name: "Dashboard", icon: Zap, href: "/" },
    { name: "My Topics", icon: BookOpen, href: "/topics", badge: 3 },
    { name: "AI Tutor", icon: Bot, href: "/ai-tutor", notif: true },
    { name: "Peer Review", icon: Users, href: "/peers", badge: 2 },
  ]},
  { section: "Classroom", items: [
    { name: "Leaderboard", icon: Trophy, href: "/leaderboard" },
    { name: "Class Sessions", icon: Target, href: "/sessions" },
  ]},
  { section: "Teacher", items: [
    { name: "Teacher View", icon: BarChart3, href: "/teacher" },
  ]}
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] bg-card border-r border-border h-screen flex flex-col fixed top-0 left-0 z-50">
      <div className="p-7 border-b border-border">
        <Link href="/" className="block">
          <div className="logo-text">LeadLearn</div>
          <div className="text-[10px] text-muted-foreground tracking-[3px] uppercase mt-1">Student-Led Platform</div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6">
        {navItems.map((section) => (
          <div key={section.section}>
            <div className="text-[10px] tracking-[2px] uppercase text-muted-foreground px-3 mb-2">
              {section.section}
            </div>
            <div className="flex flex-col gap-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all relative group",
                      isActive 
                        ? "bg-gradient-to-br from-primary/20 to-secondary/10 text-foreground border border-primary/30" 
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-primary rounded-r-sm" />
                    )}
                    <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground")} />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                    {item.notif && (
                      <div className="w-[7px] h-[7px] rounded-full bg-secondary ai-indicator-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3">
        <div className="bg-accent/50 border border-border p-3 rounded-xl flex items-center gap-3">
          <Avatar className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary">
            <AvatarFallback className="text-white font-bold text-xs bg-transparent">AM</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate">Alex M.</div>
            <div className="text-[10px] text-muted-foreground truncate">Grade 10 · 1,240 XP</div>
            <div className="mt-1.5 relative h-[3px] w-full bg-border rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary xp-fill-animate" 
                style={{ width: '68%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
