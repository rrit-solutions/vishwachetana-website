import { SectionHeading } from "../components/Layout";

const info = [
  [
    "Vision",
    "Empower students with the knowledge, skills, and values needed to navigate an evolving world with confidence and integrity.",
  ],
  [
    "Mission",
    "Foster academic excellence, holistic development, critical thinking, creativity, strong character, community, and emotional well-being.",
  ],
  [
    "Student Support",
    "Counseling, special education support, health services, nutrition, wellness programs, and on-site care.",
  ],
  [
    "Extracurricular Features",
    "Sports, robotics, debate, community service, and leadership programs help students grow beyond class.",
  ],
];
export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <img src="/assets/hero-campus.png" alt="Vishwachetana campus" />
        <div className="page-hero-copy">
          <p className="eyebrow">About Us</p>
          <h1>Learning with purpose and values</h1>
          <p>
            Academic excellence and holistic student development in Davanagere.
          </p>
        </div>
      </section>
      <section className="section brochure-section">
        <div className="brochure-copy reveal">
          <p className="eyebrow">Our Legacy</p>
          <h2>Shaping bright futures since 1987</h2>
          <p>
            Vishwachetana Vidyaniketana (R) was established in 1987 by our
            visionary and highly respected Chairperson, Dr. Vijayalaxmi
            Veeramachineni. Since then, the institution has provided quality
            education to thousands of students, helping them become sparkling
            stars in diverse fields across India and around the world.
          </p>
          <p>
            Guided by the leadership of the Chetana Institutions trustees and
            the dedication of our faculty members, we continue to set new goals
            and achieve them successfully, creating a brighter future for every
            student. Our mission is to prepare students to face the challenges
            of today&apos;s competitive world with courage and confidence.
          </p>
          <p>
            Our students consistently excel in curricular and co-curricular
            activities. We offer State, CBSE, and Olympiad curricula from Grades
            1 to 10, along with NEET, JEE, and K-CET-focused teaching for
            Pre-University students.
          </p>
        </div>
        <div className="development-card reveal">
          <h3>A Growing Family</h3>
          <ul>
            <li>39 years of educational excellence</li>
            <li>More than 4,000 students</li>
            <li>More than 350 facilitators</li>
            <li>State, CBSE, Olympiad, NEET, JEE, and K-CET pathways</li>
          </ul>
        </div>
      </section>
      <section className="section brochure-section">
        <div className="brochure-copy reveal">
          <p className="eyebrow">Our Inspiration</p>
          <h2>A vision that has grown into a mighty banyan tree</h2>
          <p>
            The courage, confidence, mission, and vision of our beloved
            Chairperson have enabled the institution to grow into a mighty
            banyan tree over the past 39 years. She remains our role model,
            mentor, guide, and source of inspiration.
          </p>
          <p>
            The excellence of our students is the hallmark of our institutions.
            Their outstanding achievements in sports, cultural events, and
            curricular activities continue to make us proud and reflect the
            values on which Vishwachetana was founded.
          </p>
        </div>
        <div className="development-card reveal">
          <h3>Our Continuing Commitment</h3>
          <ul>
            <li>Academic excellence at every stage</li>
            <li>Confidence to meet real-world challenges</li>
            <li>Achievement in sports, culture, and academics</li>
            <li>Strong values, guidance, and lifelong learning</li>
          </ul>
        </div>
      </section>
      <section className="section brochure-section">
        <div className="brochure-copy reveal">
          <p className="eyebrow">Our Approach</p>
          <h2>Holistic development, built into everyday learning</h2>
          <p>
            The Chetana approach balances academic excellence with physical,
            cognitive, social, emotional, spiritual, and ethical development.
          </p>
          <div className="pillars">
            {[
              "Physical Development",
              "Cognitive Development",
              "Social Development",
              "Emotional Development",
              "Ethical Values",
              "Leadership",
            ].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
        <div className="development-card reveal">
          <h3>What Students Build</h3>
          <ul>
            <li>Critical thinking and problem-solving</li>
            <li>Confidence, teamwork, and leadership</li>
            <li>Resilience and self-awareness</li>
            <li>Values, integrity, and purpose</li>
          </ul>
        </div>
      </section>
      <section className="section info-band">
        <SectionHeading
          eyebrow="Vision & Mission"
          title="Knowledge, skills, values, and lifelong learning"
        />
        <div className="info-grid reveal">
          {info.map((x) => (
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
