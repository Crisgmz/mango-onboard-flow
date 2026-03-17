import AuthOnboardingLayout from "@/components/auth/AuthOnboardingLayout";
import TenantSelector from "@/components/auth/TenantSelector";

const MOCK_TENANTS = [
  { id: "1", name: "Restaurante El Mango", subdomain: "elmango", role: "Administrador" },
  { id: "2", name: "Café Central", subdomain: "cafecentral", role: "Gerente" },
  { id: "3", name: "Pizzería Don Mario", subdomain: "donmario", role: "Operador" },
];

const SelectBusinessPage = () => {
  const handleSelect = (tenant: { subdomain: string }) => {
    // In production: window.location.href = `https://${tenant.subdomain}.mangopos.do`
    console.log("Redirecting to:", `${tenant.subdomain}.mangopos.do`);
  };

  return (
    <AuthOnboardingLayout>
      <div className="auth-container p-8 sm:p-12">
        <TenantSelector tenants={MOCK_TENANTS} onSelect={handleSelect} />
      </div>
    </AuthOnboardingLayout>
  );
};

export default SelectBusinessPage;
