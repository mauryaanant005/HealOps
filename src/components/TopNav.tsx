import { Search, Bell, User } from "lucide-react";
import { useState } from "react";

export function TopNav() {
  const [alerts] = useState(3);

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-semibold">
          <span className="text-gradient">HealOps</span>
          <span className="text-muted-foreground ml-2 text-xs font-normal hidden sm:inline">
            AI Self-Healing Operations Platform
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Search systems..."
            className="h-8 w-56 rounded-md bg-muted border border-border pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Alerts */}
        <button className="relative h-8 w-8 rounded-md bg-muted flex items-center justify-center hover:bg-accent transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          {alerts > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-status-critical text-[10px] font-bold flex items-center justify-center text-foreground">
              {alerts}
            </span>
          )}
        </button>

        {/* Profile */}
        <button className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
          <User className="h-4 w-4 text-primary" />
        </button>
      </div>
    </header>
  );
}
