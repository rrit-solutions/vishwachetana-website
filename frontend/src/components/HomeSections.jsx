import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { branches, institutions, institutionStats, placements } from "../data";
import { SectionHeading } from "./Layout";

export function Hero() {
  const [active, setActive] = useState(0);
  const slides = [
    [
      "/assets/hero-lab.png",
      "Students learning in a science laboratory",
      "Empowering Students For A Bright Future",
      "Career-focused education, competitive preparation, and holistic growth from Chetana Group of Institutions.",
      "#about",
      "Learn More",
    ],
    [
      "/assets/hero-campus.png",
      "Students walking on a modern academic campus",
      "Academic Excellence With Purpose",
      "Olympiad School, PU College, residential pathways, and placement guidance rooted in Davanagere.",
      "#institutions",
      "Our Institutions",
    ],
  ];
  useEffect(() => {
    const timer = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      6500,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="hero" aria-label="Vishwachetana highlights">
      {slides.map((slide, i) => (
        <div className={`slide ${active === i ? "active" : ""}`} key={slide[2]}>
          <img src={slide[0]} alt={slide[1]} />
          <div className="hero-shade" />
          <div className="hero-copy">
            <h1>{slide[2]}</h1>
            <p>{slide[3]}</p>
            <a className="btn muted" href={slide[4]}>
              {slide[5]}
            </a>
          </div>
        </div>
      ))}
      <button
        className="slider-btn prev"
        onClick={() =>
          setActive((i) => (i - 1 + slides.length) % slides.length)
        }
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} aria-hidden="true" />
      </button>
      <button
        className="slider-btn next"
        onClick={() => setActive((i) => (i + 1) % slides.length)}
        aria-label="Next slide"
      >
        <ChevronRight size={28} aria-hidden="true" />
      </button>
    </section>
  );
}

function Counter({ target, suffix = "" }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1000, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return (
    <strong ref={ref}>
      {value.toLocaleString("en-IN")}
      {suffix && <small>{suffix}</small>}
    </strong>
  );
}

export function Stats() {
  return (
    <section className="stats reveal" aria-label="Institution statistics">
      {institutionStats.map((stat) => (
        <article key={stat.label}>
          <Counter target={stat.value} suffix={stat.suffix} />
          <span>{stat.label}</span>
        </article>
      ))}
    </section>
  );
}

