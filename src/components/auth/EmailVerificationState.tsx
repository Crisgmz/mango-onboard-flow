import { Mail, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

interface EmailVerificationStateProps {
  email?: string;
  onResend?: () => void;
  isResending?: boolean;
}

const EmailVerificationState = ({ email, onResend, isResending }: EmailVerificationStateProps) => {
  return (
    <div className="w-full max-w-md mx-auto text-center py-8">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
        <Mail className="w-8 h-8 text-primary" />
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-2">Verifica tu correo</h1>
      <p className="text-sm text-muted-foreground mb-2">
        Te enviamos un enlace de verificación a
      </p>
      {email && (
        <p className="text-sm font-semibold text-foreground mb-6">{email}</p>
      )}
      <p className="text-sm text-muted-foreground mb-8">
        Revisa tu bandeja de entrada y haz clic en el enlace para continuar.
      </p>

      <div className="space-y-3">
        <button
          onClick={onResend}
          disabled={isResending}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isResending ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Reenviar correo
        </button>
        <Link
          to="/register"
          className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ¿Correo incorrecto? Cambiar email
        </Link>
      </div>
    </div>
  );
};

export default EmailVerificationState;
