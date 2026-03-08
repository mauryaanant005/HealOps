import {
  LayoutDashboard,
  MessageSquare,
  Activity,
  AlertTriangle,
  Zap,
  FileText,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "AI Chatbot", url: "/chatbot", icon: MessageSquare },
  { title: "System Monitoring", url: "/monitoring", icon: Activity },
  { title: "Incident Intelligence", url: "/incidents", icon: AlertTriangle },
  { title: "Self-Healing", url: "/self-healing", icon: Zap },
  { title: "Logs & Analytics", url: "/logs", icon: FileText },
  { title: "Configuration", url: "/configuration", icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-60"
      } flex flex-col border-r border-border bg-sidebar transition-all duration-300 shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-border">
        <Shield className="h-6 w-6 text-primary shrink-0" />
        {!collapsed && (
          <span className="text-sm font-semibold text-gradient whitespace-nowrap">
            HealOps
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              end
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              activeClassName=""
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
