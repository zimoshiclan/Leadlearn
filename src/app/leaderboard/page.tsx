import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Flame, Brain, Mic2, Calendar } from "lucide-react";

export default function LeaderboardPage() {
  const topStudents = [
    { rank: 1, name: "Sara K.", meta: "Led 8 sessions", xp: "2,840 XP", color: "text-[#FFD700]", avatarColor: "from-[#FFD700] to-[#ff8c00]" },
    { rank: 2, name: "Jamie R.", meta: "Led 6 sessions", xp: "2,310 XP", color: "text-[#C0C0C0]", avatarColor: "from-[#a8edea] to-[#fed6e3]" },
    { rank: 3, name: "Alex M. (You)", meta: "Led 5 sessions", xp: "1,240 XP", color: "text-[#CD7F32]", avatarColor: "from-[#6C63FF] to-[#FF6584]", isSelf: true },
    { rank: 4, name: "Morgan P.", meta: "Led 4 sessions", xp: "1,100 XP", color: "text-muted", avatarColor: "from-[#f093fb] to-[#f5576c]" },
    { rank: 5, name: "Taylor N.", meta: "Led 3 sessions", xp: "980 XP", color: "text-muted", avatarColor: "from-[#4facfe] to-[#00f2fe]" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[240px] p-8 animate-in fade-in duration-500">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="page-title mb-1">Leaderboard 🏆</h1>
            <p className="text-muted-foreground text-sm">Top student-leaders this month</p>
          </div>
          <Button variant="outline" className="border-border">
            <Calendar className="w-4 h-4 mr-2" /> This Week ▾
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                🌟 Overall XP Rankings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {topStudents.map((student) => (
                  <div 
                    key={student.name} 
                    className={`flex items-center gap-4 p-4 border-b border-border/50 last:border-0 ${student.isSelf ? 'bg-primary/5' : ''}`}
                  >
                    <div className={`font-headline text-2xl w-8 text-center ${student.color}`}>{student.rank}</div>
                    <Avatar className={`w-10 h-10 bg-gradient-to-br ${student.avatarColor}`}>
                      <AvatarFallback className="text-white font-bold text-sm bg-transparent">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${student.isSelf ? 'text-primary' : ''}`}>{student.name}</div>
                      <div className="text-[10px] text-muted-foreground">{student.meta}</div>
                    </div>
                    <div className="font-code text-sm text-primary">{student.xp}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                  🎯 XP Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Leading a class session", xp: "+300 XP", color: "text-success" },
                  { label: "Submitting pre-class artifact", xp: "+150 XP", color: "text-success" },
                  { label: "Completing peer review", xp: "+100 XP", color: "text-success" },
                  { label: "AI quiz perfect score", xp: "+50 XP", color: "text-success" },
                  { label: "7-day streak bonus", xp: "+200 XP", color: "text-success" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center text-xs">
                    <span className="text-foreground/80">{item.label}</span>
                    <span className={`font-code ${item.color}`}>{item.xp}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                  🏅 Your Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Mic2, label: "Presenter", earned: true },
                    { icon: Flame, label: "On Fire", earned: true },
                    { icon: Brain, label: "Deep Diver", earned: true },
                    { icon: Trophy, label: "Lead 10x", earned: false },
                  ].map((badge) => (
                    <div 
                      key={badge.label} 
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border min-w-[70px] transition-all ${
                        badge.earned 
                          ? 'bg-accent/30 border-border' 
                          : 'bg-primary/5 border-dashed border-primary/40 opacity-50'
                      }`}
                    >
                      <badge.icon className={`w-7 h-7 mb-2 ${badge.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className={`text-[9px] font-bold uppercase tracking-wider ${badge.earned ? 'text-muted-foreground' : 'text-primary'}`}>
                        {badge.label}
                      </div>
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
