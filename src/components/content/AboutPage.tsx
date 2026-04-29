import type { AboutData } from '@/types';
import type { DetailLevel } from '@/types';

export interface AboutPageProps {
  data: AboutData;
  detailLevel: DetailLevel;
}

export function AboutPage({ data, detailLevel }: AboutPageProps) {
  const showFull = detailLevel === 'full';

  return (
    <article className="page page-about">
      <header className="proj-head">
        <div className="proj-eyebrow">ABOUT · 00</div>
        <h1 className="proj-title">{data.name}</h1>
        <p className="proj-tagline">{data.tagline}</p>
      </header>
      <p className="proj-lede">{data.bio}</p>
      <section className="disc-cols">
        <div className="disc-col">
          <header><span className="disc-key">A</span><h3>Architecture</h3></header>
          <ul>{data.skills.architecture.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
        <div className="disc-col">
          <header><span className="disc-key">P</span><h3>Product Design</h3></header>
          <ul>{data.skills.productDesign.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
        <div className="disc-col">
          <header><span className="disc-key">S</span><h3>Software</h3></header>
          <ul>{data.skills.software.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
      </section>

      {showFull && (
        <>
          <section className="proj-section">
          <h2>Education</h2>
          <ul className="kv-list">
            {data.education.map((e, i) => (
              <li key={i}>
                <span className="kv-k">{e.year}</span>
                <span className="kv-v">{e.degree} · {e.institution}</span>
              </li>
            ))}
          </ul>
          </section>
          <section className="proj-section">
          <h2>Contact</h2>
          <ul className="kv-list">
            <li><span className="kv-k">EMAIL</span><span className="kv-v">{data.contact.email}</span></li>
            <li><span className="kv-k">LOCATION</span><span className="kv-v">{data.contact.location}</span></li>
            {data.contact.linkedin && <li><span className="kv-k">LINKEDIN</span><span className="kv-v">{data.contact.linkedin}</span></li>}
            {data.contact.portfolio && <li><span className="kv-k">SITE</span><span className="kv-v">{data.contact.portfolio}</span></li>}
          </ul>
          </section>
        </>
      )}
      <footer className="page-footer"><span>DANIEL · ABOUT</span><span>—</span><span>{new Date().getFullYear()}</span></footer>
    </article>
  );
}
