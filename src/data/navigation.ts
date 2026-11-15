interface NavigationItem {
  href: string;
  label: string;
}

export const navigation: NavigationItem[] = [
  { href: "/about", label: "ჩვენ შესახებ" },
  { href: "/services", label: "მომსახურება" },
  { href: "/projects", label: "პროექტები" },
  { href: "/contact", label: "კონტაქტი" },
];
