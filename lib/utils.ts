import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function generateCompatibilityScore(
  userPreferences: string[],
  therapistSpecialties: string[]
): number {
  const matches = userPreferences.filter(pref => 
    therapistSpecialties.some(specialty => 
      specialty.toLowerCase().includes(pref.toLowerCase()) ||
      pref.toLowerCase().includes(specialty.toLowerCase())
    )
  );
  
  return Math.min(95, Math.max(60, (matches.length / userPreferences.length) * 100 + Math.random() * 10));
}

export function formatCompatibilityScore(score: number): string {
  return `${Math.round(score)}%`;
}
