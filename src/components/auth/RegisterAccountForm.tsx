import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

interface RegisterAccountFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading?: boolean;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

const RegisterAccountForm = ({ onSubmit, isLoading }: RegisterAccountFormProps) => {
  const [form, setForm] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptPrivacy: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.fullName.trim()) errs.fullName = "Ingresa tu nombre completo";
    if (!form.email.trim()) errs.email = "Ingresa tu correo electrónico";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Ingresa un correo válido";
    if (!form.phone.trim()) errs.phone = "Ingresa tu número de teléfono";
    if (!form.password) errs.password = "Crea una contraseña";
    else if (form.password.length < 8) errs.password = "Debe tener al menos 8 caracteres";
    if (!form.confirmPassword) errs.confirmPassword = "Confirma tu contraseña";
    else if (form.password !== form.confirmPassword) errs.confirmPassword = "Las contraseñas no coinciden";
    if (!form.acceptTerms) errs.acceptTerms = "Debes aceptar los términos";
    if (!form.acceptPrivacy) errs.acceptPrivacy = "Debes aceptar la política de privacidad";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const updateField = (field: keyof RegisterFormData, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  return (
    <div>
      <div className="mb-8">
        <p className="auth-kicker">Paso 1 de 3</p>
        <h1 className="auth-title mt-2">Crea tu cuenta</h1>
        <p className="auth-text mt-3">Empieza tu acceso a MangoPOS con los datos principales de tu cuenta.</p>
        <p className="mt-3 text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline underline-offset-4">
            Iniciar sesión
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label-field">Nombre completo</label>
          <div className="relative">
            <User className="input-icon" />
            <input
              type="text"
              className="input-premium w-full pl-11"
              placeholder="Ej. María Rodríguez"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
            />
          </div>
          {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
        </div>

        <div>
          <label className="label-field">Correo electrónico</label>
          <div className="relative">
            <Mail className="input-icon" />
            <input
              type="email"
              className="input-premium w-full pl-11"
              placeholder="tu@empresa.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>

        <div>
          <label className="label-field">Teléfono</label>
          <div className="relative">
            <Phone className="input-icon" />
            <input
              type="tel"
              className="input-premium w-full pl-11"
              placeholder="+1 809 555 0000"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>

        <div>
          <label className="label-field">Contraseña</label>
          <div className="relative">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className="input-premium w-full pl-11 pr-11"
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
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

        <div>
          <label className="label-field">Confirmar contraseña</label>
          <div className="relative">
            <Lock className="input-icon" />
            <input
              type={showConfirm ? "text" : "password"}
              className="input-premium w-full pl-11 pr-11"
              placeholder="Repite tu contraseña"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirm ? "Ocultar confirmación" : "Mostrar confirmación"}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-xs text-destructive">{errors.confirmPassword}</p>}
        </div>

        <div className="space-y-3 pt-1">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(e) => updateField("acceptTerms", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-sm leading-6 text-muted-foreground">
              Acepto los <a href="/terminos" className="font-medium text-primary hover:underline underline-offset-4">Términos y Condiciones</a>
            </span>
          </label>
          {errors.acceptTerms && <p className="ml-7 text-xs text-destructive">{errors.acceptTerms}</p>}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.acceptPrivacy}
              onChange={(e) => updateField("acceptPrivacy", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-sm leading-6 text-muted-foreground">
              Acepto la <a href="/privacidad" className="font-medium text-primary hover:underline underline-offset-4">Política de Privacidad</a>
            </span>
          </label>
          {errors.acceptPrivacy && <p className="ml-7 text-xs text-destructive">{errors.acceptPrivacy}</p>}
        </div>

        <button type="submit" disabled={isLoading} className="btn-primary mt-2 w-full flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            "Continuar"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterAccountForm;
