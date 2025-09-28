'use client';

interface ContentArrayProps {
  content: string[];
  className?: string;
  itemClassName?: string;
}

export const ContentArray = ({
  content,
  className = '',
  itemClassName = 'text-body-lg text-content-secondary leading-relaxed'
}: ContentArrayProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {content.map((paragraph: string, index: number) => (
        <p key={index} className={itemClassName}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};