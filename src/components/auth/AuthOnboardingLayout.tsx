import { ReactNode } from "react";

interface AuthOnboardingLayoutProps {
  children: ReactNode;
}

const AuthOnboardingLayout = ({ children }: AuthOnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main */}
      <main className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          MangoPOS © {new Date().getFullYear()}{" "}
          <a href="#" className="text-primary hover:underline">Términos de Uso</a>
          {" & "}
          <a href="#" className="text-primary hover:underline">Privacidad</a>
        </p>
      </footer>
    </div>
  );
};

export default AuthOnboardingLayout;
