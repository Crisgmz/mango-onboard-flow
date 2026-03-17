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
    <div className="bg-surface-warm rounded-2xl p-6 h-full">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
        Tu plan seleccionado
      </h3>

      <div className="bg-surface rounded-xl p-5 shadow-sm border border-border/50 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="badge-plan">Plan {plan.name}</span>
          </div>
          {plan.trial > 0 && (
            <span className="badge-trial">
              <Sparkles className="w-3 h-3" />
              {plan.trial} días gratis
            </span>
          )}
        </div>

        <div className="mt-4 mb-4">
          <span className="text-3xl font-bold text-foreground">${price}</span>
          <span className="text-sm text-muted-foreground ml-1">{billingLabel}</span>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          {plan.billing === 'yearly'
            ? 'Facturación anual'
            : 'Facturación mensual'}
          {plan.trial > 0 && ` · Comienza después de ${plan.trial} días de prueba`}
        </p>

        <div className="space-y-2.5">
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
