import { CheckCircle2, Circle, Loader2, Zap, Search, Cpu, RefreshCw, ShieldCheck } from "lucide-react";

const workflows = [
  {
    id: 1,
    title: "Memory Leak Recovery",
    trigger: "worker-process-12 OOM",
    status: "completed" as const,
    steps: [
      { label: "Issue Detected", icon: Search, status: "done" as const, detail: "Memory at 94%" },
      { label: "AI Diagnosis", icon: Cpu, status: "done" as const, detail: "Unbounded cache identified" },
      { label: "Service Restart", icon: RefreshCw, status: "done" as const, detail: "Graceful restart in 3.1s" },
      { label: "System Restored", icon: ShieldCheck, status: "done" as const, detail: "All health checks passed" },
    ],
  },
  {
    id: 2,
    title: "CPU Spike Mitigation",
    trigger: "api-gw-7x4k2 High CPU",
    status: "completed" as const,
    steps: [
      { label: "Spike Detected", icon: Search, status: "done" as const, detail: "CPU at 94%" },
      { label: "Root Cause Analysis", icon: Cpu, status: "done" as const, detail: "Unoptimized query loop" },
      { label: "Auto-Scale Triggered", icon: RefreshCw, status: "done" as const, detail: "+2 pods deployed" },
      { label: "Stabilized", icon: ShieldCheck, status: "done" as const, detail: "CPU normalized to 45%" },
    ],
  },
  {
    id: 3,
    title: "Disk Cleanup Automation",
    trigger: "db-prod-02 Disk Critical",
    status: "in_progress" as const,
    steps: [
      { label: "Alert Triggered", icon: Search, status: "done" as const, detail: "Disk at 88%" },
      { label: "WAL Analysis", icon: Cpu, status: "done" as const, detail: "Stalled replication found" },
      { label: "Log Rotation", icon: RefreshCw, status: "active" as const, detail: "Cleaning old WAL files..." },
      { label: "Verification", icon: ShieldCheck, status: "pending" as const, detail: "Awaiting completion" },
    ],
  },
];

const stepStatusIcon = {
  done: <CheckCircle2 className="h-4 w-4 text-status-healthy" />,
  active: <Loader2 className="h-4 w-4 text-primary animate-spin" />,
  pending: <Circle className="h-4 w-4 text-muted-foreground" />,
};

const SelfHealingPage = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-xl font-bold">Self-Healing Automation</h2>
        <p className="text-sm text-muted-foreground mt-1">Autonomous repair workflows powered by AI</p>
      </div>

      <div className="space-y-4">
        {workflows.map((wf) => (
          <div key={wf.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">{wf.title}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                wf.status === "completed" ? "bg-status-healthy/20 text-status-healthy" : "bg-primary/20 text-primary"
              }`}>
                {wf.status === "completed" ? "Completed" : "In Progress"}
              </span>
            </div>

            <div className="text-xs text-muted-foreground mb-4">Trigger: {wf.trigger}</div>

            {/* Workflow steps */}
            <div className="flex items-start gap-0">
              {wf.steps.map((step, i) => (
                <div key={i} className="flex-1 relative">
                  <div className="flex flex-col items-center text-center">
                    <div className={`h-10 w-10 rounded-full border-2 flex items-center justify-center mb-2 ${
                      step.status === "done" ? "border-status-healthy bg-status-healthy/10" :
                      step.status === "active" ? "border-primary bg-primary/10 glow-blue" :
                      "border-border bg-muted"
                    }`}>
                      {stepStatusIcon[step.status]}
                    </div>
                    <div className="text-xs font-medium">{step.label}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{step.detail}</div>
                  </div>
                  {i < wf.steps.length - 1 && (
                    <div className={`absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-0.5 ${
                      step.status === "done" ? "bg-status-healthy" : "bg-border"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfHealingPage;
