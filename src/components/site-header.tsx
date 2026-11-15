"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";

export function Brand({ logoPath = "" }: { logoPath?: string }) {
  return (
    <Link className="brand" href="/" aria-label="FOURLINE — მთავარი">
      {logoPath ? <Image src={logoPath} alt="FOURLINE" width={135} height={32} /> : (
        <span aria-hidden="true"><strong>4</strong><span>LINE</span><i /></span>
      )}
    </Link>
  );
}

export function SiteHeader({ logoPath }: { logoPath: string }) {
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
        <Brand logoPath={logoPath} />
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
        <Link className="button button-outline nav-cta" href="/contact#proposal">
          <span className="nav-cta-long">შეთავაზების მოთხოვნა</span><span className="nav-cta-short">შეთავაზება</span><ArrowUpRight size={16} aria-hidden />
        </Link>
      </div>
    </header>
  );
}
