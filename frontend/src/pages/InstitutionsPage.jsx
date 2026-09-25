import { Institutions, Branches } from "../components/HomeSections";
export default function InstitutionsPage() {
  return (
    <main>
      <section className="page-hero">
        <img
          src="/assets/hero-lab.png"
          alt="Students learning in a laboratory"
        />
        <div className="page-hero-copy">
          <p className="eyebrow">Our Institutions</p>
          <h1>Academic paths under one trusted group</h1>
          <p>
            School, pre-university, residential, degree, and skill-focused
            education.
          </p>
        </div>
      </section>
      <Institutions />
      <Branches />
    </main>
  );
}
