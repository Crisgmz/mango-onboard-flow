import { Building2, Globe, Check, Sparkles } from "lucide-react";
import type { PlanInfo } from "@/lib/plans";

interface CompanySummaryCardProps {
  companyName?: string;
  subdomain?: string;
  plan: PlanInfo;
}

const CompanySummaryCard = ({ companyName, subdomain, plan }: CompanySummaryCardProps) => {
  const price = plan.billing === 'yearly' ? plan.priceYearly ?? plan.price * 10 : plan.price;
  const billingLabel = plan.billing === 'yearly' ? '/año' : '/mes';

  return (
    <div className="bg-surface-warm rounded-2xl p-6 h-full">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
        Resumen de tu cuenta
      </h3>

      {/* Company preview */}
      <div className="bg-surface rounded-xl p-5 shadow-sm border border-border/50 mb-4">
        {companyName ? (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{companyName}</p>
              {subdomain && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  {subdomain}.mangopos.do
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Building2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tu empresa aparecerá aquí</p>
            </div>
          </div>
        )}

        <div className="border-t border-border/50 pt-3 mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Plan</span>
            <span className="badge-plan text-[10px]">Plan {plan.name}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Facturación</span>
            <span className="text-xs font-medium text-foreground">
              {plan.billing === 'yearly' ? 'Anual' : 'Mensual'}
            </span>
          </div>
          {plan.trial > 0 && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Total hoy</span>
              <span className="text-xs font-bold text-success">$0.00</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {plan.trial > 0 ? 'Después del trial' : 'Precio'}
            </span>
            <span className="text-xs font-semibold text-foreground">${price}{billingLabel}</span>
          </div>
        </div>
      </div>

      {plan.trial > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-success/5 border border-success/10">
          <Sparkles className="w-4 h-4 text-success flex-shrink-0" />
          <p className="text-xs text-success font-medium">
            {plan.trial} días de prueba gratis. Sin cargos hoy.
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanySummaryCard;
