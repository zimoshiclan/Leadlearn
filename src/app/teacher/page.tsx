"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarChart3, AlertTriangle, CheckCircle2, Bot, Share2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeacherPage() {
  const students = [
    { name: "Sara K.", readiness: 94, status: "Ready", color: "bg-success", avatar: "SK", avatarColor: "from-[#FFD700] to-[#ff8c00]" },
    { name: "Alex M.", readiness: 72, status: "Check in", color: "bg-warning", avatar: "AM", avatarColor: "from-[#6C63FF] to-[#FF6584]" },
    { name: "Morgan P.", readiness: 88, status: "Ready", color: "bg-success", avatar: "MP", avatarColor: "from-[#f093fb] to-[#f5576c]" },
    { name: "Blake W.", readiness: 22, status: "⚠️ At Risk", color: "bg-secondary", avatar: "BW", avatarColor: "from-[#ff6b6b] to-[#ee5a24]" },
    { name: "Taylor N.", readiness: 55, status: "Check in", color: "bg-warning", avatar: "TN", avatarColor: "from-[#4facfe] to-[#00f2fe]" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[240px] p-8 animate-in fade-in duration-500">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="page-title mb-1">Teacher Dashboard 📊</h1>
            <p className="text-muted-foreground text-sm">Grade 10B · Biology · Tomorrow 9:00 AM</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-border hover:border-primary">
              <Share2 className="w-4 h-4 mr-2" /> Export Report
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Settings className="w-4 h-4 mr-2" /> Assign Topics
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Artifacts Submitted", value: "18", icon: CheckCircle2, color: "text-success", bg: "stat-card-1", change: "↑ 75%" },
            { label: "At-Risk Students", value: "4", icon: AlertTriangle, color: "text-secondary", bg: "stat-card-2", change: "Flagged by AI" },
            { label: "Avg. Readiness", value: "72%", icon: BarChart3, color: "text-primary", bg: "stat-card-3", change: "↑ vs last class" },
            { label: "AI Quiz Attempts", value: "340", icon: Bot, color: "text-warning", bg: "stat-card-4", change: "↑ +40%" },
          ].map((stat) => (
            <Card key={stat.label} className={`relative overflow-hidden stat-card-gradient ${stat.bg} border-border bg-card`}>
              <CardContent className="pt-6">
                <stat.icon className={`w-6 h-6 ${stat.color} mb-4`} />
                <div className="font-headline text-4xl leading-none mb-1">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                <div className={`absolute top-4 right-4 text-[10px] px-2 py-0.5 rounded-full font-bold ${stat.change.includes('↑') ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                👥 Student Readiness Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {students.map((student) => (
                  <div key={student.name} className="flex items-center gap-4 py-1 border-b border-border/50 last:border-0">
                    <Avatar className={`w-8 h-8 bg-gradient-to-br ${student.avatarColor}`}>
                      <AvatarFallback className="text-white text-[10px] font-bold bg-transparent">
                        {student.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{student.name}</div>
                    </div>
                    <div className="flex-1 max-w-[120px]">
                      <Progress value={student.readiness} className="h-1.5" indicatorClassName={student.color} />
                    </div>
                    <div className="text-[11px] text-muted-foreground w-8 text-right">{student.readiness}%</div>
                    <Badge variant="outline" className={cn(
                      "text-[10px] px-2 py-0",
                      student.status.includes('⚠️') ? 'bg-secondary/10 text-secondary border-secondary/30' : 
                      student.status === 'Ready' ? 'bg-success/10 text-success border-success/30' : 'bg-warning/10 text-warning border-warning/30'
                    )}>
                      {student.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                  🤖 AI Insights for Tomorrow
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="p-3 bg-secondary/5 border border-secondary/20 rounded-lg text-xs leading-relaxed">
                  ⚠️ <strong>4 students</strong> haven't submitted artifacts. Consider a quick recap in the first 5 mins.
                </div>
                <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg text-xs leading-relaxed">
                  📊 Most common gap: <strong>DNA replication timing</strong>. 14/24 students are weak here — prepare a challenge question.
                </div>
                <div className="p-3 bg-success/5 border border-success/20 rounded-lg text-xs leading-relaxed">
                  ✅ Alex M. is well-prepared for Mitosis phases — let them anchor the discussion there.
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                  📅 Class Session Flow (AI-suggested)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 space-y-6 before:absolute before:left-[7px] before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-transparent">
                  {[
                    { time: "0:00–5:00", text: "Quick recap quiz (AI generates from common gaps)", current: true },
                    { time: "5:00–20:00", text: "Alex leads Mitosis presentation + Q&A", current: true },
                    { time: "20:00–30:00", text: "Peer group discussion — challenge questions", current: true },
                    { time: "30:00–40:00", text: "Teacher-led deep dive on DNA timing (flagged weak area)", current: false },
                  ].map((item, i) => (
                    <div key={i} className="relative">
                      <div className={cn(
                        "absolute -left-[23px] top-1 w-[10px] h-[10px] rounded-full border-2 border-background",
                        item.current ? "bg-primary" : "bg-muted"
                      )} />
                      <div className="text-[10px] font-code text-muted-foreground mb-1">{item.time}</div>
                      <div className="text-sm text-foreground/90">{item.text}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
