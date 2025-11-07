
import React from 'react';
import { View } from '../types';
import {
  OpdOnlineIcon, CalendarPlusIcon, ClipboardCheckIcon, QueueListIcon, BeakerIcon,
  ShieldCheckIcon, WalletIcon, PillIcon, FaqIcon, DocumentCheckIcon
} from './icons/Icons';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

// Updated menuItems to include colorful gradients
const menuItems = [
  { view: 'opd-hub', label: 'OPD Online', icon: OpdOnlineIcon, gradientClass: 'bg-gradient-to-br from-sky-400 to-blue-500' },
  { view: 'appointment-manager', label: 'รายการนัด', icon: CalendarPlusIcon, gradientClass: 'bg-gradient-to-br from-purple-400 to-indigo-500' },
  { view: 'queue-request', label: 'ขอรับคิวตรวจ', icon: ClipboardCheckIcon, gradientClass: 'bg-gradient-to-br from-teal-400 to-cyan-500' },
  { view: 'queue-checker', label: 'ตรวจสอบคิว', icon: QueueListIcon, gradientClass: 'bg-gradient-to-br from-orange-400 to-amber-500' },
  { view: 'lab-request', label: 'รับคิวเจาะเลือด/LAB', icon: BeakerIcon, gradientClass: 'bg-gradient-to-br from-rose-400 to-pink-500' },
  { view: 'insurance-checker', label: 'ตรวจสอบสิทธิ์', icon: ShieldCheckIcon, gradientClass: 'bg-gradient-to-br from-emerald-400 to-green-500' },
  { view: 'payment-manager', label: 'ชำระเงิน', icon: WalletIcon, gradientClass: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
  { view: 'drug', label: 'ยาและปฏิกิริยา', icon: PillIcon, gradientClass: 'bg-gradient-to-br from-fuchsia-400 to-purple-500' },
  { view: 'dashboard', label: 'คำถามที่พบบ่อย', icon: FaqIcon, gradientClass: 'bg-gradient-to-br from-slate-400 to-gray-500' }, // Stays on dashboard for now
  { view: 'certificate-manager', label: 'ใบรับรองแพทย์', icon: DocumentCheckIcon, gradientClass: 'bg-gradient-to-br from-cyan-400 to-teal-500' },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">เมนูลัด</h2>
        <div className="grid grid-cols-4 gap-x-2 gap-y-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className="flex flex-col items-center justify-start text-center space-y-2 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-2"
              aria-label={item.label}
            >
              <div
                className={`flex items-center justify-center h-16 w-16 rounded-full text-white shadow-md transition-transform transform hover:scale-110 ${item.gradientClass}`}
              >
                <item.icon className="h-8 w-8" />
              </div>
              <span className="text-xs font-medium text-text-primary-light dark:text-text-primary-dark">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
       <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold text-primary mb-2">มีอะไรใหม่</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
                พบกับระบบ OPD Online เต็มรูปแบบ! จัดการนัดหมาย, ขอและตรวจสอบคิว, รับใบรับรองแพทย์ และอื่นๆ ได้ทันที
            </p>
        </div>
    </div>
  );
};
