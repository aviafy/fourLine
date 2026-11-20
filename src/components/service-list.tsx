import Link from "next/link";
import { ArrowUpRight, Building2, Cable, Flame, Radio, PanelsTopLeft, Zap } from "lucide-react";
import { services, type Service } from "@/data/services";

const icons = { power: Zap, panel: PanelsTopLeft, fire: Flame, signal: Radio, network: Cable, building: Building2 };

export function ServiceList({ entries = services, compact = false }: { entries?: Service[]; compact?: boolean }) {
  return (
    <ul className={compact ? "service-grid service-grid-compact" : "service-grid"}>
      {entries.map((service) => {
        const Icon = icons[service.icon];
        return (
          <li key={service.slug}>
            <Link href={`/services/${service.slug}`} className="service-card">
              <div className="service-card-top">
                <span className="service-icon"><Icon size={23} strokeWidth={1.65} aria-hidden /></span>
                {!compact && <ArrowUpRight className="card-arrow" size={19} aria-hidden />}
              </div>
              {compact
                ? <span className="service-name">{service.shortTitle}</span>
                : <><h3>{service.shortTitle}</h3><p>{service.summary}</p></>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
