import type { ProjectContent } from '@/types';

export interface DisciplineColumnsProps {
  disciplines: ProjectContent['disciplines'];
}

export function DisciplineColumns({ disciplines }: DisciplineColumnsProps) {
  return (
    <div className="grid grid-cols-3 gap-8 mb-8">
      <div>
        <h3 className="text-red-600 font-semibold mb-1">Architecture</h3>
        <p className="text-gray-500 text-sm">{disciplines.architecture}</p>
      </div>
      <div>
        <h3 className="text-red-600 font-semibold mb-1">Product Design</h3>
        <p className="text-gray-500 text-sm">{disciplines.productDesign}</p>
      </div>
      <div>
        <h3 className="text-red-600 font-semibold mb-1">Software</h3>
        <p className="text-gray-500 text-sm">{disciplines.software}</p>
      </div>
    </div>
  );
}
