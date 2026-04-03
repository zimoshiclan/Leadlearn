"use client";

import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Bot, Send, BrainCircuit, ExternalLink } from "lucide-react";
import { socraticTutorInteraction } from "@/ai/flows/socratic-tutor-interaction";
import { studentPersonalizedLearning } from "@/ai/flows/student-personalized-learning";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Message = {
  speaker: 'student' | 'ai';
  message: string;
};

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { speaker: 'ai', message: "Hey Alex! I see you're presenting on Cell Division tomorrow. Let's make sure you're ready. \n\nInstead of just reviewing — can you explain to me in your own words what the key difference between mitosis and meiosis is?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const studentMessage = input.trim();
    const newMessages = [...messages, { speaker: 'student' as const, message: studentMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await socraticTutorInteraction({
        topic: "Cell Division — Mitosis and Meiosis",
        chatHistory: messages,
        currentStudentMessage: studentMessage
      });
      
      setMessages([...newMessages, { speaker: 'ai', message: response.aiResponse }]);
    } catch (error) {
      toast({ title: "Error", description: "Failed to get AI response.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const loadQuiz = async () => {
    try {
      setIsLoading(true);
      const data = await studentPersonalizedLearning({
        topic: "Cell Division",
        difficulty: "medium",
        discussionHistory: messages.map(m => ({ role: m.speaker === 'student' ? 'user' : 'ai', content: m.message }))
      });
      setQuizData(data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate quiz.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[240px] p-8 animate-in fade-in duration-500">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="page-title mb-1">AI Tutor 🤖</h1>
            <p className="text-muted-foreground text-sm">Your Socratic study companion — it challenges, never just tells</p>
          </div>
          <Button variant="outline" className="border-border hover:border-primary">
            <BrainCircuit className="w-4 h-4 mr-2" /> View Gap Analysis
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <Card className="bg-card border-border overflow-hidden flex flex-col h-[500px]">
              <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-success ai-indicator-pulse" />
                <div>
                  <div className="text-sm font-semibold">Socratic AI</div>
                  <div className="text-[10px] text-muted-foreground">Preparing you for Biology tomorrow</div>
                </div>
              </div>
              <CardContent ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {messages.map((m, i) => (
                  <div key={i} className={cn("flex gap-3", m.speaker === 'student' ? "justify-end" : "justify-start")}>
                    {m.speaker === 'ai' && <Bot className="w-6 h-6 text-primary shrink-0 mt-1" />}
                    <div className={cn(
                      "p-3 rounded-xl text-sm leading-relaxed max-w-[85%]",
                      m.speaker === 'ai' 
                        ? "bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 rounded-tl-none" 
                        : "bg-accent/50 border border-border rounded-tr-none text-foreground/90"
                    )}>
                      {m.message.split('\n').map((line, j) => <p key={j} className="mb-2 last:mb-0">{line}</p>)}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 p-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </CardContent>
              <div className="p-4 border-top border-border bg-card flex gap-2">
                <Input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Answer the AI's question or ask something..." 
                  className="bg-accent border-border focus-visible:ring-primary"
                />
                <Button size="icon" onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                  🎯 AI-Generated Quiz
                </CardTitle>
                {!quizData && <Button variant="ghost" size="sm" onClick={loadQuiz} className="text-[10px] h-6">Generate Quiz</Button>}
              </CardHeader>
              <CardContent>
                {quizData ? (
                  <div className="space-y-4">
                    <p className="text-sm font-medium">{quizData.quizQuestion}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {quizData.options.map((opt: string) => (
                        <Button key={opt} variant="outline" className="justify-start text-xs h-auto py-3 px-4 border-border hover:border-primary hover:bg-primary/5">
                          {opt}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-2xl mb-2">❓</div>
                    <p className="text-xs text-muted-foreground">Answer AI's questions above to unlock personalized quiz challenges.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                  🧠 Knowledge Gap Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Mitosis phases", val: 88, status: "Strong", color: "bg-success" },
                  { label: "Chromosome behavior", val: 62, status: "Moderate", color: "bg-warning" },
                  { label: "Meiosis vs Mitosis", val: 55, status: "Moderate", color: "bg-warning" },
                  { label: "DNA replication timing", val: 25, status: "Weak ⚠️", color: "bg-secondary" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className={item.val > 80 ? "text-success" : item.val < 40 ? "text-secondary" : "text-warning"}>
                        {item.status}
                      </span>
                    </div>
                    <Progress value={item.val} className="h-1.5" indicatorClassName={item.color} />
                  </div>
                ))}
                <div className="mt-6 p-3 bg-secondary/5 border border-secondary/20 rounded-lg flex gap-3 items-start">
                  <Bot className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    🤖 Focus on <strong>DNA replication timing</strong> — this is likely to come up in peer questions tomorrow.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest">
                  📚 AI-Curated Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {[
                  { title: "Mitosis explained in 5 mins", meta: "Khan Academy · Matches weak areas", icon: "🎥" },
                  { title: "DNA Replication & Cell Cycle", meta: "OpenStax Biology · Textbook", icon: "📖" },
                  { title: "Cell Division Interactive Sim", meta: "PhET Simulations · Visual learner", icon: "🎮" },
                ].map((res) => (
                  <div key={res.title} className="p-3 bg-accent/30 border border-border rounded-xl hover:border-primary transition-all cursor-pointer group flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium flex items-center gap-2">
                        <span>{res.icon}</span>
                        {res.title}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1">{res.meta}</div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
