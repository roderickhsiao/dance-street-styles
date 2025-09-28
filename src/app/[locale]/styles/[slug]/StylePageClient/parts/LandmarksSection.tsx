'use client';

import { LandmarkCard } from './LandmarkCard';
import { getLandmarkById } from '@/data/entities/landmarks';

interface LandmarksSectionProps {
  landmarkIds?: string[];
}

export function LandmarksSection({ landmarkIds }: LandmarksSectionProps) {
  // Early return if no landmark IDs provided
  if (!landmarkIds || landmarkIds.length === 0) {
    return null;
  }

  // Filter out undefined landmarks and get valid ones
  const landmarks = landmarkIds
    .map(id => getLandmarkById(id))
    .filter(Boolean);

  // Don't render if no valid landmarks found
  if (landmarks.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full overflow-hidden">
      {landmarks.map((landmark, index) => (
        <LandmarkCard
          key={landmark!.id}
          landmark={landmark!}
          index={index}
        />
      ))}
    </div>
  );
}