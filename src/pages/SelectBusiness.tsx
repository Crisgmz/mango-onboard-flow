import AuthOnboardingLayout from "@/components/auth/AuthOnboardingLayout";
import TenantSelector from "@/components/auth/TenantSelector";

const MOCK_TENANTS = [
  { id: "1", name: "Restaurante El Mango", subdomain: "elmango", role: "Administrador" },
  { id: "2", name: "Café Central", subdomain: "cafecentral", role: "Gerente" },
  { id: "3", name: "Pizzería Don Mario", subdomain: "donmario", role: "Operador" },
];

const SelectBusinessPage = () => {
  const handleSelect = (tenant: { subdomain: string }) => {
    console.log("Redirecting to:", `${tenant.subdomain}.mangopos.do`);
  };

  return (
    <AuthOnboardingLayout>
      <div className="auth-container max-w-[520px]">
        <div className="auth-card-header">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">M</span>
            </div>
            <span className="text-foreground font-semibold text-sm">Selecciona tu negocio</span>
          </div>
        </div>
        <div className="p-8 sm:p-10">
          <TenantSelector tenants={MOCK_TENANTS} onSelect={handleSelect} />
        </div>
      </div>
    </AuthOnboardingLayout>
  );
};

export default SelectBusinessPage;
