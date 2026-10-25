import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useAdminStore } from "@/lib/admin-store";
import { Lock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Sign-In | GROVISION SEO Command Center" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { login } = useAdminStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@grovision.shop");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email || "admin@grovision.shop");
      setLoading(false);
      toast.success("Authenticated successfully. Redirecting to workspace...");
      navigate({ to: "/admin" });
    }, 400);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-4 py-12 text-ivory antialiased">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg border border-gold/40 bg-navy-soft shadow-lg">
            <span className="font-display text-2xl font-bold tracking-wider text-gold">GV</span>
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold uppercase tracking-wider text-ivory">
            GROVISION
          </h1>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold">
            SEO Command Center
          </p>
          <p className="mt-2 text-xs text-ivory/60">
            Dedicated Single-Site Workspace for{" "}
            <span className="text-gold font-mono">grovision.shop</span>
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-lg border border-gold/20 bg-navy-soft/90 p-7 shadow-xl backdrop-blur">
          <div className="mb-6 flex items-center justify-between border-b border-ivory/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-medium text-ivory/80">
              <Lock className="h-4 w-4 text-gold" />
              <span>Invite-Only Sign-In</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-300">
              <Sparkles className="h-3 w-3" /> Sample Ready
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="login-email" className="text-xs text-ivory/80">
                Admin Email
              </Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@grovision.shop"
                required
                className="mt-1.5 border-navy/40 bg-navy text-ivory placeholder:text-ivory/30 focus-visible:ring-gold"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password" className="text-xs text-ivory/80">
                  Password
                </Label>
                <span className="text-[10px] text-ivory/40">Owner Provisioned</span>
              </div>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="mt-1.5 border-navy/40 bg-navy text-ivory placeholder:text-ivory/30 focus-visible:ring-gold"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full border border-gold bg-gold text-xs font-semibold uppercase tracking-wider text-navy transition-all hover:bg-gold-soft hover:shadow-md"
              >
                {loading ? "Authenticating..." : "Enter Workspace"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="mt-6 border-t border-ivory/10 pt-4 text-center">
            <p className="text-[11px] leading-relaxed text-ivory/50">
              Public self-registration is permanently disabled. Access is limited strictly to
              authorized administrators.
            </p>
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleSubmit()}
              className="mt-3 text-xs text-gold/80 hover:bg-navy hover:text-gold"
            >
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
              Instant Authorized Preview Sign-In
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-ivory/50 transition-colors hover:text-gold">
            &larr; Return to public marketing website
          </Link>
        </div>
      </div>
    </div>
  );
}
