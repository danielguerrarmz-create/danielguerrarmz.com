import type { ProjectMetadata } from '@/types';
import { joinList } from '@/utils/formatters';
import type { ProjectDisciplines } from '@/types';

export interface MetadataPanelProps {
  metadata: ProjectMetadata;
  disciplines: ProjectDisciplines;
}

export function MetadataPanel({ metadata, disciplines }: MetadataPanelProps) {
  const rows: { label: string; value: string }[] = [];

  if (metadata.date) rows.push({ label: 'DATE', value: metadata.date });
  if (metadata.client) rows.push({ label: 'CLIENT', value: metadata.client });
  if (metadata.collaborators?.length)
    rows.push({ label: 'COLLABORATORS', value: joinList(metadata.collaborators) });
  if (metadata.professor) rows.push({ label: 'PROFESSOR', value: metadata.professor });
  if (metadata.category) rows.push({ label: 'CATEGORY', value: metadata.category });
  if (metadata.tools?.length) rows.push({ label: 'TOOLS', value: joinList(metadata.tools) });
  if (metadata.duration) rows.push({ label: 'DURATION', value: metadata.duration });
  if (metadata.awards?.length) rows.push({ label: 'AWARDS', value: joinList(metadata.awards) });
  if (metadata.course) rows.push({ label: 'COURSE', value: metadata.course });

  if (rows.length === 0) return null;

  return (
    <section className="meta-panel">
      <div className="meta-panel-head"><span>METADATA</span><span className="meta-rule" /></div>
      <div className="meta-grid">
        {rows.map(({ label, value }) => (
          <div key={label}>
            <span>{label}</span><b>{value}</b>
          </div>
        ))}
      </div>
      <div className="mix-bars">
        <span>DISCIPLINE</span>
        <div className="mix-bar"><em>ARCH</em><div className="mb-track"><div className="mb-fill" style={{ width: `${disciplines.arch}%`, background: 'var(--accent)' }} /></div><b>{disciplines.arch}</b></div>
        <div className="mix-bar"><em>PROD</em><div className="mb-track"><div className="mb-fill" style={{ width: `${disciplines.prod}%`, background: 'var(--ink-70)' }} /></div><b>{disciplines.prod}</b></div>
        <div className="mix-bar"><em>SW</em><div className="mb-track"><div className="mb-fill" style={{ width: `${disciplines.sw}%`, background: 'var(--ink-50)' }} /></div><b>{disciplines.sw}</b></div>
      </div>
    </section>
  );
}
