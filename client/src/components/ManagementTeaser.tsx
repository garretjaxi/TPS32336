import { useTranslation } from "react-i18next";
import { ArrowRight, TrendingUp, DollarSign, Star, BarChart3 } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const MGMT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446287426/E83KvqYJ4TGqcmgXCyYT4P/property-mgmt-bg-8zHASx5W8qjwj6V648Mv23.webp";

export default function ManagementTeaser() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  const stats = [
    { value: "15%", label: t("avgCommissionRate") },
    { value: "87%", label: t("averageOccupancy") },
    { value: "5-9k", label: t("avgMonthlyRevenue") },
    { value: "4.9★", label: t("ownerSatisfaction") },
  ];

  return (
    <section id="management" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${MGMT_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.01_55)]/95 via-[oklch(0.12_0.01_55)]/85 to-[oklch(0.12_0.01_55)]/60" />

      <div className="relative z-10 container">
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-label text-[oklch(0.68_0.15_65)]">{t("forPropertyOwners")}</span>
          <div className="gold-rule w-16 mx-auto my-4" />
          <h2 className="display-heading text-4xl md:text-5xl text-white mb-6">
            Earn More With <span className="italic text-[oklch(0.82_0.14_70)]">Orlando's Best</span> Property Manager
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            We help homeowners maximize their revenue while providing a completely hands-off management experience.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4">
                <div className="text-2xl font-bold text-[oklch(0.82_0.14_70)] mb-1 font-serif">
                  {stat.value}
                </div>
                <div className="text-white/80 text-xs uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={() => navigate("/property-management")}
            className="rounded-full px-10 py-6 text-lg bg-[oklch(0.82_0.14_70)] text-[oklch(0.12_0.01_55)] hover:bg-[oklch(0.92_0.14_70)]"
          >
            {t("viewManagementServices")} <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
