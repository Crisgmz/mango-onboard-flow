import { Building2, ArrowRight } from "lucide-react";

interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  role?: string;
}

interface TenantSelectorProps {
  tenants: Tenant[];
  onSelect: (tenant: Tenant) => void;
}

const TenantSelector = ({ tenants, onSelect }: TenantSelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-1">Selecciona tu negocio</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Tienes acceso a varios negocios. Elige uno para continuar.
      </p>

      <div className="space-y-3">
        {tenants.map((tenant) => (
          <button
            key={tenant.id}
            onClick={() => onSelect(tenant)}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-surface hover:border-primary/30 hover:shadow-sm transition-all duration-150 text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">{tenant.name}</p>
              <p className="text-xs text-muted-foreground truncate">{tenant.subdomain}.mangopos.do</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TenantSelector;
