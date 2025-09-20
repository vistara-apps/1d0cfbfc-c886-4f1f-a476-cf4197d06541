'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { OnboardingFlow } from '../components/OnboardingFlow';
import { TherapistDirectory } from '../components/TherapistDirectory';
import { SessionBooking } from '../components/SessionBooking';
import { UserPreferences } from '../lib/types';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<'onboarding' | 'directory' | 'booking'>('onboarding');
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setCurrentStep('directory');
  };

  const handleTherapistSelect = (therapistId: string) => {
    setSelectedTherapist(therapistId);
    setCurrentStep('booking');
  };

  const handleBackToDirectory = () => {
    setCurrentStep('directory');
    setSelectedTherapist(null);
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-background">
        {currentStep === 'onboarding' && (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        )}
        
        {currentStep === 'directory' && userPreferences && (
          <TherapistDirectory
            preferences={userPreferences}
            onTherapistSelect={handleTherapistSelect}
          />
        )}
        
        {currentStep === 'booking' && selectedTherapist && (
          <SessionBooking
            therapistId={selectedTherapist}
            onBack={handleBackToDirectory}
          />
        )}
      </div>
    </AppShell>
  );
}
