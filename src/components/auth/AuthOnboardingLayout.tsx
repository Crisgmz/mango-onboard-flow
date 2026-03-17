import { ReactNode } from "react";

interface AuthOnboardingLayoutProps {
  children: ReactNode;
}

const AuthOnboardingLayout = ({ children }: AuthOnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full py-5 px-6">
        <div className="max-w-[1100px] mx-auto flex items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="text-foreground font-semibold text-lg tracking-tight">MangoPOS</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-start justify-center px-4 pb-12 pt-2">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} MangoPOS. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default AuthOnboardingLayout;
