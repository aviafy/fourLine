import { Label, TextLink } from "@/components/shared";

export default function NotFound() {
  return <section className="container section-pad prose-block">
    <Label>404</Label><h1>გვერდი ვერ მოიძებნა</h1><p>გადადით მთავარ გვერდზე ან იხილეთ მომსახურებების ჩამონათვალი.</p>
    <div className="flex flex-wrap gap-6"><TextLink href="/">მთავარი გვერდი</TextLink><TextLink href="/services">მომსახურება</TextLink></div>
  </section>;
}
