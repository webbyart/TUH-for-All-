
import React from 'react';
import { Theme } from '../types';
import { SunIcon, MoonIcon, UserCircleIcon, BellIcon, ArrowLeftIcon } from './icons/Icons';

interface HeaderProps {
  user: { name: string };
  theme: Theme;
  toggleTheme: () => void;
  showBack?: boolean;
  onBack?: () => void;
  backText?: string;
  isPatientDetail?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ user, theme, toggleTheme, showBack, onBack, backText, isPatientDetail }) => {
  return (
    <header className="flex-shrink-0 flex items-center justify-between p-4 bg-transparent text-text-primary-light dark:text-text-primary-dark">
      <div className="flex items-center space-x-3">
        {showBack ? (
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Back"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        ) : (
          <UserCircleIcon className="h-10 w-10 text-primary" />
        )}
        <div>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{showBack ? backText : 'สวัสดี'}</p>
          <p className="font-semibold -mt-1">{isPatientDetail ? 'ข้อมูลผู้ป่วย' : user.name}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
         <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          aria-label="Notifications"
        >
          <BellIcon className="h-6 w-6" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <MoonIcon className="h-6 w-6" />
          ) : (
            <SunIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </header>
  );
};