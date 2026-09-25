import { Placements } from "../components/HomeSections";
import { SectionHeading } from "../components/Layout";
const support = [
  [
    "Career Counseling",
    "Personalized guidance helps identify strengths, interests, and goals.",
  ],
  [
    "College Admissions Support",
    "Help with applications, entrance exams, and scholarships.",
  ],
  [
    "Internship & Training Programs",
    "Hands-on experience through industry-oriented opportunities.",
  ],
  [
    "Mock Interviews & Resume Workshops",
    "Professional preparation builds confidence and readiness.",
  ],
  ["Networking Events", "Connections with alumni and industry experts."],
];
export default function PlacementsPage() {
  return (
    <main>
      <section className="page-hero">
        <img
          src="/assets/hero-lab.png"
          alt="Students preparing for their careers"
        />
        <div className="page-hero-copy">
          <p className="eyebrow">Placements</p>
          <h1>Confidence beyond the classroom</h1>
          <p>
            Structured guidance for admissions, scholarships, training,
            internships, and careers.
          </p>
        </div>
      </section>
      <Placements />
      <section className="section soft top-institutions">
        <SectionHeading
          eyebrow="Placement Information"
          title="Top institutions and career pathways highlighted"
        />
        <div className="logo-list reveal">
          {["IIT", "Jain University", "JEE", "AIIMS", "IIM", "JNU", "NEET"].map(
            (x) => (
              <span key={x}>{x}</span>
            ),
          )}
        </div>
      </section>
      <section className="section">
        <SectionHeading
          eyebrow="Why Choose Chetana"
          title="A structured support system for career success"
        />
        <div className="support-grid reveal">
          {support.map((x, i) => (
            <article key={x[0]}>
              <strong>{i + 1}</strong>
              <h3>{x[0]}</h3>
              <p>{x[1]}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
