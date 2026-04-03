
"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, PlayCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SessionsPage() {
  const sessions = [
    { id: 1, title: "Cell Division: Mitosis vs Meiosis", leader: "Alex M. (You)", time: "Tomorrow, 09:00 AM", status: "preparing", icon: "🧬" },
    { id: 2, title: "Climate Change & Geopolitics", leader: "Sara K.", time: "Thu, 11:30 AM", status: "upcoming", icon: "🌍" },
    { id: 3, title: "Quadratic Equation Mastery", leader: "Jamie R.", time: "Fri, 10:15 AM", status: "upcoming", icon: "📐" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[240px] p-8 animate-in fade-in duration-500">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="page-title mb-1">Class Sessions 📅</h1>
            <p className="text-muted-foreground text-sm">Upcoming student-led learning events</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Calendar className="w-4 h-4 mr-2" /> Book Slot
          </Button>
        </header>

        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                Upcoming Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 bg-accent/30 border border-border rounded-2xl hover:border-primary/50 transition-all group">
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-3xl shrink-0">
                    {session.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{session.title}</h3>
                      <Badge variant="outline" className={cn(
                        "text-[9px] uppercase font-bold",
                        session.status === 'preparing' ? 'bg-primary/10 text-primary border-primary/30' : 'bg-success/10 text-success border-success/30'
                      )}>
                        {session.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Led by {session.leader}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {session.time}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Room 304 / Zoom</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs">View Artifacts</Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs">
                      <PlayCircle className="w-3.5 h-3.5 mr-1.5" /> Join Session
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                  🏫 Session Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Session Hosting Guide for Students",
                  "Effective Q&A Techniques",
                  "Artifact Submission Template",
                ].map((item) => (
                  <div key={item} className="p-3 bg-accent/10 border border-border rounded-xl text-xs flex items-center justify-between hover:bg-accent/20 cursor-pointer">
                    <span>{item}</span>
                    <Badge variant="outline" className="text-[8px]">PDF</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                  📣 Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-foreground/80 p-3 bg-secondary/5 border border-secondary/20 rounded-xl">
                  <strong>Reminder:</strong> Please submit your discussion questions at least 12 hours before leading your session.
                </div>
                <div className="text-xs text-foreground/80 p-3 bg-primary/5 border border-primary/20 rounded-xl">
                  New reward badge "Master Facilitator" added for leading 5+ peer sessions with high ratings!
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
