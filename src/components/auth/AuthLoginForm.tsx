import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
    if (!email.trim()) errs.email = "Ingresa tu correo";
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
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label-field">Usuario / Email</label>
          <input
            type="email"
            className="input-premium w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="label-field">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="input-premium w-full pr-11"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
        </div>

        <Link to="/forgot-password" className="block text-sm text-primary hover:underline font-medium">
          Olvidó su contraseña
        </Link>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthLoginForm;
