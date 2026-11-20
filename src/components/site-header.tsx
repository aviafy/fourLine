"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";

interface BrandProps {
  name: string;
  logoPath: string;
}

export function Brand({ name, logoPath }: BrandProps) {
  return (
    <Link className="brand" href="/" aria-label={`${name} — მთავარი`}>
      <Image src={logoPath} alt="" width={600} height={94} unoptimized />
    </Link>
  );
}

export function SiteHeader({ name, logoPath, phone }: BrandProps & { phone?: { label: string; number: string } }) {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenFor(null);
        button.current?.focus();
      }
    }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Brand name={name} logoPath={logoPath} />
        <button ref={button} type="button" className="menu-toggle" aria-controls="main-navigation" aria-expanded={open}
          aria-label={open ? "მენიუს დახურვა" : "მენიუს გახსნა"} onClick={() => setOpenFor(open ? null : pathname)}>
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
        <nav id="main-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label="მთავარი მენიუ">
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}
              className={pathname.startsWith(href) ? "active" : ""} onClick={() => setOpenFor(null)}>{label}</Link>
          ))}
        </nav>
        <div className="nav-actions">
          {phone && <a className="nav-phone" href={`tel:${phone.number}`}><Phone size={16} aria-hidden />{phone.label}</a>}
          <Link className="button button-glass nav-cta" href="/contact#proposal">
            <span className="nav-cta-long">მოითხოვეთ შეთავაზება</span><span className="nav-cta-short">შეთავაზება</span><ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </header>
  );
}
