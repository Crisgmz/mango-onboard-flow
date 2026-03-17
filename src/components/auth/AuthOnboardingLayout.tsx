import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthOnboardingLayoutProps {
  children: ReactNode;
}

const AuthOnboardingLayout = ({ children }: AuthOnboardingLayoutProps) => {
  return (
    <div className="min-h-screen auth-shell flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
        {children}
      </main>

      <footer className="w-full px-6 pb-8 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground">
          MangoPOS © {new Date().getFullYear()}{" "}
          <Link to="/terminos" className="text-primary hover:underline underline-offset-4">
            Términos de Uso
          </Link>
          {" "}&amp;{" "}
          <Link to="/privacidad" className="text-primary hover:underline underline-offset-4">
            Privacidad
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default AuthOnboardingLayout;
