export interface User {
  userId: string;
  farcasterId?: string;
  walletAddress?: string;
  preferences?: UserPreferences;
  savedTherapists: string[];
  sessionHistory: Session[];
}

export interface Therapist {
  therapistId: string;
  name: string;
  specialties: string[];
  demographics: string[];
  bio: string;
  availability: AvailabilitySlot[];
  licensingInfo: LicensingInfo;
  profileImage?: string;
  rating?: number;
  reviewCount?: number;
}

export interface UserPreferences {
  preferenceId: string;
  userId: string;
  issues: string[];
  demographicFocus: string[];
  sessionFormats: SessionFormat[];
  preferredTimes?: string[];
  budgetRange?: string;
}

export interface Compatibility {
  compatibilityId: string;
  userId: string;
  therapistId: string;
  score: number;
  reasoning: string[];
}

export interface Session {
  sessionId: string;
  userId: string;
  therapistId: string;
  startTime: Date;
  endTime: Date;
  format: SessionFormat;
  status: SessionStatus;
  price?: number;
}

export interface AvailabilitySlot {
  slotId: string;
  therapistId: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  sessionType: 'short' | 'standard' | 'extended';
}

export interface LicensingInfo {
  licenseNumber: string;
  state: string;
  expirationDate: Date;
  verified: boolean;
}

export type SessionFormat = 'video' | 'audio' | 'chat';
export type SessionStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

export interface OnboardingData {
  issues: string[];
  demographicPreferences: string[];
  sessionFormats: SessionFormat[];
  urgency: 'immediate' | 'within-week' | 'flexible';
}
