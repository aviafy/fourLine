export interface ImageAsset {
  src: string;
  alt: string;
  illustrative?: boolean;
  position?: string;
}

export const imagery = {
  hero: { src: "/images/engineering-hero.webp", alt: "თანამედროვე შენობის საინჟინრო ჭრილი ელექტროგაყვანილობითა და საკაბელო არხებით", illustrative: true },
  facade: { src: "/images/facade.webp", alt: "ორი ბეტონის ფასადის გეომეტრია ქვედა ხედიდან", illustrative: true },
  conduit: { src: "/images/conduit.webp", alt: "საკაბელო არხები ბეტონის დერეფნის ჭერზე", illustrative: true },
  panels: { src: "/images/panels.webp", alt: "ელექტროგამანაწილებელი ფარების რიგი ტექნიკურ ოთახში", illustrative: true },
  fire: { src: "/images/alarm.webp", alt: "კვამლის დეტექტორი ჭერზე და სახანძრო განგაშის ღილაკი კედელზე", illustrative: true, position: "center 18%" },
  access: { src: "/images/access-control.webp", alt: "ვიდეოკამერა და დაშვების ბარათის წამკითხველი ოფისის შესასვლელთან", illustrative: true, position: "center 20%" },
  network: { src: "/images/network.webp", alt: "სტრუქტურირებული კაბელები ქსელის კარადაში", illustrative: true },
} satisfies Record<string, ImageAsset>;
