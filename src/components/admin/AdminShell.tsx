import { useState, type ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { useAdminStore } from "@/lib/admin-store";
import { ShieldCheck, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AdminShellProps {
  title: string;
  subtitle?: string | undefined;
  actions?: ReactNode | undefined;
  children: ReactNode;
}

export function AdminShell({ title, subtitle, actions, children }: AdminShellProps) {
  const { user, login } = useAdminStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("admin@grovision.shop");
  const [passwordInput, setPasswordInput] = useState("••••••••••••");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If not authenticated, render the dedicated sign-in screen
  if (!user.isAuthenticated) {
    const handleLogin = (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => {
        login(emailInput || "admin@grovision.shop");
        setIsSubmitting(false);
        toast.success("Welcome back to GROVISION SEO Command Center!");
      }, 400);
    };

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-4 py-12 text-ivory">
        <div className="w-full max-w-md">
          {/* Logo & Branding */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg border border-gold/40 bg-navy-soft shadow-lg">
              <span className="font-display text-2xl font-bold tracking-wider text-gold">GV</span>
            </div>
            <h1 className="mt-5 font-display text-2xl font-bold uppercase tracking-wider text-ivory">
              GROVISION
            </h1>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold">
              Private SEO Command Center
            </p>
            <p className="mt-2 text-xs text-ivory/60">
              Dedicated Single-Site Workspace for{" "}
              <span className="text-gold font-mono">grovision.shop</span>
            </p>
          </div>

          {/* Sign-in Form Card */}
          <div className="mt-8 rounded-lg border border-gold/20 bg-navy-soft/90 p-7 shadow-xl backdrop-blur">
            <div className="mb-6 flex items-center justify-between border-b border-ivory/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-medium text-ivory/80">
                <Lock className="h-4 w-4 text-gold" />
                <span>Invite-Only Admin Access</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                <Sparkles className="h-3 w-3" /> Sample Ready
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="admin-email" className="text-xs text-ivory/80">
                  Admin Email
                </Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@grovision.shop"
                  required
                  className="mt-1.5 border-navy/40 bg-navy text-ivory placeholder:text-ivory/30 focus-visible:ring-gold"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-password" className="text-xs text-ivory/80">
                    Password
                  </Label>
                  <span className="text-[10px] text-ivory/40">Owner Provisioned</span>
                </div>
                <Input
                  id="admin-password"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  className="mt-1.5 border-navy/40 bg-navy text-ivory placeholder:text-ivory/30 focus-visible:ring-gold"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full border border-gold bg-gold text-xs font-semibold uppercase tracking-wider text-navy transition-all hover:bg-gold-soft hover:shadow-md"
                >
                  {isSubmitting ? "Authenticating..." : "Enter Command Center"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-6 border-t border-ivory/10 pt-4 text-center">
              <p className="text-[11px] leading-relaxed text-ivory/50">
                Self-registration is disabled. Access is limited strictly to authorized GROVISION
                directors and SEO specialists.
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleLogin()}
                className="mt-3 text-xs text-gold/80 hover:bg-navy hover:text-gold"
              >
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                Instant Authorized Preview Sign-In
              </Button>
            </div>
          </div>

          {/* Back to public site */}
          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-ivory/50 transition-colors hover:text-gold">
              &larr; Return to public marketing website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Layout
  return (
    <div className="flex min-h-screen bg-ivory text-navy antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-navy/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-64 shadow-2xl">
            <AdminSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          actions={actions}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
