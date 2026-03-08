import { useEffect, useState } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle, Cpu, HardDrive, MemoryStick, Wifi } from "lucide-react";

function generateData(points: number, base: number, variance: number) {
  return Array.from({ length: points }, (_, i) => ({
    time: `${i}m`,
    value: Math.round((base + (Math.random() - 0.5) * variance) * 10) / 10,
  }));
}

const anomalies = [
  { id: 1, type: "CPU Spike", component: "api-gw-7x4k2", confidence: "94%", time: "14:23:07", severity: "warning" as const },
  { id: 2, type: "Memory Leak Pattern", component: "worker-12", confidence: "87%", time: "14:15:22", severity: "critical" as const },
  { id: 3, type: "Unusual Disk Write", component: "db-prod-02", confidence: "72%", time: "13:58:41", severity: "warning" as const },
];

const MonitoringPage = () => {
  const [cpuData, setCpuData] = useState(generateData(20, 65, 20));
  const [memData, setMemData] = useState(generateData(20, 70, 15));
  const [diskData, setDiskData] = useState(generateData(20, 45, 10));
  const [netData, setNetData] = useState(generateData(20, 20, 15));

  useEffect(() => {
    const interval = setInterval(() => {
      const update = (prev: any[], base: number, variance: number) => {
        const next = [...prev.slice(1), { time: `${prev.length}m`, value: Math.round((base + (Math.random() - 0.5) * variance) * 10) / 10 }];
        return next;
      };
      setCpuData((p) => update(p, 65, 20));
      setMemData((p) => update(p, 70, 15));
      setDiskData((p) => update(p, 45, 10));
      setNetData((p) => update(p, 20, 15));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const chartConfig = [
    { title: "CPU Usage", data: cpuData, color: "#0ea5e9", icon: Cpu },
    { title: "Memory Usage", data: memData, color: "#a855f7", icon: MemoryStick },
    { title: "Disk I/O", data: diskData, color: "#22c55e", icon: HardDrive },
    { title: "Network Traffic", data: netData, color: "#f59e0b", icon: Wifi },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-xl font-bold">System Monitoring</h2>
        <p className="text-sm text-muted-foreground mt-1">Real-time infrastructure performance metrics</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {chartConfig.map((chart) => (
          <div key={chart.title} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-4">
              <chart.icon className="h-4 w-4" style={{ color: chart.color }} />
              <span className="text-sm font-semibold">{chart.title}</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={chart.data}>
                <defs>
                  <linearGradient id={`grad-${chart.title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chart.color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={chart.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(222 47% 8%)", border: "1px solid hsl(222 30% 16%)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke={chart.color} fill={`url(#grad-${chart.title})`} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Anomaly Detection */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-status-warning" />
          AI Anomaly Detection Engine
        </h3>
        <div className="space-y-2">
          {anomalies.map((a) => (
            <div key={a.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${a.severity === "critical" ? "bg-status-critical" : "bg-status-warning"} animate-pulse`} />
                <div>
                  <div className="text-sm font-medium">{a.type}</div>
                  <div className="text-xs text-muted-foreground">{a.component}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-primary">{a.confidence} confidence</div>
                <div className="text-xs text-muted-foreground">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;
