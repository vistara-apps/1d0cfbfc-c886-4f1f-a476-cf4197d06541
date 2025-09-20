import { Therapist, AvailabilitySlot } from './types';

export const mockTherapists: Therapist[] = [
  {
    therapistId: '1',
    name: 'Dr. Sarah Chen',
    specialties: ['Anxiety', 'Depression', 'Cultural Competence'],
    demographics: ['LGBTQ+ Affirmative', 'Multicultural'],
    bio: 'Licensed clinical psychologist with 8 years of experience specializing in anxiety disorders and cultural identity issues.',
    availability: [],
    licensingInfo: {
      licenseNumber: 'PSY12345',
      state: 'CA',
      expirationDate: new Date('2025-12-31'),
      verified: true,
    },
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    rating: 4.8,
    reviewCount: 127,
  },
  {
    therapistId: '2',
    name: 'Marcus Johnson, LMFT',
    specialties: ['Trauma/PTSD', 'Men\'s Issues', 'Veterans'],
    demographics: ['Veterans', 'Men\'s Issues'],
    bio: 'Marriage and family therapist specializing in trauma recovery and men\'s mental health. Former military chaplain.',
    availability: [],
    licensingInfo: {
      licenseNumber: 'MFT67890',
      state: 'TX',
      expirationDate: new Date('2025-06-30'),
      verified: true,
    },
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    rating: 4.9,
    reviewCount: 89,
  },
  {
    therapistId: '3',
    name: 'Dr. Emily Rodriguez',
    specialties: ['Eating Disorders', 'Teen/Adolescent', 'Family Conflicts'],
    demographics: ['Teen/Adolescent', 'Women\'s Issues', 'Multicultural'],
    bio: 'Child and adolescent psychiatrist with expertise in eating disorders and family therapy. Bilingual (English/Spanish).',
    availability: [],
    licensingInfo: {
      licenseNumber: 'PSY54321',
      state: 'NY',
      expirationDate: new Date('2025-09-15'),
      verified: true,
    },
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
    rating: 4.7,
    reviewCount: 156,
  },
  {
    therapistId: '4',
    name: 'Alex Thompson, LCSW',
    specialties: ['ADHD', 'Social Anxiety', 'Neurodivergent-Friendly'],
    demographics: ['Neurodivergent-Friendly', 'Young Adults'],
    bio: 'Licensed clinical social worker specializing in neurodivergent individuals and social anxiety. ADHD coaching certified.',
    availability: [],
    licensingInfo: {
      licenseNumber: 'LCSW98765',
      state: 'WA',
      expirationDate: new Date('2025-11-20'),
      verified: true,
    },
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    rating: 4.6,
    reviewCount: 73,
  },
];

// Generate mock availability slots for each therapist
export function generateMockAvailability(therapistId: string): AvailabilitySlot[] {
  const slots: AvailabilitySlot[] = [];
  const today = new Date();
  
  for (let day = 0; day < 14; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    
    // Skip weekends for some therapists
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    // Generate 3-5 slots per day
    const slotsPerDay = Math.floor(Math.random() * 3) + 3;
    
    for (let slot = 0; slot < slotsPerDay; slot++) {
      const startHour = 9 + slot * 2; // 9am, 11am, 1pm, 3pm, 5pm
      const startTime = new Date(date);
      startTime.setHours(startHour, 0, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(30); // 30-minute slots
      
      slots.push({
        slotId: `${therapistId}-${day}-${slot}`,
        therapistId,
        startTime,
        endTime,
        isBooked: Math.random() < 0.3, // 30% chance of being booked
        sessionType: Math.random() < 0.7 ? 'short' : 'standard',
      });
    }
  }
  
  return slots;
}
