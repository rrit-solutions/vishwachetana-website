import { Link } from "react-router-dom";
import { Atom, BedDouble, BookOpenCheck, Check, Cpu, Sun } from "lucide-react";
import { SectionHeading } from "../components/Layout";

export default function ProgramPage({ data }) {
  return (
    <main>
      <section className="page-hero">
        <img src={data.image} alt={data.alt} />
        <div className="page-hero-copy">
          <p className="eyebrow">Our Institutions</p>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
        </div>
      </section>
      <section className="section detail-grid">
        <div className="detail-copy reveal">
          <p className="eyebrow">{data.eyebrow}</p>
          <h2>{data.heading}</h2>
          <p>{data.copy}</p>
          <ul className="feature-list">
            {data.features.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <div className="page-actions">
            <Link className="btn primary" to="/contact">
              Enquire Now
            </Link>
            <Link className="btn outline" to="/institutions">
              Back to Institutions
            </Link>
          </div>
        </div>
        <aside className="detail-panel reveal">
          <h3>Quick Details</h3>
          <dl>
            {data.details.map((x) => (
              <div key={x[0]}>
                <dt>{x[0]}</dt>
                <dd>{x[1]}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>
      {data.studyOptions && (
        <section className="section study-options-section">
          <SectionHeading
            eyebrow="Study Options"
            title={data.studyOptionsTitle || "Choose the learning environment that suits your child"}
          />
          <div className={`study-options-grid reveal ${data.studyOptions.length === 1 ? "single" : ""}`}>
            {data.studyOptions.map((option) => {
              const Icon = option.type === "residential" ? BedDouble : Sun;
              return (
                <article className="study-option-card" key={option.title}>
                  <div className="study-option-icon"><Icon size={25} aria-hidden="true" /></div>
                  <p className="study-option-grade">{option.grades}</p>
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                  <ul>
                    {option.highlights.map((highlight) => (
                      <li key={highlight}><Check size={17} aria-hidden="true" />{highlight}</li>
                    ))}
                  </ul>
                  <Link className="study-option-link" to="/contact">
                    Enquire for {option.title}
                  </Link>
                </article>
              );
            })}
          </div>
          {data.academicFocus && (
            <article className="academic-focus-card reveal">
              <div className="study-option-icon"><BookOpenCheck size={25} aria-hidden="true" /></div>
              <div className="academic-focus-copy">
                <p className="study-option-grade">{data.academicFocus.label}</p>
                <h3>{data.academicFocus.title}</h3>
                <p>{data.academicFocus.description}</p>
              </div>
              <ul>
                {data.academicFocus.highlights.map((highlight) => (
                  <li key={highlight}><Check size={17} aria-hidden="true" />{highlight}</li>
                ))}
              </ul>
            </article>
          )}
        </section>
      )}
      {data.courseOptions && (
        <section className="section course-options-section">
          <SectionHeading eyebrow="Courses Offered" title="Choose your PU science combination" />
          <div className="course-options-grid reveal">
            {data.courseOptions.map((course) => {
              const Icon = course.code === "PCMB" ? Atom : Cpu;
              return (
                <article className="course-option-card" key={course.code}>
                  <div className="course-option-top">
                    <div className="study-option-icon"><Icon size={25} aria-hidden="true" /></div>
                    <span>{course.code}</span>
                  </div>
                  <h3>{course.title}</h3>
                  <p className="course-subjects">{course.subjects}</p>
                  <strong>{course.coaching}</strong>
                  <p>{course.description}</p>
                  <Link className="study-option-link" to="/contact">Enquire for {course.code}</Link>
                </article>
              );
            })}
          </div>
        </section>
      )}
      <section className="section program-extra">
        <SectionHeading eyebrow={data.sectionLabel} title={data.sectionTitle} />
        <div className="info-grid reveal">
          {data.cards.map((x) => (
            <article key={x[0]}>
              <h3>{x[0]}</h3>
              <p>{x[1]}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
