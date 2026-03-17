import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthOnboardingLayout from "@/components/auth/AuthOnboardingLayout";
import AuthStepper from "@/components/auth/AuthStepper";
import RegisterAccountForm from "@/components/auth/RegisterAccountForm";
import BusinessSetupForm from "@/components/auth/BusinessSetupForm";
import PlanSummaryCard from "@/components/auth/PlanSummaryCard";
import CompanySummaryCard from "@/components/auth/CompanySummaryCard";
import RedirectState from "@/components/auth/RedirectState";
import AuthErrorState from "@/components/auth/AuthErrorState";
import { parseOnboardingParams, getPlanInfo } from "@/lib/plans";
import type { RegisterFormData } from "@/components/auth/RegisterAccountForm";
import type { BusinessFormData } from "@/components/auth/BusinessSetupForm";

const STEPS = [
  { number: 1, label: "Crear Cuenta" },
  { number: 2, label: "Agregar Empresa" },
  { number: 3, label: "Iniciando tu cuenta" },
];

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const params = useMemo(() => parseOnboardingParams(searchParams), [searchParams]);
  const plan = useMemo(() => getPlanInfo(params), [params]);

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessFormData | null>(null);

  if (!plan) {
    return (
      <AuthOnboardingLayout>
        <div className="auth-container p-8 sm:p-12">
          <AuthErrorState type="plan_missing" />
        </div>
      </AuthOnboardingLayout>
    );
  }

  const handleRegister = (data: RegisterFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
    }, 1500);
  };

  const handleBusinessSetup = (data: BusinessFormData) => {
    setBusinessData(data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3);
    }, 1200);
  };

  return (
    <AuthOnboardingLayout>
      <div className="auth-container">
        {/* Card Header with Logo + Stepper */}
        <div className="auth-card-header">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">M</span>
            </div>
            <span className="text-foreground font-semibold text-sm hidden sm:block">Crea tu cuenta en MangoPOS</span>
          </div>
          <AuthStepper steps={STEPS} currentStep={currentStep} />
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {currentStep === 3 ? (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 sm:p-12"
            >
              <RedirectState subdomain={businessData?.subdomain} />
            </motion.div>
          ) : (
            <motion.div
              key={`step${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col lg:flex-row"
            >
              {/* Left: Form */}
              <div className="flex-[3] p-8 sm:p-10 lg:p-12 lg:border-r border-border">
                {currentStep === 1 && (
                  <RegisterAccountForm onSubmit={handleRegister} isLoading={isLoading} />
                )}
                {currentStep === 2 && (
                  <BusinessSetupForm onSubmit={handleBusinessSetup} isLoading={isLoading} />
                )}
              </div>

              {/* Right: Summary */}
              <div className="flex-[2] border-t lg:border-t-0">
                {currentStep === 1 && (
                  <PlanSummaryCard
                    plan={plan}
                    onChangePlan={() => window.open("https://mangopos.do/#planes", "_blank")}
                  />
                )}
                {currentStep === 2 && (
                  <CompanySummaryCard
                    companyName={businessData?.businessName}
                    subdomain={businessData?.subdomain}
                    plan={plan}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthOnboardingLayout>
  );
};

export default RegisterPage;
