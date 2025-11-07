
import React from 'react';
import { View } from '../types';
import { HomeIcon, UserOutlineIcon, PillIcon, NewspaperIcon } from './icons/Icons';

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const navItems: { view: View; label: string; icon: React.FC<any> }[] = [
  { view: 'dashboard', label: 'หน้าหลัก', icon: HomeIcon },
  { view: 'patient-info', label: 'ข้อมูลผู้ป่วย', icon: UserOutlineIcon },
  { view: 'drug', label: 'ยาและปฏิกิริยา', icon: PillIcon },
  { view: 'news', label: 'ข่าวสาร', icon: NewspaperIcon },
];

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="flex-shrink-0 bg-card-light dark:bg-card-dark shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-border-light dark:border-border-dark">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          const colorClass = isActive ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark';
          
          return (
            <a
              key={item.view}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.view);
              }}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${colorClass} hover:text-primary dark:hover:text-primary-light`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};