import { useState } from "react";
import AuthOnboardingLayout from "@/components/auth/AuthOnboardingLayout";
import AuthLoginForm from "@/components/auth/AuthLoginForm";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (data: { email: string; password: string; remember: boolean }) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthOnboardingLayout>
      <div className="auth-container max-w-[520px]">
        {/* Card Header */}
        <div className="auth-card-header">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">M</span>
            </div>
            <span className="text-foreground font-semibold text-sm">Iniciar sesión en MangoPOS</span>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 sm:p-10">
          <AuthLoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </div>

        {/* Footer */}
        <div className="border-t border-border px-8 py-5 text-center">
          <p className="text-sm text-muted-foreground">
            ¿No posees una cuenta?{" "}
            <a href="/register?plan=pro&billing=monthly&trial=14" className="text-primary font-medium hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </AuthOnboardingLayout>
  );
};

export default LoginPage;
