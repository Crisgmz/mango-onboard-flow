import { Check, Sparkles } from "lucide-react";
import type { PlanInfo } from "@/lib/plans";

interface PlanSummaryCardProps {
  plan: PlanInfo;
  onChangePlan?: () => void;
}

const PlanSummaryCard = ({ plan, onChangePlan }: PlanSummaryCardProps) => {
  const price = plan.billing === 'yearly' ? plan.priceYearly ?? plan.price * 10 : plan.price;
  const billingLabel = plan.billing === 'yearly' ? '/año' : '/mes';

  return (
    <div className="p-6 h-full">
      <h3 className="text-base font-semibold text-foreground mb-4">Tu suscripción</h3>

      <div className="rounded-lg border border-border p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Plan {plan.name}</p>
              <p className="text-xs text-muted-foreground">
                {plan.billing === 'yearly' ? 'Facturación anual' : 'Facturación mensual'}
              </p>
            </div>
          </div>
          <span className="text-sm font-semibold text-foreground">${price}.00{billingLabel}</span>
        </div>
      </div>

      {plan.trial > 0 && (
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-foreground">Total Ahora</span>
            <span className="text-base font-bold text-foreground">$0.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Después de {plan.trial}-días</span>
            <span className="text-sm text-muted-foreground">US${price}.00</span>
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

      {onChangePlan && (
        <button
          onClick={onChangePlan}
          className="text-xs text-muted-foreground hover:text-primary transition-colors duration-150 underline underline-offset-2"
        >
          Cambiar plan
        </button>
      )}
    </div>
  );
};

export default PlanSummaryCard;
