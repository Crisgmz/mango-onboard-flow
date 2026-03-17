import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Correo no válido";
    if (!form.phone.trim()) errs.phone = "Ingresa tu número de teléfono";
    if (!form.password) errs.password = "Crea una contraseña";
    else if (form.password.length < 8) errs.password = "Mínimo 8 caracteres";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Las contraseñas no coinciden";
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
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Crea tu cuenta</h1>
      <p className="text-sm text-muted-foreground mb-1">
        Comienza a gestionar tu negocio con MangoPOS.
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Iniciar sesión
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Nombre completo</label>
          <input
            type="text"
            className="input-premium w-full"
            placeholder="Ej: María Rodríguez"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />
          {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Correo electrónico</label>
          <input
            type="email"
            className="input-premium w-full"
            placeholder="tu@email.com"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Teléfono</label>
          <input
            type="tel"
            className="input-premium w-full"
            placeholder="+1 (809) 555-0000"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="input-premium w-full pr-11"
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
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

        {/* Confirm password */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Confirmar contraseña</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className="input-premium w-full pr-11"
              placeholder="Repite tu contraseña"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Terms */}
        <div className="space-y-3 pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(e) => updateField("acceptTerms", e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
            />
            <span className="text-sm text-muted-foreground">
              Acepto los{" "}
              <a href="#" className="text-primary hover:underline font-medium">Términos y Condiciones</a>
            </span>
          </label>
          {errors.acceptTerms && <p className="text-xs text-destructive ml-6">{errors.acceptTerms}</p>}

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.acceptPrivacy}
              onChange={(e) => updateField("acceptPrivacy", e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
            />
            <span className="text-sm text-muted-foreground">
              Acepto la{" "}
              <a href="#" className="text-primary hover:underline font-medium">Política de Privacidad</a>
            </span>
          </label>
          {errors.acceptPrivacy && <p className="text-xs text-destructive ml-6">{errors.acceptPrivacy}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            "Crear cuenta"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterAccountForm;
