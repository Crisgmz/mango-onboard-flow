import { useState } from "react";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface PasswordRecoveryFormProps {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}

const PasswordRecoveryForm = ({ onSubmit, isLoading }: PasswordRecoveryFormProps) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Ingresa tu correo"); return; }
    onSubmit(email);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-8">
        <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Revisa tu correo</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Te enviamos un enlace para restablecer tu contraseña a <span className="font-medium text-foreground">{email}</span>
        </p>
        <Link to="/login" className="text-sm text-primary font-medium hover:underline flex items-center justify-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver al login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-1">Recuperar contraseña</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Correo electrónico</label>
          <input
            type="email"
            className="input-premium w-full"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
          />
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar enlace"
          )}
        </button>
      </form>

      <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 mt-6">
        <ArrowLeft className="w-4 h-4" /> Volver al login
      </Link>
    </div>
  );
};

export default PasswordRecoveryForm;
