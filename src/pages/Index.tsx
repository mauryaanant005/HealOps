import { AIChatbot } from "@/components/AIChatbot";
import { SystemHealthPanel } from "@/components/SystemHealthPanel";
import { IncidentFeed } from "@/components/IncidentFeed";
import { Shield, Activity, Zap, Server } from "lucide-react";

const stats = [
  { label: "Active Services", value: "24", icon: Server, trend: "+2" },
  { label: "Uptime", value: "99.97%", icon: Activity, trend: "+0.02%" },
  { label: "Auto-Repairs", value: "147", icon: Zap, trend: "+12 today" },
  { label: "Threat Level", value: "Low", icon: Shield, trend: "Stable" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-xl font-bold">AI Operations Command Center</h2>
        <p className="text-sm text-muted-foreground mt-1">Real-time system intelligence and automated recovery</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-3 hover:glow-blue transition-shadow">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <s.icon className="h-4 w-4 text-primary" />
              <span className="text-xs">{s.label}</span>
            </div>
            <div className="text-lg font-bold">{s.value}</div>
            <div className="text-xs text-status-healthy mt-0.5">{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Main area */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 min-h-[500px]">
          <AIChatbot />
        </div>
        <div className="space-y-4">
          <SystemHealthPanel />
          <IncidentFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
