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
      <div className="auth-container p-8 sm:p-12">
        <PasswordRecoveryForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </AuthOnboardingLayout>
  );
};

export default ForgotPasswordPage;
