import type { ProjectMetadata } from '@/types';
import { joinList } from '@/utils/formatters';

export interface MetadataPanelProps {
  metadata: ProjectMetadata;
}

export function MetadataPanel({ metadata }: MetadataPanelProps) {
  return (
    <div className="mb-8 p-4 border border-gray-200 rounded font-mono text-sm bg-white/80">
      <div className="grid grid-cols-2 gap-2 text-gray-600">
        <span>
          DATE: <span className="text-gray-900">{metadata.date || '—'}</span>
        </span>
        <span>
          CLIENT:{' '}
          <span className="text-gray-900">{metadata.client || '—'}</span>
        </span>
        <span>
          COLLABORATORS:{' '}
          <span className="text-gray-900">
            {joinList(metadata.collaborators)}
          </span>
        </span>
        {metadata.professor && (
          <span>
            PROFESSOR:{' '}
            <span className="text-gray-900">{metadata.professor}</span>
          </span>
        )}
        <span>
          CATEGORY:{' '}
          <span className="text-gray-900">{metadata.category || '—'}</span>
        </span>
        <span>
          TOOLS:{' '}
          <span className="text-gray-900">{joinList(metadata.tools)}</span>
        </span>
        <span>
          DURATION:{' '}
          <span className="text-gray-900">{metadata.duration || '—'}</span>
        </span>
      </div>
    </div>
  );
}
