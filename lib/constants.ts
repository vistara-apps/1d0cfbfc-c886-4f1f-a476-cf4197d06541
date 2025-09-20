export const THERAPY_ISSUES = [
  'Anxiety',
  'Depression',
  'Trauma/PTSD',
  'Relationship Issues',
  'Work Stress',
  'Family Conflicts',
  'Grief & Loss',
  'Addiction',
  'Eating Disorders',
  'ADHD',
  'Bipolar Disorder',
  'OCD',
  'Social Anxiety',
  'Panic Disorders',
  'Life Transitions',
];

export const DEMOGRAPHIC_FOCUSES = [
  'LGBTQ+ Affirmative',
  'Cultural Competence',
  'Women\'s Issues',
  'Men\'s Issues',
  'Teen/Adolescent',
  'Young Adults',
  'Seniors',
  'Veterans',
  'Religious/Spiritual',
  'Multicultural',
  'Disability-Friendly',
  'Neurodivergent-Friendly',
];

export const SESSION_FORMATS = [
  { id: 'video', label: 'Video Call', icon: '📹' },
  { id: 'audio', label: 'Audio Call', icon: '📞' },
  { id: 'chat', label: 'Text Chat', icon: '💬' },
] as const;

export const SUBSCRIPTION_TIERS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 15,
    features: [
      'Access to therapist directory',
      'AI compatibility scoring',
      'Basic search filters',
      'Save favorite therapists',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 50,
    features: [
      'Everything in Basic',
      'Short therapy sessions (15-30 min)',
      'Priority booking',
      'Advanced matching algorithm',
      'Session history tracking',
    ],
  },
  {
    id: 'concierge',
    name: 'Concierge',
    price: 150,
    features: [
      'Everything in Premium',
      'Dedicated support specialist',
      'Custom therapist matching',
      'Flexible scheduling',
      'Emergency session access',
    ],
  },
];