export function Campus() {
  const [modal, setModal] = useState(null);
  const items = [
    [
      "Wellness",
      "Yoga Practice",
      "Focus, balance, discipline, and calm routines.",
      "Yoga practice supports focus, fitness, discipline, and emotional balance.",
    ],
    [
      "Fitness",
      "Sports Practice",
      "Teamwork, stamina, leadership, and healthy competition.",
      "Sports activities build teamwork, stamina, leadership, and healthy competition.",
    ],
    [
      "Collaboration",
      "Group Studies",
      "Peer learning, revision habits, and shared confidence.",
      "Collaborative study sessions help students learn from peers and strengthen concepts.",
    ],
    [
      "Labs",
      "Science Experiments",
      "Practical observation, discovery, and concept clarity.",
      "Lab-based learning turns classroom concepts into practical observation and discovery.",
    ],
    [
      "Pride",
      "Independence Day",
      "Discipline, civic pride, and confident participation.",
      "Events and parades nurture civic pride, confidence, and stage presence.",
    ],
    [
      "Culture",
      "Cultural Day",
      "Creativity, stage presence, and community spirit.",
      "Cultural programs give students space for expression, creativity, and community participation.",
    ],
  ];
  useEffect(() => {
    const close = (e) => e.key === "Escape" && setModal(null);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <section className="section soft campus-section" id="campus">
        <SectionHeading
          eyebrow="Campus Life"
          title="Learning beyond textbooks"
        />
        <div className="campus-grid reveal">
          {items.map((item) => (
            <button type="button" key={item[1]} onClick={() => setModal(item)}>
              <span className="campus-kicker">{item[0]}</span>
              <strong>{item[1]}</strong>
              <span>{item[2]}</span>
            </button>
          ))}
        </div>
      </section>
      {modal && (
        <div
          className="modal is-open"
          aria-hidden="false"
          onMouseDown={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              autoFocus
              className="modal-close"
              onClick={() => setModal(null)}
              aria-label="Close preview"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <h3 id="modal-title">{modal[1]}</h3>
            <p>{modal[3]}</p>
          </div>
        </div>
      )}
    </>
  );
}

export function Placements() {
  const [year, setYear] = useState("2024");
  const data = placements[year];
  return (
    <section className="section placements" id="placements">
      <SectionHeading
        eyebrow="Placements"
        title="Confidence beyond the classroom"
      />
      <div className="placement-copy reveal">
        <p>
          The dedicated placement cell supports students with career
          counselling, admissions guidance, industry-oriented training,
          internships, mock interviews, resume workshops, networking events, and
          alumni connections.
        </p>
        <div className="placement-years" aria-label="Placement results by year">
          {Object.keys(placements).map((y) => (
            <button
              type="button"
              key={y}
              className={year === y ? "active" : ""}
              onClick={() => setYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
        <div className="placement-panel">
          <strong>{data[0]}</strong>
          {data.slice(1).map((text) => (
            <span key={text}>{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [institution, setInstitution] = useState("");
  const [course, setCourse] = useState("");
  const courseOptions = [
    "Nursery",
    "LKG",
    "UKG",
    "1st Standard",
    "2nd Standard",
    "3rd Standard",
    "4th Standard",
    "5th Standard",
    "6th Standard",
    "7th Standard",
    "8th Standard",
    "9th Standard",
    "10th Standard",
    "11th Standard",
    "12th Standard",
    "Longterm",
  ];
  const submit = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    setInstitution("");
    setCourse("");
    setSent(true);
  };
  return (
    <section className="contact-section" id="contact">
      <div className="contact-copy reveal">
        <p className="eyebrow">Contact Us</p>
        <h2>Plan your visit or request admission guidance.</h2>
        <address>
          NH 48, Vidyanagar, Davanagere, Karnataka 577005
          <br />
          <a href="tel:+918105798570">+91 81057 98570</a>
          <br />
          <a href="mailto:info@vishwachetana.edu">info@vishwachetana.edu</a>
        </address>
      </div>
      <form className="contact-form reveal" onSubmit={submit}>
        <label>
          Name
          <input name="name" placeholder="Student or parent name" required />
        </label>
        <label>
          Phone
          <input type="tel" name="phone" placeholder="+91" required />
        </label>
        <label>
          Institution
          <select
            name="institution"
            required
            value={institution}
            onChange={(event) => {
              setInstitution(event.target.value);
              setSent(false);
            }}
          >
            <option value="">Select institution</option>
            {institutions.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Course
          <select
            name="course"
            required
            value={course}
            onChange={(event) => {
              setCourse(event.target.value);
              setSent(false);
            }}
          >
            <option value="">Select course</option>
            {courseOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <button className="btn primary" type="submit">
          Submit Enquiry
        </button>
        <p className="form-status" aria-live="polite">
          {sent && "Thank you. We will contact you shortly."}
        </p>
      </form>
    </section>
  );
}

export function Institutions() {
  const orderedInstitutions = [...institutions].sort((a, b) => {
    if (!a.number && !b.number) return 0;
    if (!a.number) return 1;
    if (!b.number) return -1;
    return Number(a.number) - Number(b.number);
  });

  return (
    <section className="section" id="institutions">
      <SectionHeading
        eyebrow="Our Institutions"
        title="Academic paths under one trusted group"
      />
      <div className="institution-grid">
        {orderedInstitutions.map((item) => (
          <a
            className="institution-card reveal"
            href={item.path}
            key={item.path}
          >
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Branches() {
  return (
    <section className="section branch-section" id="branches">
      <SectionHeading eyebrow="Our Branches" title="Reach the right campus" />
      <div className="branch-grid reveal">
        {branches.map((b) => (
          <article key={b[0]}>
            <h3>{b[0]}</h3>
            <p>{b[1]}</p>
            <a href={`tel:${b[3]}`}>{b[2]}</a>
          </article>
        ))}
      </div>
    </section>
  );
}
