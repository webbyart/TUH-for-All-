
import React from 'react';
import { View } from '../types';
import { 
    CalendarPlusIcon, ClipboardCheckIcon, QueueListIcon, BeakerIcon, 
    ShieldCheckIcon, WalletIcon, DocumentCheckIcon 
} from './icons/Icons';

interface OpdOnlineHubProps {
  onNavigate: (view: View) => void;
}

const hubItems = [
  { view: 'appointment-manager', label: 'จัดการนัดหมาย', icon: CalendarPlusIcon, description: 'ดูและจัดการนัดหมายของคุณ' },
  { view: 'queue-request', label: 'ขอรับคิวตรวจ', icon: ClipboardCheckIcon, description: 'รับคิวตรวจกับแผนกต่างๆ' },
  { view: 'queue-checker', label: 'ตรวจสอบคิว', icon: QueueListIcon, description: 'ตรวจสอบสถานะคิวของคุณ' },
  { view: 'lab-request', label: 'ขอคิวเจาะเลือด/LAB', icon: BeakerIcon, description: 'รับคิวสำหรับบริการห้องปฏิบัติการ' },
  { view: 'insurance-checker', label: 'ตรวจสอบสิทธิ์', icon: ShieldCheckIcon, description: 'ดูข้อมูลสิทธิ์การรักษา' },
  { view: 'payment-manager', label: 'ประวัติชำระเงิน', icon: WalletIcon, description: 'ดูประวัติการชำระเงินทั้งหมด' },
  { view: 'certificate-manager', label: 'ใบรับรองแพทย์', icon: DocumentCheckIcon, description: 'ดูและดาวน์โหลดใบรับรองแพทย์' },
];

export const OpdOnlineHub: React.FC<OpdOnlineHubProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">ศูนย์บริการ OPD Online</h2>
      <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
        เลือกบริการที่คุณต้องการด้านล่างนี้
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hubItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className="text-left p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md hover:shadow-lg hover:border-primary border-2 border-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                 <item.icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark group-hover:text-primary transition-colors">
                  {item.label}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};