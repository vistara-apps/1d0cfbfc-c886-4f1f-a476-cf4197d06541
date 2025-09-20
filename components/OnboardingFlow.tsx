'use client';

import { useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { THERAPY_ISSUES, DEMOGRAPHIC_FOCUSES, SESSION_FORMATS } from '../lib/constants';
import { UserPreferences, OnboardingData, SessionFormat } from '../lib/types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface OnboardingFlowProps {
  onComplete: (preferences: UserPreferences) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    issues: [],
    demographicPreferences: [],
    sessionFormats: [],
    urgency: 'flexible',
  });

  const handleIssueToggle = (issue: string) => {
    setData(prev => ({
      ...prev,
      issues: prev.issues.includes(issue)
        ? prev.issues.filter(i => i !== issue)
        : [...prev.issues, issue],
    }));
  };

  const handleDemographicToggle = (demographic: string) => {
    setData(prev => ({
      ...prev,
      demographicPreferences: prev.demographicPreferences.includes(demographic)
        ? prev.demographicPreferences.filter(d => d !== demographic)
        : [...prev.demographicPreferences, demographic],
    }));
  };

  const handleFormatToggle = (format: SessionFormat) => {
    setData(prev => ({
      ...prev,
      sessionFormats: prev.sessionFormats.includes(format)
        ? prev.sessionFormats.filter(f => f !== format)
        : [...prev.sessionFormats, format],
    }));
  };

  const handleComplete = () => {
    const preferences: UserPreferences = {
      preferenceId: `pref-${Date.now()}`,
      userId: `user-${Date.now()}`,
      issues: data.issues,
      demographicFocus: data.demographicPreferences,
      sessionFormats: data.sessionFormats,
    };
    
    onComplete(preferences);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.issues.length > 0;
      case 2:
        return true; // Demographics are optional
      case 3:
        return data.sessionFormats.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Find Your Perfect Therapist
        </h1>
        <p className="text-lg text-text-secondary">
          Let's match you with licensed therapists who understand your unique needs
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stepNumber <= step
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {stepNumber < step ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                stepNumber
              )}
            </div>
            {stepNumber < 3 && (
              <div
                className={`w-12 h-1 mx-2 ${
                  stepNumber < step ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="p-8">
        {step === 1 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-semibold mb-4">
              What brings you to therapy?
            </h2>
            <p className="text-text-secondary mb-6">
              Select all that apply. This helps us match you with specialists.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {THERAPY_ISSUES.map((issue) => (
                <button
                  key={issue}
                  onClick={() => handleIssueToggle(issue)}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                    data.issues.includes(issue)
                      ? 'border-primary bg-blue-50 text-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium">{issue}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-semibold mb-4">
              Any specific preferences?
            </h2>
            <p className="text-text-secondary mb-6">
              Optional: Select therapists with specific cultural competencies or focuses.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DEMOGRAPHIC_FOCUSES.map((demographic) => (
                <button
                  key={demographic}
                  onClick={() => handleDemographicToggle(demographic)}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                    data.demographicPreferences.includes(demographic)
                      ? 'border-primary bg-blue-50 text-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium">{demographic}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-semibold mb-4">
              How would you like to connect?
            </h2>
            <p className="text-text-secondary mb-6">
              Choose your preferred session formats. You can always change this later.
            </p>
            
            <div className="space-y-4">
              {SESSION_FORMATS.map((format) => (
                <button
                  key={format.id}
                  onClick={() => handleFormatToggle(format.id as SessionFormat)}
                  className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                    data.sessionFormats.includes(format.id as SessionFormat)
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{format.icon}</span>
                    <div>
                      <div className="font-medium">{format.label}</div>
                      <div className="text-sm text-text-secondary">
                        {format.id === 'video' && 'Face-to-face video sessions'}
                        {format.id === 'audio' && 'Voice-only phone sessions'}
                        {format.id === 'chat' && 'Text-based messaging sessions'}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          
          <div className="ml-auto">
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center space-x-2"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!canProceed()}
                className="flex items-center space-x-2"
              >
                <span>Find My Therapists</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
