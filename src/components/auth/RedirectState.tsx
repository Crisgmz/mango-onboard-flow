import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Building2, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

interface RedirectStateProps {
  subdomain?: string;
}

const steps = [
  { label: "Configurando tu empresa", icon: Building2 },
  { label: "Verificando tu acceso", icon: ShieldCheck },
  { label: "Redirigiéndote al sistema", icon: ArrowRight },
];

const RedirectState = ({ subdomain }: RedirectStateProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setCurrentStep(1), 1500);
    const t2 = setTimeout(() => setCurrentStep(2), 3000);
    const t3 = setTimeout(() => {
      // In production: window.location.href = `https://${subdomain}.mangopos.do`
      setCurrentStep(3);
    }, 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [subdomain]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center max-w-md mx-auto">
      {/* Spinner */}
      <div className="relative w-16 h-16 mb-8">
        {currentStep < 3 ? (
          <div className="w-16 h-16 rounded-full border-4 border-muted border-t-primary animate-spin-slow" />
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 rounded-full bg-success flex items-center justify-center"
          >
            <Check className="w-8 h-8 text-success-foreground" />
          </motion.div>
        )}
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-2">
        {currentStep < 3 ? "Estamos preparando tu acceso" : "¡Todo listo!"}
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        {currentStep < 3
          ? "Esto solo toma unos segundos..."
          : `Tu cuenta está lista en ${subdomain || "tu"}.mangopos.do`}
      </p>

      <div className="w-full space-y-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isDone = currentStep > i;
          const isActive = currentStep === i;

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-3 text-left"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isDone ? "bg-success/10" : isActive ? "bg-primary/10" : "bg-muted"
              }`}>
                {isDone ? (
                  <Check className="w-4 h-4 text-success" />
                ) : isActive ? (
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                ) : (
                  <Icon className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                isDone ? "text-success" : isActive ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RedirectState;
