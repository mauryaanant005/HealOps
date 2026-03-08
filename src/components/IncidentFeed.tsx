import { AlertTriangle, CheckCircle2, XCircle, Clock } from "lucide-react";

const incidents = [
  {
    id: 1,
    time: "2 min ago",
    title: "CPU spike detected on api-gw-7x4k2",
    severity: "warning" as const,
    action: "Auto-scaling triggered",
    resolved: true,
  },
  {
    id: 2,
    time: "8 min ago",
    title: "Memory leak in worker-process-12",
    severity: "critical" as const,
    action: "Service restarted automatically",
    resolved: true,
  },
  {
    id: 3,
    time: "15 min ago",
    title: "Redis cache hit ratio degradation",
    severity: "warning" as const,
    action: "Cache flush initiated",
    resolved: false,
  },
  {
    id: 4,
    time: "32 min ago",
    title: "Network latency spike on us-east-1",
    severity: "warning" as const,
    action: "Traffic rerouted to us-west-2",
    resolved: true,
  },
  {
    id: 5,
    time: "1 hour ago",
    title: "Disk usage exceeded 85% on db-prod-02",
    severity: "critical" as const,
    action: "Log rotation and cleanup executed",
    resolved: true,
  },
];

const severityConfig = {
  warning: { icon: AlertTriangle, color: "text-status-warning", bg: "bg-status-warning/10" },
  critical: { icon: XCircle, color: "text-status-critical", bg: "bg-status-critical/10" },
};

export function IncidentFeed() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">AI Incident Feed</h3>
        <span className="text-xs text-muted-foreground">{incidents.length} events</span>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {incidents.map((inc) => {
          const config = severityConfig[inc.severity];
          const Icon = config.icon;
          return (
            <div
              key={inc.id}
              className="flex items-start gap-2.5 p-2.5 rounded-md bg-muted/50 hover:bg-muted transition-colors animate-fade-in-up"
            >
              <div className={`h-6 w-6 rounded flex items-center justify-center shrink-0 ${config.bg}`}>
                <Icon className={`h-3.5 w-3.5 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{inc.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{inc.action}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">{inc.time}</span>
                  {inc.resolved ? (
                    <span className="flex items-center gap-0.5 text-[10px] text-status-healthy">
                      <CheckCircle2 className="h-3 w-3" /> Resolved
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5 text-[10px] text-status-warning">
                      <AlertTriangle className="h-3 w-3" /> In Progress
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
