'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Video, Phone, MessageCircle, CreditCard } from 'lucide-react';
import { mockTherapists, generateMockAvailability } from '../lib/mockData';
import { formatDate, formatTime } from '../lib/utils';
import { AvailabilitySlot, SessionFormat } from '../lib/types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProfileCard } from './ProfileCard';

interface SessionBookingProps {
  therapistId: string;
  onBack: () => void;
}

export function SessionBooking({ therapistId, onBack }: SessionBookingProps) {
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SessionFormat>('video');
  const [sessionType, setSessionType] = useState<'short' | 'standard'>('short');
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [step, setStep] = useState<'select-time' | 'select-format' | 'payment'>('select-time');

  const therapist = mockTherapists.find(t => t.therapistId === therapistId);

  useEffect(() => {
    if (therapist) {
      const slots = generateMockAvailability(therapist.therapistId);
      setAvailability(slots.filter(slot => !slot.isBooked));
    }
  }, [therapist]);

  if (!therapist) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Therapist not found</p>
        <Button onClick={onBack} className="mt-4">
          Back to Directory
        </Button>
      </div>
    );
  }

  const formatIcons = {
    video: Video,
    audio: Phone,
    chat: MessageCircle,
  };

  const sessionPrices = {
    short: 25,
    standard: 75,
  };

  const groupedSlots = availability.reduce((groups, slot) => {
    const date = slot.startTime.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(slot);
    return groups;
  }, {} as Record<string, AvailabilitySlot[]>);

  const handleBooking = () => {
    // In a real app, this would process payment and create the session
    alert('Session booked successfully! You will receive a confirmation email shortly.');
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center space-x-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </Button>
        
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Book a Session
        </h1>
        <p className="text-text-secondary">
          Schedule your session with {therapist.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Therapist Info */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <div className="text-center mb-4">
              <ProfileCard
                variant="therapist"
                name={therapist.name}
                image={therapist.profileImage}
                status="online"
              />
            </div>
            
            <h3 className="font-semibold text-text-primary mb-2">
              {therapist.name}
            </h3>
            
            <div className="space-y-2 text-sm text-text-secondary mb-4">
              <div>⭐ {therapist.rating} ({therapist.reviewCount} reviews)</div>
              <div>📍 Licensed in {therapist.licensingInfo.state}</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-text-primary">Specialties:</div>
              <div className="flex flex-wrap gap-1">
                {therapist.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Booking Flow */}
        <div className="lg:col-span-2">
          {step === 'select-time' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
              
              {/* Session Type Selection */}
              <div className="mb-6">
                <div className="text-sm font-medium text-text-primary mb-3">Session Type:</div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSessionType('short')}
                    className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                      sessionType === 'short'
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Short Session</div>
                    <div className="text-sm text-text-secondary">15-30 minutes</div>
                    <div className="text-lg font-bold text-primary">${sessionPrices.short}</div>
                  </button>
                  
                  <button
                    onClick={() => setSessionType('standard')}
                    className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                      sessionType === 'standard'
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Standard Session</div>
                    <div className="text-sm text-text-secondary">50 minutes</div>
                    <div className="text-lg font-bold text-primary">${sessionPrices.standard}</div>
                  </button>
                </div>
              </div>

              {/* Available Times */}
              <div className="space-y-4">
                {Object.entries(groupedSlots).slice(0, 7).map(([date, slots]) => (
                  <div key={date}>
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="w-4 h-4 text-text-secondary" />
                      <span className="font-medium text-text-primary">
                        {formatDate(new Date(date))}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {slots.map((slot) => (
                        <button
                          key={slot.slotId}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-2 rounded-md border text-sm transition-all duration-200 ${
                            selectedSlot?.slotId === slot.slotId
                              ? 'border-primary bg-blue-50 text-primary'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {formatTime(slot.startTime)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setStep('select-format')}
                  disabled={!selectedSlot}
                >
                  Continue
                </Button>
              </div>
            </Card>
          )}

          {step === 'select-format' && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Choose Session Format</h2>
              
              <div className="space-y-3 mb-6">
                {(['video', 'audio', 'chat'] as SessionFormat[]).map((format) => {
                  const Icon = formatIcons[format];
                  return (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                      className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                        selectedFormat === format
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <div>
                          <div className="font-medium capitalize">{format} Session</div>
                          <div className="text-sm text-text-secondary">
                            {format === 'video' && 'Face-to-face video call'}
                            {format === 'audio' && 'Voice-only phone call'}
                            {format === 'chat' && 'Text-based messaging'}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep('select-time')}
                >
                  Back
                </Button>
                <Button onClick={() => setStep('payment')}>
                  Continue to Payment
                </Button>
              </div>
            </Card>
          )}

          {step === 'payment' && selectedSlot && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Confirm & Pay</h2>
              
              {/* Session Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Session Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Therapist:</span>
                    <span className="font-medium">{therapist.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span className="font-medium">
                      {formatDate(selectedSlot.startTime)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session Type:</span>
                    <span className="font-medium capitalize">
                      {sessionType} ({sessionType === 'short' ? '15-30 min' : '50 min'})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-medium capitalize">{selectedFormat}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg">${sessionPrices[sessionType]}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Payment Method</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-text-secondary" />
                    <div>
                      <div className="font-medium">Base Wallet</div>
                      <div className="text-sm text-text-secondary">
                        Pay securely with your connected wallet
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep('select-format')}
                >
                  Back
                </Button>
                <Button onClick={handleBooking} className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Book & Pay ${sessionPrices[sessionType]}</span>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
