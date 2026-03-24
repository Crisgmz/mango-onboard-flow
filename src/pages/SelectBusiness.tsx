import { useEffect, useState } from "react";
import AuthOnboardingLayout from "@/components/auth/AuthOnboardingLayout";
import TenantSelector from "@/components/auth/TenantSelector";
import { getUserBusinesses, type UserBusiness } from "@/lib/auth";
import { AlertTriangle, Loader2 } from "lucide-react";

const SelectBusinessPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tenants, setTenants] = useState<UserBusiness[]>([]);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getUserBusinesses();
        const filtered = data.filter((item) => item.businesses?.domain);

        if (filtered.length === 1) {
          const domain = filtered[0].businesses?.domain;
          if (domain) {
            window.location.assign(`https://${domain}`);
            return;
          }
        }

        setTenants(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : "No pudimos cargar tus negocios.");
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const handleSelect = (tenant: UserBusiness) => {
    const domain = tenant.businesses?.domain;
    if (!domain) return;
    window.location.assign(`https://${domain}`);
  };

  return (
    <AuthOnboardingLayout>
      <div className="auth-container max-w-[520px]">
        <div className="auth-card-header">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">M</span>
            </div>
            <span className="text-foreground font-semibold text-sm">Selecciona tu negocio</span>
          </div>
        </div>
        <div className="p-8 sm:p-10">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p>Cargando tus negocios...</p>
            </div>
          ) : error ? (
            <div className="flex items-start gap-3 rounded-[10px] border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <p>{error}</p>
            </div>
          ) : tenants.length === 0 ? (
            <div className="flex items-start gap-3 rounded-[10px] border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <p>No tienes negocios asociados todavía.</p>
            </div>
          ) : (
            <TenantSelector tenants={tenants} onSelect={handleSelect} />
          )}
        </div>
      </div>
    </AuthOnboardingLayout>
  );
};

export default SelectBusinessPage;
