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
import { registerBusinessOnboarding } from "@/lib/auth";
import type { RegisterFormData } from "@/components/auth/RegisterAccountForm";
import type { BusinessFormData } from "@/components/auth/BusinessSetupForm";
import { AlertTriangle } from "lucide-react";

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
  const [registerData, setRegisterData] = useState<RegisterFormData | null>(null);
  const [businessData, setBusinessData] = useState<BusinessFormData | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

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
    setRegisterData(data);
    setSubmissionError(null);
    setCurrentStep(2);
  };

  const handleBusinessSetup = async (data: BusinessFormData) => {
    if (!registerData) {
      setSubmissionError("Primero debemos completar los datos de la cuenta.");
      setCurrentStep(1);
      return;
    }

    setBusinessData(data);
    setIsLoading(true);
    setSubmissionError(null);

    try {
      await registerBusinessOnboarding({
        fullName: registerData.fullName,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
        businessName: data.businessName,
        businessType: data.businessType,
        country: data.country,
        businessPhone: data.businessPhone,
        domain: data.subdomain,
        planCode: plan.id,
        billingCycle: plan.billing,
        trialDays: plan.trial,
        source: params.source,
        campaign: params.campaign,
      });

      setCurrentStep(3);
    } catch (error) {
      const message = error instanceof Error ? error.message : "No pudimos completar el registro. Verifica la configuración de Supabase e inténtalo de nuevo.";
      setSubmissionError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthOnboardingLayout>
      <div className="auth-container max-w-[920px]">
        <div className="auth-card-header">
          <div className="flex items-center gap-3">
            <div className="brand-mark h-9 w-9 rounded-xl text-[11px]">M</div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">Crea tu cuenta en MangoPOS</p>
              <p className="text-xs text-muted-foreground">Onboarding de nuevos negocios</p>
            </div>
          </div>
          <AuthStepper steps={STEPS} currentStep={currentStep} />
        </div>

        {submissionError && currentStep !== 3 && (
          <div className="mx-8 mt-6 flex items-start gap-3 rounded-[10px] border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive sm:mx-10 lg:mx-12">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>{submissionError}</p>
          </div>
        )}

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
              <div className="flex-[3] p-8 sm:p-10 lg:border-r lg:p-12 border-border">
                {currentStep === 1 && (
                  <RegisterAccountForm onSubmit={handleRegister} isLoading={isLoading} />
                )}
                {currentStep === 2 && (
                  <BusinessSetupForm onSubmit={handleBusinessSetup} isLoading={isLoading} />
                )}
              </div>

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
