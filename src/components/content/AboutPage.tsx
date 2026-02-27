import type { AboutData } from '@/types';
import type { DetailLevel } from '@/types';

export interface AboutPageProps {
  data: AboutData;
  detailLevel: DetailLevel;
}

export function AboutPage({ data, detailLevel }: AboutPageProps) {
  const showFull = detailLevel === 'full';

  return (
    <>
      <h1 className="text-3xl font-bold text-red-600 mb-2">{data.name}</h1>
      <p className="text-gray-500 font-mono text-sm mb-8">{data.tagline}</p>

      <p className="text-gray-700 leading-relaxed mb-8">{data.bio}</p>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-red-600 font-semibold mb-2">Architecture</h3>
          <ul className="text-gray-500 text-sm list-disc list-inside">
            {data.skills.architecture.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-red-600 font-semibold mb-2">Product Design</h3>
          <ul className="text-gray-500 text-sm list-disc list-inside">
            {data.skills.productDesign.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-red-600 font-semibold mb-2">Software</h3>
          <ul className="text-gray-500 text-sm list-disc list-inside">
            {data.skills.software.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {showFull && (
        <>
          <h2 className="text-lg font-semibold text-red-600 mb-2">Education</h2>
          <ul className="text-gray-700 leading-relaxed mb-8">
            {data.education.map((e, i) => (
              <li key={i}>
                {e.degree}, {e.institution}, {e.year}
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold text-red-600 mb-2">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            Email: {data.contact.email}
            <br />
            Location: {data.contact.location}
            {data.contact.linkedin && (
              <>
                <br />
                LinkedIn: {data.contact.linkedin}
              </>
            )}
            {data.contact.portfolio && (
              <>
                <br />
                Portfolio: {data.contact.portfolio}
              </>
            )}
          </p>
        </>
      )}
    </>
  );
}
