
"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Star, Clock, CheckCircle2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PeerReviewPage() {
  const pendingReviews = [
    { id: 1, name: "Jamie R.", topic: "Quantum Mechanics Intro", due: "2h left", type: "Artifact Review" },
    { id: 2, name: "Sara K.", topic: "Photosynthesis Deep Dive", due: "Tomorrow", type: "Presentation Prep" },
  ];

  const receivedFeedback = [
    { id: 1, from: "Morgan P.", rating: 4.8, comment: "Alex, your explanation of mitosis was super clear! Maybe add more diagrams for meiosis next time.", topic: "Biology" },
    { id: 2, from: "Blake W.", rating: 4.5, comment: "Great engagement during the Q&A. Really helped me understand the differences.", topic: "Biology" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[240px] p-8 animate-in fade-in duration-500">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="page-title mb-1">Peer Review 👥</h1>
            <p className="text-muted-foreground text-sm">Collaborative learning through constructive feedback</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Users className="w-4 h-4 mr-2" /> Request Review
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-4 h-4 text-warning" /> Pending Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {pendingReviews.map((review) => (
                <div key={review.id} className="flex items-center gap-4 p-4 bg-accent/30 border border-border rounded-xl hover:border-primary transition-all cursor-pointer group">
                  <Avatar className="w-10 h-10 bg-primary/20">
                    <AvatarFallback className="text-primary font-bold text-xs">{review.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{review.topic}</div>
                    <div className="text-[10px] text-muted-foreground">{review.name} · {review.type}</div>
                  </div>
                  <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20 text-[10px]">
                    {review.due}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" /> Feedback Received
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {receivedFeedback.map((feedback) => (
                <div key={feedback.id} className="p-4 bg-accent/20 border border-border rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-[8px] font-bold">{feedback.from[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-semibold">{feedback.from}</span>
                    </div>
                    <div className="flex items-center gap-1 text-warning">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold">{feedback.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed mb-2 italic">"{feedback.comment}"</p>
                  <div className="text-[10px] text-muted-foreground">Re: {feedback.topic} Presentation</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
              🏆 Your Reviewer Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Reviews Completed", value: "24", icon: CheckCircle2, color: "text-success" },
              { label: "Helpfulness Rating", value: "4.9", icon: Star, color: "text-warning" },
              { label: "XP Earned", value: "1,450", icon: Users, color: "text-primary" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 bg-accent/10 border border-border rounded-xl flex items-center gap-4">
                <stat.icon className={cn("w-8 h-8", stat.color)} />
                <div>
                  <div className="text-2xl font-headline">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">{stat.label}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
