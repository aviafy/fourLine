"use client";

import Image from "next/image";
import {
  Camera, Cable, Flame, House, LayoutGrid, Network, Search, ShieldCheck, Speaker, X, Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { shopCategories, type ShopCategory, type ShopProduct } from "@/data/shop";
import styles from "./shop.module.css";

const categoryIcons = {
  cameras: Camera,
  cables: Cable,
  electrical: Zap,
  networking: Network,
  access: ShieldCheck,
  fire: Flame,
  smart: House,
  audiovisual: Speaker,
};

function normalizeSearch(text: string) {
  return text.toLocaleLowerCase("ka").replace(/[‐‑–—]/gu, "-");
}

export function ShopCatalog({ products }: { products: ShopProduct[] }) {
  const [category, setCategory] = useState<ShopCategory | "all">("all");
  const [search, setSearch] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const words = normalizeSearch(search).trim().split(/\s+/u).filter(Boolean);
  const filtered = products.filter((product) => {
    if (category !== "all" && product.category !== category) return false;

    const text = normalizeSearch([
      product.name, product.model, product.description, shopCategories[product.category].label,
      ...product.specs,
    ].join(" "));
    return words.every((word) => text.includes(word));
  });

  function clearSearch() {
    setSearch("");
    searchInput.current?.focus();
  }

  function clearFilters() {
    setCategory("all");
    clearSearch();
  }

  return (
    <section className={styles.catalog} aria-labelledby="shop-catalog-title">
      <div className={`container ${styles.catalogLayout}`}>
        <aside className={styles.categories} aria-labelledby="shop-categories-title">
          <h2 id="shop-categories-title">კატეგორიები</h2>
          <ul className={styles.categoryList}>
            <li>
              <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")}>
                <LayoutGrid size={18} aria-hidden /> ყველა პროდუქტი
              </button>
            </li>
            {Object.entries(shopCategories).map(([key, { label }]) => {
              const id = key as ShopCategory;
              const Icon = categoryIcons[id];
              return (
                <li key={id}>
                  <button type="button" aria-pressed={category === id} onClick={() => setCategory(id)}>
                    <Icon size={18} aria-hidden /> {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className={styles.results}>
          <div className={styles.toolbar}>
            <div>
              <h2 id="shop-catalog-title">{category === "all" ? "პროდუქტები" : shopCategories[category].label}</h2>
              <p role="status">{filtered.length} პროდუქტი</p>
            </div>
            <div className={styles.search} role="search" aria-label="კატალოგი">
              <label htmlFor="shop-search" className="sr-only">პროდუქტის ძებნა</label>
              <Search size={18} aria-hidden />
              <input
                id="shop-search"
                ref={searchInput}
                type="search"
                placeholder="სახელი ან მოდელი"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button type="button" aria-label="საძიებო ტექსტის გასუფთავება" onClick={clearSearch}>
                  <X size={17} aria-hidden />
                </button>
              )}
            </div>
          </div>

          {category !== "all" && <p className={styles.categoryDescription}>{shopCategories[category].description}</p>}

          {filtered.length > 0 ? (
            <ul className={styles.productGrid}>
              {filtered.map((product) => (
                <li key={product.id}>
                  <article className={styles.product}>
                    <div className={styles.productPhoto}>
                      <Image
                        src={`/images/shop/${product.id}.webp`}
                        alt=""
                        width={640}
                        height={420}
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                    <div className={styles.productBody}>
                      <p className={styles.productCategory}>{shopCategories[product.category].label}</p>
                      <h3>{product.name}</h3>
                      <a className={styles.productModel} href={product.source} lang="en" translate="no">{product.model}</a>
                      <p className={styles.productDescription}>{product.description}</p>
                      <ul className={styles.specs} aria-label="მახასიათებლები">
                        {product.specs.map((spec) => <li key={spec}>{spec}</li>)}
                      </ul>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>
              <h3>პროდუქტი ვერ მოიძებნა</h3>
              <p>შეცვალეთ საძიებო სიტყვა ან აირჩიეთ სხვა კატეგორია.</p>
              <button type="button" className="button button-outline" onClick={clearFilters}>ფილტრების გასუფთავება</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
