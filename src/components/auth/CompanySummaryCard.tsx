import { Globe, Sparkles } from "lucide-react";
import type { PlanInfo } from "@/lib/plans";

interface CompanySummaryCardProps {
  companyName?: string;
  subdomain?: string;
  plan: PlanInfo;
}

const CompanySummaryCard = ({ companyName, subdomain, plan }: CompanySummaryCardProps) => {
  const price = plan.billing === 'yearly' ? plan.priceYearly ?? plan.price * 10 : plan.price;
  const billingLabel = plan.billing === 'yearly' ? '/año' : '/mes';
  const formatMoney = (value: number) => `US$${value.toFixed(2)}`;

  return (
    <div className="p-7 h-full lg:p-8">
      <p className="auth-kicker">Resumen de empresa</p>
      <h3 className="mt-2 text-[1.45rem] font-medium tracking-[-0.03em] text-foreground">
        {companyName || "Tu negocio en MangoPOS"}
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Revisa la información principal antes de terminar la configuración inicial.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Globe className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Subdominio sugerido</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {subdomain ? `${subdomain}.mangopos.do` : "tunegocio.mangopos.do"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm font-medium text-foreground mb-4">Plan seleccionado</p>
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Plan {plan.name}</p>
                <p className="text-xs text-muted-foreground">{plan.billing === 'yearly' ? 'Facturación anual' : 'Facturación mensual'}</p>
              </div>
            </div>
            <span className="text-sm font-medium text-foreground">{formatMoney(price)}{billingLabel}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-foreground">Total ahora</span>
          <span className="text-base font-medium text-foreground">
            {plan.trial > 0 ? 'US$0.00' : formatMoney(price)}
          </span>
        </div>
        {plan.trial > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Después de {plan.trial} días</span>
            <span className="text-sm text-muted-foreground">{formatMoney(price)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanySummaryCard;
