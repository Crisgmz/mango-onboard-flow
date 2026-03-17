import { useState } from "react";
import AuthOnboardingLayout from "@/components/auth/AuthOnboardingLayout";
import AuthLoginForm from "@/components/auth/AuthLoginForm";
import LoginSidePanel from "@/components/auth/LoginSidePanel";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (data: { email: string; password: string; remember: boolean }) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // In production: redirect to tenant
    }, 1500);
  };

  return (
    <AuthOnboardingLayout>
      <div className="auth-container">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-[3] p-8 sm:p-10 lg:p-12">
            <AuthLoginForm onSubmit={handleLogin} isLoading={isLoading} />
          </div>
          <div className="flex-[2] lg:border-l border-t lg:border-t-0 border-border">
            <LoginSidePanel />
          </div>
        </div>
      </div>
    </AuthOnboardingLayout>
  );
};

export default LoginPage;
