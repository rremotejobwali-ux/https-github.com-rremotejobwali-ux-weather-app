import React from 'react';
import { GroundingChunk } from '../types';

interface SourceLinksProps {
  sources: GroundingChunk[];
}

const SourceLinks: React.FC<SourceLinksProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  // Filter out sources that don't have web URIs
  const validSources = sources.filter(s => s.web?.uri && s.web?.title);

  if (validSources.length === 0) return null;

  return (
    <div className="mt-6 pt-4 border-t border-white/10 w-full text-center">
      <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Verified Sources</p>
      <div className="flex flex-wrap justify-center gap-2">
        {validSources.map((source, idx) => (
          <a
            key={idx}
            href={source.web!.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-300 hover:text-blue-100 bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors truncate max-w-[200px]"
          >
            {source.web!.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SourceLinks;
