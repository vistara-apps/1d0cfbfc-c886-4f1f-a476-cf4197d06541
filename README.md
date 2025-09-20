# MindMeld Connect

A Base Mini App for connecting users with niche therapists via AI-powered matching and flexible session formats.

## Features

- **Niche Therapist Directory**: Curated database of licensed therapists with specific specialties
- **AI-Powered Compatibility Scoring**: Smart matching based on user needs and preferences
- **Flexible Session Formats**: Video, audio, and text-based therapy sessions
- **Short-Form Sessions**: 15-30 minute focused sessions for immediate support
- **Base Integration**: Native wallet authentication and payments

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```
Add your OnchainKit API key to `.env.local`

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Blockchain**: Base network integration via MiniKit
- **Identity**: OnchainKit for wallet authentication
- **TypeScript**: Full type safety throughout

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── ...             # Feature components
├── lib/                # Utilities and types
└── public/             # Static assets
```

## Key Components

- **OnboardingFlow**: Collects user preferences and needs
- **TherapistDirectory**: Displays matched therapists with compatibility scores
- **SessionBooking**: Handles appointment scheduling and payment
- **ProfileCard**: Reusable therapist/user profile component

## Deployment

This app is designed to be deployed as a Base Mini App. Follow the Base Mini App deployment guidelines for production deployment.
