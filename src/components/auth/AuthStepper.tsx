import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  label: string;
}

interface AuthStepperProps {
  steps: Step[];
  currentStep: number;
}

const AuthStepper = ({ steps, currentStep }: AuthStepperProps) => {
  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-center gap-0">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-150 border-2",
                    isCompleted && "bg-primary border-primary text-primary-foreground",
                    isActive && "border-primary text-primary bg-primary/5",
                    !isCompleted && !isActive && "border-border text-muted-foreground bg-surface"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium whitespace-nowrap hidden sm:block",
                    isActive && "text-foreground",
                    isCompleted && "text-primary",
                    !isActive && !isCompleted && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-16 sm:w-24 h-0.5 mx-3 mb-5 sm:mb-6 rounded-full transition-all duration-150",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuthStepper;
