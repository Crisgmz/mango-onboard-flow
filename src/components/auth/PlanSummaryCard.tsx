import { Check, Sparkles } from "lucide-react";
import { getVisiblePlans, type PlanInfo } from "@/lib/plans";
import { cn } from "@/lib/utils";

interface PlanSummaryCardProps {
  plan: PlanInfo;
  onSelectPlan?: (planId: string) => void;
}

const formatPrice = (plan: PlanInfo) => {
  const price = plan.billing === "yearly" ? plan.priceYearly ?? plan.price * 10 : plan.price;
  const billingLabel = plan.billing === "yearly" ? "/año" : "/mes";
  return { price, billingLabel };
};

const formatMoney = (value: number) => `US$${value.toFixed(2)}`;

const PlanSummaryCard = ({ plan, onSelectPlan }: PlanSummaryCardProps) => {
  const { price, billingLabel } = formatPrice(plan);
  const allPlans = getVisiblePlans(plan.billing, plan.trial);

  return (
    <div className="p-6 h-full lg:p-7 bg-[linear-gradient(180deg,hsl(var(--surface-soft))_0%,white_100%)]">
      <p className="auth-kicker">Selecciona tu plan</p>
      <h3 className="mt-2 text-[1.35rem] font-medium tracking-[-0.03em] text-foreground">Plan para tu cuenta</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Solo mostramos los planes disponibles en la web. Todos incluyen {plan.trial} días de prueba.
      </p>

      <div className="mt-6 space-y-3">
        {allPlans.map((item) => {
          const itemPrice = formatPrice(item);
          const selected = item.id === plan.id;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelectPlan?.(item.id)}
              className={cn(
                "w-full rounded-[10px] border bg-white p-4 transition-all text-left",
                selected
                  ? "border-primary shadow-[0_12px_30px_-20px_hsl(var(--primary)/0.7)] ring-1 ring-primary/10"
                  : "border-border hover:border-primary/30"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border",
                      selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-white"
                    )}
                  >
                    {selected && <Check className="h-3 w-3" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">Plan {item.name}</p>
                      {selected && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-primary">
                          Seleccionado
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.billing === "yearly" ? "Facturación anual" : "Facturación mensual"}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">{formatMoney(itemPrice.price)}{itemPrice.billingLabel}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-[10px] border border-border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Resumen del plan {plan.name}</p>
              <p className="text-xs text-muted-foreground">{plan.billing === "yearly" ? "Facturación anual" : "Facturación mensual"}</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-foreground">{formatMoney(price)}{billingLabel}</span>
        </div>
      </div>

      {plan.trial > 0 && (
        <div className="space-y-3 my-6">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-foreground">Total ahora</span>
            <span className="text-base font-medium text-foreground">US$0.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Después de {plan.trial} días</span>
            <span className="text-sm text-muted-foreground">{formatMoney(price)}</span>
          </div>
        </div>
      )}

      <div className="space-y-2.5 mb-6">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <Check className="w-2.5 h-2.5 text-success" />
            </div>
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanSummaryCard;
