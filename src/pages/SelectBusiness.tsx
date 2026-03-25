import { useEffect, useState } from "react";
import AuthOnboardingLayout from "@/components/auth/AuthOnboardingLayout";
import TenantSelector from "@/components/auth/TenantSelector";
import { buildUserBusinessSelectionModel, getUserBusinesses, type UserBusinessSelectionModel } from "@/lib/auth";
import { AlertTriangle, Loader2 } from "lucide-react";

const SelectBusinessPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selection, setSelection] = useState<UserBusinessSelectionModel>({ mode: 'business', items: [] });

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getUserBusinesses();
        const nextSelection = buildUserBusinessSelectionModel(data);

        if (nextSelection.items.length === 1) {
          const domain = nextSelection.items[0].businesses?.domain;
          if (domain) {
            window.location.assign(`https://${domain}`);
            return;
          }
        }

        setSelection(nextSelection);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No pudimos cargar tus accesos.');
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const handleSelect = (tenant: (typeof selection.items)[number]) => {
    const domain = tenant.businesses?.domain;
    if (!domain) return;
    const target = `https://${domain}/#/login?business_id=${encodeURIComponent(tenant.business_id)}`;
    window.location.assign(target);
  };

  return (
    <AuthOnboardingLayout>
      <div className="auth-container max-w-[520px]">
        <div className="auth-card-header">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">M</span>
            </div>
            <span className="text-foreground font-semibold text-sm">
              {selection.mode === 'branch' ? 'Selecciona tu sucursal' : 'Selecciona tu negocio'}
            </span>
          </div>
        </div>
        <div className="p-8 sm:p-10">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p>Cargando tus accesos...</p>
            </div>
          ) : error ? (
            <div className="flex items-start gap-3 rounded-[10px] border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <p>{error}</p>
            </div>
          ) : selection.items.length === 0 ? (
            <div className="flex items-start gap-3 rounded-[10px] border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <p>No tienes negocios asociados todavía.</p>
            </div>
          ) : (
            <TenantSelector
              tenants={selection.items}
              mode={selection.mode}
              companyName={selection.companyName}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>
    </AuthOnboardingLayout>
  );
};

export default SelectBusinessPage;
