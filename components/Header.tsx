'use client';

import { Heart, Menu } from 'lucide-react';

interface HeaderProps {
  user?: {
    displayName?: string;
    pfpUrl?: string;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="bg-surface shadow-sm border-b border-gray-100">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">MindMeld Connect</h1>
            <p className="text-sm text-text-secondary">Find your perfect therapist</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {user && (
            <div className="flex items-center space-x-2">
              {user.pfpUrl && (
                <img
                  src={user.pfpUrl}
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm font-medium text-text-primary">
                {user.displayName || 'User'}
              </span>
            </div>
          )}
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
            <Menu className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
      </div>
    </header>
  );
}
