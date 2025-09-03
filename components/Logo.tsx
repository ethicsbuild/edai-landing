interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
  }
  
  export function Logo({ size = 'md', className = '' }: LogoProps) {
    const sizeClasses = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-12 h-12 text-lg', 
      lg: 'w-16 h-16 text-xl'
    };
  
    return (
      <div className={`bg-gradient-to-br from-edai-gold to-edai-gold/70 rounded-lg flex items-center justify-center ${sizeClasses[size]} ${className}`}>
        <span className="text-black font-bold">E.D.A.I.</span>
      </div>
    );
  }