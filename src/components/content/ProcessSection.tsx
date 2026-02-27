export interface ProcessSectionProps {
  process: string;
  technicalDetails?: string;
}

export function ProcessSection({
  process,
  technicalDetails,
}: ProcessSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-red-600 mb-2">Process</h2>
      <p className="text-gray-700 leading-relaxed mb-4">{process}</p>
      {technicalDetails && (
        <>
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Technical Details
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {technicalDetails}
          </p>
        </>
      )}
    </div>
  );
}
