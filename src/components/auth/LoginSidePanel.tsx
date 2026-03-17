import { ShieldCheck, Utensils, BarChart3, Zap } from "lucide-react";

const LoginSidePanel = () => {
  const features = [
    { icon: Utensils, title: "Hecho para restaurantes", desc: "Diseñado desde cero para negocios de comida y bebida." },
    { icon: BarChart3, title: "Reportes en tiempo real", desc: "Toma decisiones con datos actualizados al instante." },
    { icon: Zap, title: "Rápido y confiable", desc: "Interfaz veloz que no falla en las horas pico." },
    { icon: ShieldCheck, title: "Seguridad empresarial", desc: "Tus datos protegidos con los más altos estándares." },
  ];

  return (
    <div className="bg-surface-warm rounded-2xl p-6 h-full">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-5">
        ¿Por qué MangoPOS?
      </h3>
      <div className="space-y-5">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{f.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoginSidePanel;
