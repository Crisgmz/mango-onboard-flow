import { useState } from "react";
import { ShieldCheck, Store, Zap, AlertTriangle } from "lucide-react";
import AuthOnboardingLayout from "@/components/auth/AuthOnboardingLayout";
import AuthLoginForm from "@/components/auth/AuthLoginForm";
import { login, getUserBusinesses } from "@/lib/auth";

const benefits = [
  {
    icon: Store,
    title: "Hecho para restaurantes",
    description: "Opera salón, mostrador y cocina desde un solo sistema.",
  },
  {
    icon: Zap,
    title: "Rápido en horas pico",
    description: "Un flujo ágil para vender, cobrar y despachar sin fricción.",
  },
  {
    icon: ShieldCheck,
    title: "Acceso seguro",
    description: "Controla usuarios, sucursales y permisos con mayor confianza.",
  },
];

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (data: { email: string; password: string; remember: boolean }) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const authData = await login({ email: data.email, password: data.password });

      if (!authData.user) {
        throw new Error("No se pudo iniciar sesión");
      }

      const businesses = await getUserBusinesses();

      if (!businesses || businesses.length === 0) {
        throw new Error("No tienes negocios asociados. Completa el registro.");
      }

      if (businesses.length === 1) {
        const domain = businesses[0].businesses?.domain;
        if (domain) {
          window.location.assign(`https://${domain}`);
          return;
        }
      }

      window.location.assign("/select-business");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Credenciales inválidas. Verifica tu email y contraseña.";
      setLoginError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthOnboardingLayout>
      <div className="auth-container auth-login-shell max-w-[1080px]">
        <div className="auth-card-header">
          <div className="flex items-center gap-3">
            <div className="brand-mark">M</div>
            <div>
              <p className="text-sm font-semibold text-foreground">MangoPOS</p>
              <p className="text-xs text-muted-foreground">Acceso central de clientes</p>
            </div>
          </div>
        </div>

        {loginError && (
          <div className="mx-8 mt-6 flex items-start gap-3 rounded-[10px] border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive sm:mx-10">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>{loginError}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_380px]">
          <div className="border-b border-border p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
            <AuthLoginForm onSubmit={handleLogin} isLoading={isLoading} />
          </div>

          <aside className="auth-side-panel p-8 sm:p-10 lg:p-12">
            <div className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              Portal de acceso
            </div>

            <h2 className="mt-5 text-[1.9rem] font-medium tracking-[-0.03em] text-foreground leading-tight">
              Controla tu operación desde cualquier sucursal.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground font-normal">
              Entra a tu cuenta para acceder a ventas, cocina, inventario, reportes y configuración de tu negocio.
            </p>

            <div className="mt-8 space-y-5">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{benefit.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        <div className="border-t border-border px-8 py-5 text-center sm:px-10">
          <p className="text-sm text-muted-foreground">
            ¿Todavía no tienes cuenta?{" "}
            <a href="/register" className="font-semibold text-primary hover:underline underline-offset-4">
              Crear cuenta
            </a>
          </p>
        </div>
      </div>
    </AuthOnboardingLayout>
  );
};

export default LoginPage;
