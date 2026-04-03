"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Flame, Mic2, Star, Plus, Play, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const stats = [
    { label: "Topics Assigned", value: "3", icon: BookOpen, color: "text-primary", bg: "stat-card-1", change: "This week" },
    { label: "Day Streak", value: "12", icon: Flame, color: "text-secondary", bg: "stat-card-2", change: "↑ +3" },
    { label: "Presentations Led", value: "5", icon: Mic2, color: "text-success", bg: "stat-card-3", change: "↑ Top 10%" },
    { label: "Peer Rating", value: "4.8", icon: Star, color: "text-warning", bg: "stat-card-4", change: "↑ +0.3" },
  ];

  const assignments = [
    { subject: "Biology", name: "Cell Division — Mitosis", role: "Lead Presenter", due: "Tomorrow", status: "urgent", icon: "🧬" },
    { subject: "Maths", name: "Quadratic Equations", role: "Peer Reviewer", due: "Thu", status: "soon", icon: "📐" },
    { subject: "Geography", name: "Climate Change Impacts", role: "Research Lead", due: "Next Week", status: "normal", icon: "🌍" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[240px] p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="page-title mb-1">Good Morning, Alex ⚡</h1>
            <p className="text-muted-foreground text-sm">You're presenting Biology tomorrow — you're 72% ready</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-border hover:border-primary">
              <Plus className="w-4 h-4 mr-2" /> Submit Artifact
            </Button>
            <Button className="bg-primary hover:bg-primary/90 shadow-[0_4px_16px_rgba(108,99,255,0.3)]">
              <Play className="w-4 h-4 mr-2 fill-current" /> Start Prep Session
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className={cn("relative overflow-hidden stat-card-gradient border-border bg-card hover:-translate-y-1 transition-transform", stat.bg)}>
              <CardContent className="pt-6">
                <stat.icon className={cn("w-6 h-6 mb-4", stat.color)} />
                <div className="font-headline text-4xl leading-none mb-1">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                <div className={cn(
                  "absolute top-4 right-4 text-[10px] px-2 py-0.5 rounded-full font-bold",
                  stat.change.includes('↑') ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                )}>
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                📋 Upcoming Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {assignments.map((item) => (
                <div key={item.name} className="flex items-center gap-4 p-3 bg-accent/30 border border-border rounded-xl hover:border-primary transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-accent/50">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium group-hover:text-primary transition-colors">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.subject} · {item.role}</div>
                  </div>
                  <Badge variant="secondary" className={cn(
                    "text-[10px] font-bold uppercase",
                    item.status === 'urgent' ? 'bg-secondary/10 text-secondary border-secondary/20' : 
                    item.status === 'soon' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-primary/10 text-primary border-primary/20'
                  )}>
                    {item.due}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                🔥 Prep Progress — Biology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Notes & Summary", val: 100, status: "✓ Done", color: "bg-success" },
                { label: "AI Quiz Practice", val: 60, status: "6/10 questions", color: "bg-warning" },
                { label: "Peer Artifact Submitted", val: 0, status: "Pending", color: "bg-secondary" },
                { label: "Discussion Questions", val: 60, status: "3/5", color: "bg-primary" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className={item.val === 100 ? "text-success" : item.val === 0 ? "text-secondary" : "text-foreground"}>
                      {item.status}
                    </span>
                  </div>
                  <Progress value={item.val} className="h-1.5" indicatorClassName={item.color} />
                </div>
              ))}
              <div className="mt-6 p-3 bg-secondary/5 border border-secondary/20 rounded-lg flex gap-3 items-start">
                <Bot className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <strong>AI Tip:</strong> You haven't submitted your peer artifact yet — this is 30% of your readiness score. Do it tonight!
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                📅 Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">Keep it going! 12 days straight 🔥</p>
              <div className="flex flex-wrap gap-2">
                {['M','T','W','T','F','S','S','M','T','W','T','F','S','S'].map((day, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-all",
                      i < 12 ? "bg-gradient-to-br from-primary to-secondary text-white border-transparent" : 
                      i === 12 ? "border-primary text-primary shadow-[0_0_10px_rgba(108,99,255,0.3)]" : "bg-accent border-border text-muted-foreground"
                    )}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                📣 Class Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 space-y-6 before:absolute before:left-[7px] before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-transparent">
                {[
                  { time: "2h ago", text: "Sara K. submitted peer review for your Biology notes ⭐ 4.5", done: true },
                  { time: "Yesterday", text: "You earned 250 XP for leading the Physics session", done: true },
                  { time: "Mon", text: "AI flagged a knowledge gap in Meiosis — review recommended", done: true },
                  { time: "Upcoming", text: "Biology presentation — 9:00 AM tomorrow", done: false },
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className={cn(
                      "absolute -left-[23px] top-1 w-[10px] h-[10px] rounded-full border-2 border-background",
                      item.done ? "bg-success" : "bg-muted"
                    )} />
                    <div className="text-[10px] font-code text-muted-foreground mb-1">{item.time}</div>
                    <div className="text-sm text-foreground/90">{item.text}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
