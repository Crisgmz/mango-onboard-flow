import { useState, useEffect } from "react";
import { Loader2, Globe } from "lucide-react";
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
    if (!form.businessSize) errs.businessSize = "Selecciona el tamaño";
    if (!form.subdomain.trim()) errs.subdomain = "Ingresa un subdominio";
    else if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(form.subdomain))
      errs.subdomain = "Solo letras minúsculas, números y guiones";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const updateField = (field: keyof BusinessFormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const selectClasses =
    "input-premium w-full appearance-none bg-surface cursor-pointer";

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Configura tu empresa</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Cuéntanos sobre tu negocio para personalizar tu experiencia.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Nombre del negocio</label>
          <input
            type="text"
            className="input-premium w-full"
            placeholder="Ej: Restaurante El Mango"
            value={form.businessName}
            onChange={(e) => updateField("businessName", e.target.value)}
          />
          {errors.businessName && <p className="text-xs text-destructive mt-1">{errors.businessName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Tipo de negocio</label>
          <select
            className={selectClasses}
            value={form.businessType}
            onChange={(e) => updateField("businessType", e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.businessType && <p className="text-xs text-destructive mt-1">{errors.businessType}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">País</label>
            <select
              className={selectClasses}
              value={form.country}
              onChange={(e) => updateField("country", e.target.value)}
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.country && <p className="text-xs text-destructive mt-1">{errors.country}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Moneda</label>
            <select
              className={selectClasses}
              value={form.currency}
              onChange={(e) => updateField("currency", e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
            {errors.currency && <p className="text-xs text-destructive mt-1">{errors.currency}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Tamaño del negocio</label>
          <select
            className={selectClasses}
            value={form.businessSize}
            onChange={(e) => updateField("businessSize", e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {BUSINESS_SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.businessSize && <p className="text-xs text-destructive mt-1">{errors.businessSize}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Teléfono del negocio</label>
          <input
            type="tel"
            className="input-premium w-full"
            placeholder="+1 (809) 555-0000"
            value={form.businessPhone}
            onChange={(e) => updateField("businessPhone", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Subdominio</label>
          <div className="flex items-center">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Globe className="w-4 h-4" />
              </div>
              <input
                type="text"
                className="input-premium w-full pl-9 pr-[130px] rounded-r-none"
                placeholder="tunegocio"
                value={form.subdomain}
                onChange={(e) => {
                  setSlugEdited(true);
                  updateField("subdomain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
                }}
              />
            </div>
            <div className="h-12 px-4 flex items-center bg-muted border border-l-0 border-border rounded-r-xl text-sm text-muted-foreground font-medium">
              .mangopos.do
            </div>
          </div>
          {errors.subdomain && <p className="text-xs text-destructive mt-1">{errors.subdomain}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Configurando...
            </>
          ) : (
            "Agregar empresa"
          )}
        </button>
      </form>
    </div>
  );
};

export default BusinessSetupForm;
export type { BusinessFormData as BusinessSetupData };
