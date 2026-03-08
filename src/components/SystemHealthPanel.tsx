import { useEffect, useState } from "react";
import { Cpu, HardDrive, MemoryStick, Wifi, TrendingUp } from "lucide-react";

interface Metric {
  label: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  status: "healthy" | "warning" | "critical";
}

function getStatus(value: number, thresholds: [number, number]): "healthy" | "warning" | "critical" {
  if (value >= thresholds[1]) return "critical";
  if (value >= thresholds[0]) return "warning";
  return "healthy";
}

const statusColors = {
  healthy: "text-status-healthy",
  warning: "text-status-warning",
  critical: "text-status-critical",
};

const statusBg = {
  healthy: "bg-status-healthy",
  warning: "bg-status-warning",
  critical: "bg-status-critical",
};

function CircularProgress({ value, status, size = 64 }: { value: number; status: string; size?: number }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;
  const colorClass = status === "critical" ? "#ef4444" : status === "warning" ? "#f59e0b" : "#22c55e";

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(222 30% 14%)" strokeWidth="4" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={colorClass}
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000"
      />
    </svg>
  );
}

export function SystemHealthPanel() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: "CPU Usage", value: 67, unit: "%", icon: Cpu, status: "healthy" },
    { label: "Memory", value: 72, unit: "%", icon: MemoryStick, status: "warning" },
    { label: "Disk I/O", value: 45, unit: "%", icon: HardDrive, status: "healthy" },
    { label: "Network", value: 23, unit: "ms", icon: Wifi, status: "healthy" },
  ]);
  const [reliabilityScore, setReliabilityScore] = useState(97.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => {
          const delta = (Math.random() - 0.5) * 6;
          const newVal = Math.max(5, Math.min(95, m.value + delta));
          const rounded = Math.round(newVal * 10) / 10;
          return {
            ...m,
            value: rounded,
            status: m.label === "Network" ? getStatus(rounded, [50, 100]) : getStatus(rounded, [70, 85]),
          };
        })
      );
      setReliabilityScore((prev) => {
        const d = (Math.random() - 0.5) * 0.4;
        return Math.round(Math.max(90, Math.min(99.9, prev + d)) * 10) / 10;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">System Health</h3>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-status-healthy animate-pulse-glow" />
          <span className="text-xs text-status-healthy">Live</span>
        </div>
      </div>

      {/* Reliability Score */}
      <div className="flex items-center gap-3 p-3 rounded-md bg-muted">
        <div className="relative">
          <CircularProgress value={reliabilityScore} status="healthy" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-status-healthy">{reliabilityScore}%</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Reliability Score</div>
          <div className="flex items-center gap-1 text-status-healthy text-xs">
            <TrendingUp className="h-3 w-3" />
            +0.3% from last hour
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <m.icon className="h-3.5 w-3.5" />
                {m.label}
              </div>
              <span className={`font-mono font-semibold ${statusColors[m.status]}`}>
                {m.value}{m.unit}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${statusBg[m.status]}`}
                style={{ width: `${Math.min(m.value, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Status lights */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
        {[
          { label: "API Gateway", status: "healthy" as const },
          { label: "Database", status: "healthy" as const },
          { label: "Cache", status: "warning" as const },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className={`h-2 w-2 rounded-full ${statusBg[s.status]} ${s.status !== "healthy" ? "animate-pulse" : ""}`} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
