interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'default' | 'orange' | 'blue' | 'green' | 'purple' | 'yellow';
  hover?: boolean;
  variant?: 'regular' | 'clear' | 'navigation';
  role?: 'navigation' | 'content' | 'control';
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({ 
  children, 
  className = "", 
  theme = 'default',
  hover = true,
  variant = 'regular',
  role = 'content'
}) => {
  
  const getThemeColors = () => {
    switch (theme) {
      case 'orange':
        return {
          bg: 'rgba(255, 107, 53, 0.12)',
          border: 'rgba(255, 107, 53, 0.25)',
          shadow: 'rgba(255, 107, 53, 0.15)',
          accent: 'rgba(255, 107, 53, 0.2)'
        };
      case 'blue':
        return {
          bg: 'rgba(59, 130, 246, 0.12)',
          border: 'rgba(59, 130, 246, 0.25)',
          shadow: 'rgba(59, 130, 246, 0.15)',
          accent: 'rgba(59, 130, 246, 0.2)'
        };
      case 'green':
        return {
          bg: 'rgba(34, 197, 94, 0.12)',
          border: 'rgba(34, 197, 94, 0.25)',
          shadow: 'rgba(34, 197, 94, 0.15)',
          accent: 'rgba(34, 197, 94, 0.2)'
        };
      case 'purple':
        return {
          bg: 'rgba(147, 51, 234, 0.12)',
          border: 'rgba(147, 51, 234, 0.25)',
          shadow: 'rgba(147, 51, 234, 0.15)',
          accent: 'rgba(147, 51, 234, 0.2)'
        };
      case 'yellow':
        return {
          bg: 'rgba(234, 179, 8, 0.12)',
          border: 'rgba(234, 179, 8, 0.25)',
          shadow: 'rgba(234, 179, 8, 0.15)',
          accent: 'rgba(234, 179, 8, 0.2)'
        };
      default:
        return {
          bg: 'rgba(255, 255, 255, 0.12)',
          border: 'rgba(255, 255, 255, 0.2)',
          shadow: 'rgba(0, 0, 0, 0.1)',
          accent: 'rgba(255, 255, 255, 0.15)'
        };
    }
  };

  const getVariantProperties = () => {
    switch (variant) {
      case 'clear':
        return {
          blur: '8px',
          opacity: 0.95,
          saturation: '150%',
          bgOpacity: 0.08
        };
      case 'navigation':
        return {
          blur: '20px',
          opacity: 0.85,
          saturation: '180%',
          bgOpacity: 0.15
        };
      default: // regular
        return {
          blur: '16px',
          opacity: 0.9,
          saturation: '160%',
          bgOpacity: 0.12
        };
    }
  };

  const colors = getThemeColors();
  const variantProps = getVariantProperties();

  // Enhanced background with proper opacity for better contrast
  const enhancedBg = colors.bg.replace(/[\d.]+(?=\))/, (variantProps.bgOpacity).toString());

  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl 
        ${hover ? 'hover:scale-[1.01] hover:shadow-xl' : ''} 
        transition-all duration-200 ease-out 
        ${className}
      `}
      style={{
        backgroundColor: enhancedBg,
        backdropFilter: `blur(${variantProps.blur}) saturate(${variantProps.saturation})`,
        WebkitBackdropFilter: `blur(${variantProps.blur}) saturate(${variantProps.saturation})`,
        border: `1px solid ${colors.border}`,
        boxShadow: `
          0 8px 32px ${colors.shadow},
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          inset 0 -1px 0 ${colors.border}
        `
      }}
    >
        {/* Highlight Layer (top) - Apple's three-layer system */}
        <div 
          className="absolute top-0 start-0 end-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${colors.accent} 50%, transparent 100%)`
          }}
        />
        
        {/* Shadow Layer (bottom) - for depth separation */}
        {variant !== 'clear' && (
          <div 
            className="absolute bottom-0 start-0 end-0 h-4 rounded-b-xl opacity-30"
            style={{
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.1) 0%, transparent 100%)'
            }}
          />
        )}
        
        {/* Illumination Layer - adaptive material properties */}
        {role === 'navigation' && (
          <div 
            className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${colors.accent} 0%, transparent 60%)`
            }}
          />
        )}
        
        {/* Content with improved contrast for accessibility */}
        <div 
          className="relative z-10"
          style={{
            // Add subtle background for better text contrast when needed
            ...(variant === 'clear' && {
              backgroundColor: 'rgba(0, 0, 0, 0.05)'
            })
          }}
        >
          {children}
        </div>
      </div>
  );
};
