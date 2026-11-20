interface NavigationItem {
  href: string;
  label: string;
}

export const navigation: NavigationItem[] = [
  { href: "/services", label: "მომსახურება" },
  { href: "/shop", label: "მაღაზია" },
  { href: "/projects", label: "პროექტები" },
  { href: "/about", label: "ჩვენ შესახებ" },
  { href: "/contact", label: "კონტაქტი" },
];
