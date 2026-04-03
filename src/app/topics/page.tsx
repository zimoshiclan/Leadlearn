import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TopicsPage() {
  const topics = [
    { name: "Cell Division — Mitosis", subject: "Biology", due: "Tomorrow", role: "🎤 You're presenting", val: 72, color: "bg-gradient-to-r from-primary to-secondary", status: "leader" },
    { name: "Quadratic Equations", subject: "Mathematics", due: "Thursday", role: "👀 Peer Reviewer", val: 30, color: "bg-warning", status: "prep" },
    { name: "Climate Change Impacts", subject: "Geography", due: "Next Week", role: "📝 Research Lead", val: 15, color: "bg-gradient-to-r from-secondary to-warning", status: "prep" },
    { name: "Periodic Table Trends", subject: "Chemistry", due: "Completed", role: "✓ Completed", val: 100, color: "bg-success", status: "done", rating: "4.7 ⭐" },
    { name: "WWI Causes & Effects", subject: "History", due: "Completed", role: "✓ Completed", val: 100, color: "bg-success", status: "done", rating: "4.9 ⭐" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[240px] p-8 animate-in fade-in duration-500">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="page-title mb-1">My Topics</h1>
            <p className="text-muted-foreground text-sm">3 active assignments this week</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" /> New Research
          </Button>
        </header>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-accent border border-border p-1 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg px-6">All</TabsTrigger>
            <TabsTrigger value="leading" className="rounded-lg px-6">Leading</TabsTrigger>
            <TabsTrigger value="reviewing" className="rounded-lg px-6">Reviewing</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-lg px-6">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, i) => (
            <Card key={topic.name} className="bg-card border-border hover:border-primary transition-all cursor-pointer hover:-translate-y-1 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-[0.03] transition-opacity" />
              <CardContent className="pt-6 relative z-10">
                <div className="text-3xl mb-4">
                  {topic.subject === "Biology" ? "🧬" : topic.subject === "Mathematics" ? "📐" : topic.subject === "Geography" ? "🌍" : topic.subject === "Chemistry" ? "⚗️" : "📜"}
                </div>
                <div className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{topic.name}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4">{topic.subject} · Due {topic.due}</div>
                
                <Badge variant="outline" className={cn(
                  "text-[9px] font-bold uppercase py-0.5",
                  topic.status === 'leader' ? 'bg-primary/10 text-primary border-primary/20' : 
                  topic.status === 'prep' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-success/10 text-success border-success/20'
                )}>
                  {topic.role}
                </Badge>

                <div className="mt-6">
                  <Progress value={topic.val} className="h-1.5" indicatorClassName={topic.color} />
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground">Preparation</span>
                    <span className={cn("text-[10px] font-bold", topic.val === 100 ? "text-success" : "text-foreground")}>
                      {topic.val === 100 ? `Rated ${topic.rating} by peers` : `${topic.val}% ready`}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="bg-card border-border border-dashed hover:border-primary transition-all cursor-pointer flex items-center justify-center p-8 group">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                <Plus className="w-5 h-5" />
              </div>
              <div className="text-sm font-medium text-muted-foreground group-hover:text-primary">Start New Research</div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
