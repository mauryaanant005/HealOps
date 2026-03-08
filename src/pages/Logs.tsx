import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Filter } from "lucide-react";

const logs = [
  { time: "14:23:07", severity: "WARNING", component: "api-gateway", message: "CPU spike detected on api-gw-7x4k2", action: "Auto-scaling triggered" },
  { time: "14:15:22", severity: "CRITICAL", component: "worker", message: "OutOfMemoryError in worker-process-12", action: "Service restarted" },
  { time: "14:10:45", severity: "INFO", component: "scheduler", message: "Scheduled health check completed", action: "No action needed" },
  { time: "13:58:41", severity: "CRITICAL", component: "database", message: "Disk usage at 88% on db-prod-02", action: "Log rotation executed" },
  { time: "13:45:12", severity: "WARNING", component: "cache", message: "Redis hit ratio dropped to 82%", action: "Cache flush initiated" },
  { time: "13:30:00", severity: "INFO", component: "monitoring", message: "All services healthy", action: "Status logged" },
  { time: "13:15:33", severity: "WARNING", component: "network", message: "Latency spike on us-east-1", action: "Traffic rerouted" },
  { time: "12:45:20", severity: "INFO", component: "deployment", message: "v2.4.1 deployed successfully", action: "Deployment verified" },
];

const incidentTrendData = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  incidents: Math.floor(Math.random() * 15 + 5),
  resolved: Math.floor(Math.random() * 12 + 5),
}));

const successRateData = Array.from({ length: 12 }, (_, i) => ({
  month: `W${i + 1}`,
  rate: Math.round(85 + Math.random() * 14),
}));

const severityColors: Record<string, string> = {
  CRITICAL: "text-status-critical",
  WARNING: "text-status-warning",
  INFO: "text-primary",
};

const LogsPage = () => {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? logs : logs.filter((l) => l.severity === filter);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-xl font-bold">Logs & Analytics</h2>
        <p className="text-sm text-muted-foreground mt-1">Historical system events and AI performance metrics</p>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold mb-3">Incident Frequency</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={incidentTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(222 47% 8%)", border: "1px solid hsl(222 30% 16%)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="incidents" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold mb-3">Recovery Success Rate</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={successRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(222 47% 8%)", border: "1px solid hsl(222 30% 16%)", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="rate" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: "#0ea5e9" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Logs table */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-sm font-semibold">System Logs</h3>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            {["all", "CRITICAL", "WARNING", "INFO"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-2 py-1 rounded-md transition-colors ${
                  filter === f ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="px-4 py-2 text-left font-medium">Time</th>
                <th className="px-4 py-2 text-left font-medium">Severity</th>
                <th className="px-4 py-2 text-left font-medium">Component</th>
                <th className="px-4 py-2 text-left font-medium">Message</th>
                <th className="px-4 py-2 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{log.time}</td>
                  <td className={`px-4 py-2.5 text-xs font-semibold ${severityColors[log.severity]}`}>{log.severity}</td>
                  <td className="px-4 py-2.5 text-xs">{log.component}</td>
                  <td className="px-4 py-2.5 text-xs">{log.message}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogsPage;
