import { useState } from "react";
import AuthOnboardingLayout from "@/components/auth/AuthOnboardingLayout";
import PasswordRecoveryForm from "@/components/auth/PasswordRecoveryForm";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (email: string) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <AuthOnboardingLayout>
      <div className="auth-container max-w-[520px]">
        <div className="auth-card-header">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">M</span>
            </div>
            <span className="text-foreground font-semibold text-sm">Recuperar contraseña</span>
          </div>
        </div>
        <div className="p-8 sm:p-10">
          <PasswordRecoveryForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </AuthOnboardingLayout>
  );
};

export default ForgotPasswordPage;
