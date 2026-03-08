import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  steps?: string[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Welcome to HealOps AI Operations. I'm your intelligent assistant for system diagnostics and automated recovery. How can I help?",
  },
];

const aiResponses: Record<string, { content: string; steps: string[] }> = {
  health: {
    content: "System health analysis complete. All primary services are operational. CPU usage is at 67% (within normal range), memory utilization at 72%, disk I/O is stable. Network latency is 12ms. One minor anomaly detected: Redis cache hit ratio dropped 3% in the last hour.",
    steps: ["Scanning all endpoints...", "Analyzing CPU/Memory metrics...", "Checking network latency...", "Evaluating service dependencies...", "Generating health report..."],
  },
  cpu: {
    content: "Root cause identified: The Node.js API gateway (pod api-gw-7x4k2) is running an unoptimized query loop causing 94% CPU usage. Auto-scaling triggered 2 additional pods. Recommendation: Deploy hotfix #4821 to resolve the query inefficiency.",
    steps: ["Correlating CPU spike timeline...", "Identifying affected processes...", "Analyzing process call stacks...", "Cross-referencing recent deployments...", "Root cause identified."],
  },
  restart: {
    content: "Database service restart initiated. PostgreSQL primary instance (db-prod-01) gracefully stopping connections... Connections drained. Service restarted successfully in 4.2s. All replicas synced. Health check passed. No data loss detected.",
    steps: ["Draining active connections...", "Creating checkpoint...", "Stopping PostgreSQL service...", "Restarting service...", "Running health checks...", "Service restored ✓"],
  },
  default: {
    content: "I've analyzed your request. Currently monitoring 24 services across 3 availability zones. System reliability score is 97.2%. Would you like me to drill down into any specific component or run a diagnostic scan?",
    steps: ["Processing request...", "Scanning infrastructure...", "Generating response..."],
  },
};

function getResponse(input: string) {
  const lower = input.toLowerCase();
  if (lower.includes("health") || lower.includes("status")) return aiResponses.health;
  if (lower.includes("cpu") || lower.includes("usage")) return aiResponses.cpu;
  if (lower.includes("restart") || lower.includes("database")) return aiResponses.restart;
  return aiResponses.default;
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentSteps, setCurrentSteps] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, currentSteps]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const response = getResponse(input);

    // Simulate reasoning steps
    for (let i = 0; i < response.steps.length; i++) {
      await new Promise((r) => setTimeout(r, 600));
      setCurrentSteps((prev) => [...prev, response.steps[i]]);
    }

    await new Promise((r) => setTimeout(r, 400));
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "assistant", content: response.content, steps: response.steps },
    ]);
    setCurrentSteps([]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full rounded-lg border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="h-2 w-2 rounded-full bg-status-healthy animate-pulse-glow" />
        <span className="text-sm font-semibold">AI Operations Assistant</span>
        <span className="text-xs text-muted-foreground ml-auto">Online</span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="h-7 w-7 rounded-md bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="h-7 w-7 rounded-md bg-accent flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}

        {/* Reasoning steps */}
        {currentSteps.length > 0 && (
          <div className="flex gap-2.5">
            <div className="h-7 w-7 rounded-md bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-muted rounded-lg px-3 py-2 space-y-1">
              {currentSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground animate-fade-in-up">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {step}
                </div>
              ))}
              {isTyping && <Loader2 className="h-3 w-3 text-primary animate-spin mt-1" />}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about system health, diagnostics..."
            className="flex-1 h-9 rounded-md bg-muted border border-border px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={handleSend}
            disabled={isTyping}
            className="h-9 w-9 rounded-md bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send className="h-4 w-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
