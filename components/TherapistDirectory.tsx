'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, Clock } from 'lucide-react';
import { mockTherapists, generateMockAvailability } from '../lib/mockData';
import { generateCompatibilityScore, formatCompatibilityScore } from '../lib/utils';
import { UserPreferences, Therapist, Compatibility } from '../lib/types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { ProfileCard } from './ProfileCard';

interface TherapistDirectoryProps {
  preferences: UserPreferences;
  onTherapistSelect: (therapistId: string) => void;
}

export function TherapistDirectory({ preferences, onTherapistSelect }: TherapistDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [compatibilityScores, setCompatibilityScores] = useState<Compatibility[]>([]);
  const [sortBy, setSortBy] = useState<'compatibility' | 'rating' | 'availability'>('compatibility');

  useEffect(() => {
    // Generate compatibility scores for all therapists
    const scores = mockTherapists.map(therapist => ({
      compatibilityId: `comp-${therapist.therapistId}`,
      userId: preferences.userId,
      therapistId: therapist.therapistId,
      score: generateCompatibilityScore(preferences.issues, therapist.specialties),
      reasoning: getCompatibilityReasons(preferences, therapist),
    }));
    
    setCompatibilityScores(scores);
  }, [preferences]);

  const getCompatibilityReasons = (prefs: UserPreferences, therapist: Therapist): string[] => {
    const reasons: string[] = [];
    
    // Check specialty matches
    const specialtyMatches = prefs.issues.filter(issue =>
      therapist.specialties.some(specialty =>
        specialty.toLowerCase().includes(issue.toLowerCase()) ||
        issue.toLowerCase().includes(specialty.toLowerCase())
      )
    );
    
    if (specialtyMatches.length > 0) {
      reasons.push(`Specializes in ${specialtyMatches.join(', ')}`);
    }
    
    // Check demographic matches
    const demographicMatches = prefs.demographicFocus.filter(demo =>
      therapist.demographics.includes(demo)
    );
    
    if (demographicMatches.length > 0) {
      reasons.push(`Experience with ${demographicMatches.join(', ')}`);
    }
    
    // Add general reasons
    if (therapist.rating && therapist.rating > 4.5) {
      reasons.push('Highly rated by clients');
    }
    
    if (therapist.reviewCount && therapist.reviewCount > 100) {
      reasons.push('Extensive client experience');
    }
    
    return reasons;
  };

  const filteredTherapists = mockTherapists
    .filter(therapist => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          therapist.name.toLowerCase().includes(query) ||
          therapist.specialties.some(s => s.toLowerCase().includes(query)) ||
          therapist.bio.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'compatibility':
          const scoreA = compatibilityScores.find(s => s.therapistId === a.therapistId)?.score || 0;
          const scoreB = compatibilityScores.find(s => s.therapistId === b.therapistId)?.score || 0;
          return scoreB - scoreA;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'availability':
          // For demo purposes, just randomize
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Your Therapist Matches
        </h1>
        <p className="text-text-secondary">
          Found {filteredTherapists.length} therapists based on your preferences
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search therapists, specialties, or issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="select"
            >
              <option value="compatibility">Best Match</option>
              <option value="rating">Highest Rated</option>
              <option value="availability">Most Available</option>
            </select>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Therapist List */}
      <div className="space-y-4">
        {filteredTherapists.map((therapist) => {
          const compatibility = compatibilityScores.find(
            s => s.therapistId === therapist.therapistId
          );
          
          return (
            <Card key={therapist.therapistId} className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <ProfileCard
                    variant="therapist"
                    name={therapist.name}
                    image={therapist.profileImage}
                    status="online"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary mb-1">
                        {therapist.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        {therapist.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{therapist.rating}</span>
                            <span>({therapist.reviewCount} reviews)</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{therapist.licensingInfo.state}</span>
                        </div>
                      </div>
                    </div>
                    
                    {compatibility && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">
                          {formatCompatibilityScore(compatibility.score)}
                        </div>
                        <div className="text-sm text-text-secondary">match</div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-text-secondary mb-4 line-clamp-2">
                    {therapist.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {therapist.specialties.slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                    {therapist.specialties.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        +{therapist.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {compatibility && compatibility.reasoning.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-text-primary mb-2">
                        Why this is a good match:
                      </div>
                      <ul className="text-sm text-text-secondary space-y-1">
                        {compatibility.reasoning.slice(0, 2).map((reason, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Clock className="w-4 h-4" />
                      <span>Next available: Today 2:00 PM</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline">
                        View Profile
                      </Button>
                      <Button onClick={() => onTherapistSelect(therapist.therapistId)}>
                        Book Session
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
