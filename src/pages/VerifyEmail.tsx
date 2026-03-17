import AuthOnboardingLayout from "@/components/auth/AuthOnboardingLayout";
import EmailVerificationState from "@/components/auth/EmailVerificationState";
import { useSearchParams } from "react-router-dom";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || undefined;

  return (
    <AuthOnboardingLayout>
      <div className="auth-container max-w-[520px]">
        <div className="auth-card-header">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">M</span>
            </div>
            <span className="text-foreground font-semibold text-sm">Verifica tu correo</span>
          </div>
        </div>
        <div className="p-8 sm:p-10">
          <EmailVerificationState email={email} onResend={() => {}} />
        </div>
      </div>
    </AuthOnboardingLayout>
  );
};

export default VerifyEmailPage;
