import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthLoginFormProps {
  onSubmit: (data: { email: string; password: string; remember: boolean }) => void;
  isLoading?: boolean;
}

const AuthLoginForm = ({ onSubmit, isLoading }: AuthLoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "Ingresa tu correo electrónico";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Ingresa un correo válido";
    if (!password) errs.password = "Ingresa tu contraseña";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit({ email, password, remember });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <p className="auth-kicker">Acceso seguro</p>
        <h1 className="auth-title mt-2">Iniciar sesión</h1>
        <p className="auth-text mt-3">
          Accede a tu cuenta de MangoPOS para continuar con la operación de tu negocio.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label-field">Correo electrónico</label>
          <div className="relative">
            <Mail className="input-icon" />
            <input
              type="email"
              className="input-premium w-full pl-11"
              placeholder="tu@empresa.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((current) => ({ ...current, email: undefined }));
              }}
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="label-field mb-0">Contraseña</label>
            <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline underline-offset-4">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className="input-premium w-full pl-11 pr-12"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((current) => ({ ...current, password: undefined }));
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
        </div>

        <label className="flex items-center gap-2.5 pt-1 text-sm text-muted-foreground cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          Mantener mi sesión iniciada
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary mt-2 w-full flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            "Iniciar sesión"
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthLoginForm;
