'use client';

interface ContentArrayProps {
  content?: string[];
  items?: string[];
  variant?: 'paragraphs' | 'list';
  className?: string;
  itemClassName?: string;
}

export const ContentArray = ({
  content,
  items,
  variant = 'paragraphs',
  className = '',
  itemClassName = 'text-body-lg text-content-secondary leading-relaxed'
}: ContentArrayProps) => {
  const arrayData = content || items;
  if (!arrayData) return null;

  if (variant === 'list') {
    return (
      <ul className={`space-y-4 ${className}`}>
        {arrayData.map((item: string, index: number) => (
          <li key={index} className="flex items-start">
            <span className="text-accent-primary me-3 mt-1 font-bold">•</span>
            <span className={itemClassName}>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {arrayData.map((paragraph: string, index: number) => (
        <p key={index} className={itemClassName}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};