import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import AuthOnboardingLayout from "@/components/auth/AuthOnboardingLayout";
import PasswordRecoveryForm from "@/components/auth/PasswordRecoveryForm";
import { forgotPassword } from "@/lib/auth";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  const handleSubmit = async (email: string) => {
    setIsLoading(true);
    setRecoveryError(null);
    setRecoverySuccess(false);

    try {
      await forgotPassword(email);
      setRecoverySuccess(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "No pudimos enviar el enlace. Verifica el email e inténtalo de nuevo.";
      setRecoveryError(message);
    } finally {
      setIsLoading(false);
    }
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

        {recoveryError && (
          <div className="mx-8 mt-6 flex items-start gap-3 rounded-[10px] border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>{recoveryError}</p>
          </div>
        )}

        <div className="p-8 sm:p-10">
          <PasswordRecoveryForm 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
            success={recoverySuccess}
          />
        </div>
      </div>
    </AuthOnboardingLayout>
  );
};

export default ForgotPasswordPage;
