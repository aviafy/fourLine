import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared";
import { company } from "@/data/company";
import { imagery } from "@/data/images";
import { shopProducts } from "@/data/shop";
import { pageMetadata } from "@/lib/seo";
import { ShopCatalog } from "./shop-catalog";
import styles from "./shop.module.css";

export const metadata = pageMetadata({
  title: "მაღაზია — მოწყობილობების კატალოგი",
  description: "VoltNet-ის ელექტრო და სუსტი დენების მოწყობილობების კატალოგი. კამერები, კაბელები, ქსელი, უსაფრთხოება და ჭკვიანი სახლი.",
  path: "/shop",
  image: imagery.network,
});

export default function ShopPage() {
  const phone = company.phones[0];

  return (
    <>
      <section className={styles.hero} aria-labelledby="shop-title">
        <div className={styles.heroPhoto}>
          <Image src={imagery.network.src} alt="" fill sizes="(max-width: 720px) 100vw, 65vw" preload />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <Breadcrumbs items={[{ href: "/shop", label: "მაღაზია" }]} />
          <p className={styles.heroLabel} lang="en">Electrical &amp; Low Voltage Systems</p>
          <h1 id="shop-title">მოწყობილობების <span>კატალოგი</span></h1>
          <p className={styles.heroDescription}>
            კამერები, კაბელები და ელექტროაღჭურვილობა, ქსელის, უსაფრთხოებისა და ჭკვიანი სახლის სისტემები.
          </p>
        </div>
      </section>

      <ShopCatalog products={shopProducts} />

      <section className={styles.inquiry} aria-labelledby="shop-inquiry-title">
        <div className={`container ${styles.inquiryInner}`}>
          <div>
            <h2 id="shop-inquiry-title">გსურთ ფასის ან ხელმისაწვდომობის დაზუსტება?</h2>
            <p>დაგვიკავშირდით და გვითხარით პროდუქტის მოდელი და სასურველი რაოდენობა.</p>
          </div>
          <div className={styles.inquiryActions}>
            {phone && <a className="button button-outline" href={`tel:${phone.number}`}>{phone.label}</a>}
            <Link href="/contact#proposal" className="button button-accent">საკონტაქტო ფორმა</Link>
          </div>
        </div>
      </section>
    </>
  );
}
