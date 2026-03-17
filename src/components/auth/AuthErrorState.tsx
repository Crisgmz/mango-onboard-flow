import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

export type AuthErrorType =
  | "plan_missing"
  | "token_invalid"
  | "tenant_not_found"
  | "no_business"
  | "business_inactive"
  | "session_expired"
  | "no_permission"
  | "subdomain_invalid";

interface AuthErrorStateProps {
  type: AuthErrorType;
}

const ERROR_CONFIG: Record<AuthErrorType, { title: string; description: string; cta: string; ctaLink: string }> = {
  plan_missing: {
    title: "No encontramos un plan seleccionado",
    description: "Parece que llegaste sin un plan activo. Vuelve a nuestra página de planes para elegir el ideal para tu negocio.",
    cta: "Volver a planes",
    ctaLink: "https://mangopos.do/#planes",
  },
  token_invalid: {
    title: "Enlace no válido",
    description: "El enlace que usaste ha expirado o no es válido. Solicita uno nuevo para continuar.",
    cta: "Solicitar nuevo enlace",
    ctaLink: "/forgot-password",
  },
  tenant_not_found: {
    title: "Negocio no encontrado",
    description: "No pudimos encontrar el negocio que buscas. Verifica la URL o contacta a soporte.",
    cta: "Ir al inicio",
    ctaLink: "/login",
  },
  no_business: {
    title: "Sin empresa configurada",
    description: "Tu cuenta no tiene una empresa asociada. Completa el proceso de registro para continuar.",
    cta: "Completar registro",
    ctaLink: "/register?plan=base&billing=monthly&trial=14",
  },
  business_inactive: {
    title: "Empresa inactiva",
    description: "Tu empresa está actualmente inactiva. Contacta a soporte para reactivar tu cuenta.",
    cta: "Contactar soporte",
    ctaLink: "mailto:soporte@mangopos.do",
  },
  session_expired: {
    title: "Sesión expirada",
    description: "Tu sesión ha expirado por seguridad. Inicia sesión nuevamente para continuar.",
    cta: "Iniciar sesión",
    ctaLink: "/login",
  },
  no_permission: {
    title: "Sin permisos",
    description: "No tienes los permisos necesarios para acceder a este recurso. Contacta al administrador de tu cuenta.",
    cta: "Volver al inicio",
    ctaLink: "/login",
  },
  subdomain_invalid: {
    title: "Subdominio no válido",
    description: "El subdominio que ingresaste no es válido o ya está en uso. Intenta con otro nombre.",
    cta: "Intentar de nuevo",
    ctaLink: "/register",
  },
};

const AuthErrorState = ({ type }: AuthErrorStateProps) => {
  const config = ERROR_CONFIG[type];

  return (
    <div className="w-full max-w-md mx-auto text-center py-8">
      <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-7 h-7 text-destructive" />
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-2">{config.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">{config.description}</p>

      {config.ctaLink.startsWith("http") || config.ctaLink.startsWith("mailto") ? (
        <a
          href={config.ctaLink}
          className="btn-primary inline-flex items-center justify-center gap-2 px-8"
        >
          {config.cta}
        </a>
      ) : (
        <Link
          to={config.ctaLink}
          className="btn-primary inline-flex items-center justify-center gap-2 px-8"
        >
          {config.cta}
        </Link>
      )}

      <div className="mt-4">
        <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver al login
        </Link>
      </div>
    </div>
  );
};

export default AuthErrorState;
