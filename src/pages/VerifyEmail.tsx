import AuthOnboardingLayout from "@/components/auth/AuthOnboardingLayout";
import EmailVerificationState from "@/components/auth/EmailVerificationState";
import { useSearchParams } from "react-router-dom";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || undefined;

  return (
    <AuthOnboardingLayout>
      <div className="auth-container p-8 sm:p-12">
        <EmailVerificationState email={email} onResend={() => {}} />
      </div>
    </AuthOnboardingLayout>
  );
};

export default VerifyEmailPage;
