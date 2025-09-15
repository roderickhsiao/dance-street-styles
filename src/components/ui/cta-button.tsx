import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const ctaButtonVariants = cva(
  "inline-flex items-center justify-center gap-3 font-bold uppercase tracking-wider magazine-sans rounded-none transition-all duration-300",
  {
    variants: {
      variant: {
        filled: "bg-accent-primary text-surface-primary hover:bg-accent-primary/90",
        outline: "border-2 border-content-primary text-content-primary hover:border-accent-primary hover:text-accent-primary",
        accent: "bg-accent-secondary text-surface-primary hover:bg-accent-secondary/90"
      },
      size: {
        default: "px-8 py-4 text-body-md",
        sm: "px-6 py-3 text-body-sm", 
        lg: "px-10 py-5 text-body-lg"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "default"
    }
  }
);

interface CTAButtonProps extends VariantProps<typeof ctaButtonVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  external?: boolean;
}

export const CTAButton = ({ 
  href, 
  children, 
  className, 
  variant, 
  size, 
  showArrow = false, 
  external = false,
  ...props 
}: CTAButtonProps) => {
    const buttonContent = (
      <>
        <span>{children}</span>
        {showArrow && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        )}
      </>
    );

    if (external) {
      return (
        <motion.a
          href={href}
          className={cn(ctaButtonVariants({ variant, size, className }))}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          {...props}
        >
          {buttonContent}
        </motion.a>
      );
    }

    return (
      <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={href}
          className={cn(ctaButtonVariants({ variant, size, className }))}
          {...props}
        >
          {buttonContent}
        </Link>
      </motion.div>
    );
};
