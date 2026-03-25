import { Building2, ArrowRight, Store } from "lucide-react";
import type { UserBusiness } from "@/lib/auth";

interface TenantSelectorProps {
  tenants: UserBusiness[];
  mode?: 'business' | 'branch';
  companyName?: string;
  onSelect: (tenant: UserBusiness) => void;
}

const toRoleLabel = (role: string) => {
  const normalized = role.trim().toLowerCase();
  switch (normalized) {
    case 'owner':
      return 'Propietario';
    case 'admin':
      return 'Administrador';
    case 'manager':
      return 'Gerente';
    case 'cashier':
      return 'Cajero';
    case 'waiter':
      return 'Mesero';
    case 'cook':
    case 'chef':
    case 'kitchen':
      return 'Cocina';
    case 'delivery':
      return 'Delivery';
    default:
      return role;
  }
};

const TenantSelector = ({ tenants, mode = 'business', companyName, onSelect }: TenantSelectorProps) => {
  const isBranchMode = mode === 'branch';

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-1">
        {isBranchMode ? 'Selecciona tu sucursal' : 'Selecciona tu negocio'}
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        {isBranchMode
          ? `Tienes acceso a varias sucursales${companyName ? ` de ${companyName}` : ''}. Elige una para continuar.`
          : 'Tienes acceso a varios negocios. Elige uno para continuar.'}
      </p>

      <div className="space-y-3">
        {tenants.map((tenant) => {
          const business = tenant.businesses;
          const displayName = business?.branch_name?.trim() || business?.business_name?.trim() || 'Negocio';
          const companyLabel = business?.business_name?.trim() || companyName || 'Empresa';

          return (
            <button
              key={`${tenant.business_id}-${tenant.role}`}
              onClick={() => onSelect(tenant)}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-surface hover:border-primary/30 hover:shadow-sm transition-all duration-150 text-left group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                {isBranchMode ? (
                  <Store className="w-5 h-5 text-primary" />
                ) : (
                  <Building2 className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">{displayName}</p>
                {isBranchMode ? (
                  <p className="text-xs text-muted-foreground truncate">Empresa: {companyLabel}</p>
                ) : (
                  <p className="text-xs text-muted-foreground truncate">{business?.domain}</p>
                )}
                <p className="text-[11px] text-muted-foreground mt-1">Rol: {toRoleLabel(tenant.role)}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TenantSelector;
