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
    <div className="flex items-center gap-0">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-medium transition-all duration-150",
                  isCompleted && "bg-primary text-primary-foreground",
                  isActive && "bg-primary text-primary-foreground shadow-sm",
                  !isCompleted && !isActive && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : step.number}
              </div>
              <span
                className={cn(
                  "hidden whitespace-nowrap text-sm font-normal sm:block",
                  (isActive || isCompleted) && "text-foreground",
                  !isActive && !isCompleted && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mx-3 h-px w-8 sm:w-14 transition-all duration-150",
                  isCompleted ? "bg-primary/70" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AuthStepper;
