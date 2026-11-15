import { UserRound } from "lucide-react";
import { founders } from "@/data/founders";
import { publishedProjects } from "@/data/projects";
import { Label, Photo, TextLink } from "./shared";

export function Founders({ full = false }: { full?: boolean }) {
  return (
    <section className="founders-section section-pad" id="founders">
      <div className="container">
        <div className="section-head founders-head">
          <div><Label>დამფუძნებლები</Label><h2>გამოცდილება, რომელიც<br className="desktop-break" /> დგას Fourline-ის უკან</h2></div>
          <p>FOURLINE ახლად დაფუძნებული კომპანიაა. მის საფუძველს ორი დამფუძნებლის პრაქტიკული გამოცდილება ქმნის. თითოეული მათგანი ელექტრო და საინჟინრო სისტემებზე დაახლოებით 10 წელია მუშაობს.</p>
        </div>
        <div className="founders-grid">
          {founders.map((founder, i) => {
            const related = publishedProjects.filter((project) => founder.selectedProjects.includes(project.slug));
            const biography = full ? founder.fullBiography ?? founder.shortBiography : founder.shortBiography;
            return (
              <article key={founder.id} className="founder-card">
                {founder.portrait ? <Photo image={founder.portrait} sizes="(max-width: 700px) 94vw, 42vw" /> : (
                  <div className="portrait-placeholder">
                    <UserRound size={82} strokeWidth={0.7} aria-hidden />
                    <span>პორტრეტი დაემატება</span>
                  </div>
                )}
                <div className="founder-details">
                  <p className="founder-role">{founder.position} · ≈ {founder.yearsOfExperience} წელი</p>
                  <h3>{founder.name ?? `თანადამფუძნებელი ${i + 1}`}</h3>
                  <p>{biography ?? "სახელი, პროფესიული ბიოგრაფია და სპეციალიზაცია დაემატება."}</p>
                  {full && founder.approach && <p>{founder.approach}</p>}
                  {full && founder.specializations.length > 0 && <ul className="scope-list">{founder.specializations.map((item) => <li key={item}>{item}</li>)}</ul>}
                  {related.length > 0 && <ul className="founder-links">{related.map((project) => (
                    <li key={project.slug}><TextLink href={`/projects/${project.slug}`}>{project.name}</TextLink></li>
                  ))}</ul>}
                </div>
              </article>
            );
          })}
        </div>
        {!full && <div className="founders-more"><TextLink href="/about#founders">დამფუძნებლების შესახებ</TextLink></div>}
      </div>
    </section>
  );
}
