import { cn } from '../lib/utils';

interface ProfileCardProps {
  variant: 'therapist' | 'user';
  name: string;
  image?: string;
  status?: 'online' | 'offline';
  className?: string;
}

export function ProfileCard({
  variant,
  name,
  image,
  status = 'offline',
  className,
}: ProfileCardProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn('relative inline-block', className)}>
      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg font-semibold text-gray-600">
            {initials}
          </span>
        )}
      </div>
      
      {status && (
        <div
          className={cn(
            'absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white',
            status === 'online' ? 'bg-green-400' : 'bg-gray-400'
          )}
        />
      )}
    </div>
  );
}
