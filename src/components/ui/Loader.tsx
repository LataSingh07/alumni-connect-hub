import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const Loader = ({ size = 'md', className, text }: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={cn(
          'rounded-full border-primary/30 border-t-primary animate-spin',
          sizeClasses[size]
        )}
      />
      {text && <p className="text-sm text-muted-foreground animate-pulse">{text}</p>}
    </div>
  );
};

export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader size="lg" text="Loading..." />
  </div>
);

export const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <Loader size="md" />
  </div>
);

export default Loader;
