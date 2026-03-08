import { useState } from "react";
import { AlertTriangle, XCircle, ChevronRight, Clock, Server, FileText, Activity } from "lucide-react";

const incidents = [
  {
    id: 1,
    title: "Memory Leak in Worker Process",
    component: "worker-process-12",
    error: "OutOfMemoryError",
    severity: "critical" as const,
    time: "2025-03-08 14:15:22",
    summary: "Gradual memory increase detected over 45 minutes, reaching 94% utilization. Pattern consistent with unbounded cache growth in request handler.",
    logs: [
      "[14:12:03] WARN: Memory usage at 82%",
      "[14:13:17] WARN: GC cycle took 1.2s",
      "[14:14:45] ERROR: Memory usage at 91%",
      "[14:15:22] CRITICAL: OOM threshold exceeded",
    ],
    reasoning: [
      "Detected steady memory growth pattern (1.2% per minute)",
      "Correlated with deployment v2.4.1 (2 hours ago)",
      "Identified unbounded HashMap in RequestCache class",
      "Root cause: Missing TTL on cache entries in new feature",
    ],
  },
  {
    id: 2,
    title: "CPU Spike on API Gateway",
    component: "api-gw-7x4k2",
    error: "HighCPUUtilization",
    severity: "warning" as const,
    time: "2025-03-08 14:23:07",
    summary: "CPU utilization spiked to 94% due to unoptimized database query loop in the user-search endpoint.",
    logs: [
      "[14:21:30] INFO: Request rate normal at 450 req/s",
      "[14:22:01] WARN: CPU at 78%",
      "[14:22:45] WARN: Query execution time > 2s",
      "[14:23:07] ALERT: CPU at 94%",
    ],
    reasoning: [
      "CPU spike correlated with increased /api/search requests",
      "Query plan analysis shows full table scan on users table",
      "Missing index on user_email column identified",
      "Auto-scaling mitigated immediate impact",
    ],
  },
  {
    id: 3,
    title: "Disk Space Critical on Database Server",
    component: "db-prod-02",
    error: "DiskSpaceExhausted",
    severity: "critical" as const,
    time: "2025-03-08 13:58:41",
    summary: "Disk usage exceeded 85% threshold due to excessive WAL file accumulation from stalled replication.",
    logs: [
      "[13:55:12] WARN: Disk at 80%",
      "[13:56:44] WARN: WAL files growing",
      "[13:57:30] ERROR: Replication lag > 30s",
      "[13:58:41] CRITICAL: Disk at 88%",
    ],
    reasoning: [
      "Disk growth rate: 1.5GB per minute (abnormal)",
      "WAL files not being cleaned up",
      "Replication to replica-02 stalled at 13:50",
      "Root cause: Network partition between primary and replica",
    ],
  },
];

const IncidentsPage = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const active = incidents.find((i) => i.id === selected);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-xl font-bold">Incident Intelligence</h2>
        <p className="text-sm text-muted-foreground mt-1">AI-powered root cause analysis and diagnostics</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Incident list */}
        <div className="space-y-3">
          {incidents.map((inc) => (
            <button
              key={inc.id}
              onClick={() => setSelected(inc.id)}
              className={`w-full text-left rounded-lg border p-4 transition-all ${
                selected === inc.id ? "border-primary glow-blue bg-primary/5" : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {inc.severity === "critical" ? (
                    <XCircle className="h-5 w-5 text-status-critical shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-status-warning shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-sm font-semibold">{inc.title}</div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Server className="h-3 w-3" /> {inc.component}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {inc.time}
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{inc.summary}</p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="rounded-lg border border-border bg-card p-4">
          {active ? (
            <div className="space-y-4 animate-fade-in-up">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    active.severity === "critical" ? "bg-status-critical/20 text-status-critical" : "bg-status-warning/20 text-status-warning"
                  }`}>
                    {active.severity.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{active.error}</span>
                </div>
                <h3 className="text-base font-semibold mt-2">{active.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{active.summary}</p>
              </div>

              {/* Logs */}
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" /> System Logs
                </div>
                <div className="bg-muted rounded-md p-3 font-mono text-xs space-y-1">
                  {active.logs.map((log, i) => (
                    <div key={i} className={log.includes("CRITICAL") || log.includes("ERROR") ? "text-status-critical" : log.includes("WARN") ? "text-status-warning" : "text-muted-foreground"}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Reasoning */}
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-muted-foreground">
                  <Activity className="h-3.5 w-3.5" /> AI Root Cause Analysis
                </div>
                <div className="space-y-2">
                  {active.reasoning.map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                      </div>
                      <span className="text-sm text-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
              Select an incident to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentsPage;
