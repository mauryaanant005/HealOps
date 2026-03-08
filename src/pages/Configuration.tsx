import { useState } from "react";
import { Settings, Bell, Zap, Cloud, Cpu, MemoryStick, HardDrive, Shield } from "lucide-react";

interface ToggleSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  icon: React.ElementType;
}

const ConfigurationPage = () => {
  const [toggles, setToggles] = useState<ToggleSetting[]>([
    { id: "auto-restart", label: "Auto-Restart Services", description: "Automatically restart failed services", enabled: true, icon: Zap },
    { id: "auto-scale", label: "Auto-Scaling", description: "Scale pods based on resource usage", enabled: true, icon: Cloud },
    { id: "memory-cleanup", label: "Memory Cleanup", description: "Automatically clear unused memory", enabled: true, icon: MemoryStick },
    { id: "log-rotation", label: "Log Rotation", description: "Rotate and compress old log files", enabled: false, icon: HardDrive },
    { id: "incident-alerts", label: "Incident Alerts", description: "Send notifications for incidents", enabled: true, icon: Bell },
    { id: "threat-detection", label: "AI Threat Detection", description: "Monitor for security anomalies", enabled: true, icon: Shield },
  ]);

  const [cpuThreshold, setCpuThreshold] = useState(85);
  const [memThreshold, setMemThreshold] = useState(80);
  const [diskThreshold, setDiskThreshold] = useState(85);

  const toggle = (id: string) => {
    setToggles((prev) => prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)));
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in-up">
      <div>
        <h2 className="text-xl font-bold">System Configuration</h2>
        <p className="text-sm text-muted-foreground mt-1">Configure monitoring rules and automation settings</p>
      </div>

      {/* Alert Thresholds */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Settings className="h-4 w-4 text-primary" />
          Alert Thresholds
        </h3>
        <div className="space-y-5">
          {[
            { label: "CPU Usage Alert", value: cpuThreshold, setValue: setCpuThreshold, icon: Cpu },
            { label: "Memory Usage Alert", value: memThreshold, setValue: setMemThreshold, icon: MemoryStick },
            { label: "Disk Usage Alert", value: diskThreshold, setValue: setDiskThreshold, icon: HardDrive },
          ].map((t) => (
            <div key={t.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <t.icon className="h-4 w-4 text-muted-foreground" />
                  {t.label}
                </div>
                <span className="text-sm font-mono text-primary">{t.value}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={95}
                value={t.value}
                onChange={(e) => t.setValue(Number(e.target.value))}
                className="w-full h-1.5 rounded-full bg-muted appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Automation Toggles */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          Automation Settings
        </h3>
        <div className="space-y-3">
          {toggles.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <t.icon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.description}</div>
                </div>
              </div>
              <button
                onClick={() => toggle(t.id)}
                className={`relative h-6 w-11 rounded-full transition-colors ${t.enabled ? "bg-primary" : "bg-muted"}`}
              >
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform ${t.enabled ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Cloud className="h-4 w-4 text-primary" />
          Cloud Integrations
        </h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {["AWS CloudWatch", "Kubernetes", "Prometheus"].map((name) => (
            <div key={name} className="rounded-md border border-border p-3 text-center hover:border-primary/30 transition-colors cursor-pointer">
              <div className="text-sm font-medium">{name}</div>
              <div className="text-xs text-status-healthy mt-1">Connected</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPage;
