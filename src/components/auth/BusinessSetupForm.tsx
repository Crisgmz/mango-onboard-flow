import { useState, useEffect } from "react";
import { Building2, Globe, Loader2, Phone, MapPin, BriefcaseBusiness } from "lucide-react";
import {
  generateSlug,
  BUSINESS_TYPES,
  BUSINESS_SIZES,
  COUNTRIES,
  CURRENCIES,
} from "@/lib/plans";

interface BusinessSetupFormProps {
  onSubmit: (data: BusinessFormData) => void;
  isLoading?: boolean;
}

export interface BusinessFormData {
  businessName: string;
  businessType: string;
  country: string;
  currency: string;
  businessSize: string;
  businessPhone: string;
  subdomain: string;
}

const BusinessSetupForm = ({ onSubmit, isLoading }: BusinessSetupFormProps) => {
  const [form, setForm] = useState<BusinessFormData>({
    businessName: "",
    businessType: "",
    country: "República Dominicana",
    currency: "DOP",
    businessSize: "",
    businessPhone: "",
    subdomain: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessFormData, string>>>({});
  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    if (!slugEdited && form.businessName) {
      setForm((f) => ({ ...f, subdomain: generateSlug(f.businessName) }));
    }
  }, [form.businessName, slugEdited]);

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.businessName.trim()) errs.businessName = "Ingresa el nombre de tu negocio";
    if (!form.businessType) errs.businessType = "Selecciona el tipo de negocio";
    if (!form.country) errs.country = "Selecciona un país";
    if (!form.currency) errs.currency = "Selecciona una moneda";
    if (!form.businessSize) errs.businessSize = "Selecciona el tamaño del negocio";
    if (!form.subdomain.trim()) errs.subdomain = "Ingresa un subdominio";
    else if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(form.subdomain)) errs.subdomain = "Solo letras minúsculas, números y guiones";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const updateField = (field: keyof BusinessFormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const selectClasses = "input-premium w-full appearance-none bg-white cursor-pointer";

  return (
    <div>
      <div className="mb-8">
        <p className="auth-kicker">Paso 2 de 3</p>
        <h1 className="auth-title mt-2">Configura tu empresa</h1>
        <p className="auth-text mt-3">Completa los datos principales del negocio y define el subdominio con el que entrarás al sistema.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label-field">Nombre del negocio</label>
          <div className="relative">
            <Building2 className="input-icon" />
            <input
              type="text"
              className="input-premium w-full pl-11"
              placeholder="Ej. Restaurante El Mango"
              value={form.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
            />
          </div>
          {errors.businessName && <p className="mt-1 text-xs text-destructive">{errors.businessName}</p>}
        </div>

        <div>
          <label className="label-field">Tipo de negocio</label>
          <div className="relative">
            <BriefcaseBusiness className="input-icon" />
            <select className={`${selectClasses} pl-11`} value={form.businessType} onChange={(e) => updateField("businessType", e.target.value)}>
              <option value="">Selecciona el tipo de negocio</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          {errors.businessType && <p className="mt-1 text-xs text-destructive">{errors.businessType}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field">País</label>
            <div className="relative">
              <MapPin className="input-icon" />
              <select className={`${selectClasses} pl-11`} value={form.country} onChange={(e) => updateField("country", e.target.value)}>
                <option value="">Selecciona un país</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            {errors.country && <p className="mt-1 text-xs text-destructive">{errors.country}</p>}
          </div>

          <div>
            <label className="label-field">Moneda</label>
            <select className={selectClasses} value={form.currency} onChange={(e) => updateField("currency", e.target.value)}>
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>{currency.name}</option>
              ))}
            </select>
            {errors.currency && <p className="mt-1 text-xs text-destructive">{errors.currency}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field">Tamaño del negocio</label>
            <select className={selectClasses} value={form.businessSize} onChange={(e) => updateField("businessSize", e.target.value)}>
              <option value="">Selecciona una opción</option>
              {BUSINESS_SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.businessSize && <p className="mt-1 text-xs text-destructive">{errors.businessSize}</p>}
          </div>

          <div>
            <label className="label-field">Teléfono del negocio</label>
            <div className="relative">
              <Phone className="input-icon" />
              <input
                type="tel"
                className="input-premium w-full pl-11"
                placeholder="+1 809 555 0000"
                value={form.businessPhone}
                onChange={(e) => updateField("businessPhone", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="label-field">Subdominio</label>
          <div className="relative">
            <Globe className="input-icon" />
            <input
              type="text"
              className="input-premium w-full pl-11"
              placeholder="tunegocio"
              value={form.subdomain}
              onChange={(e) => {
                setSlugEdited(true);
                updateField("subdomain", generateSlug(e.target.value));
              }}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Tu acceso quedará como <span className="font-medium text-foreground">{form.subdomain || "tunegocio"}.mangopos.do</span></p>
          {errors.subdomain && <p className="mt-1 text-xs text-destructive">{errors.subdomain}</p>}
        </div>

        <button type="submit" disabled={isLoading} className="btn-primary mt-2 w-full flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Configurando empresa...
            </>
          ) : (
            "Continuar"
          )}
        </button>
      </form>
    </div>
  );
};

export default BusinessSetupForm;
export type { BusinessFormData as BusinessSetupData };
