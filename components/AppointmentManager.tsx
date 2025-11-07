
import React, { useState } from 'react';
import { Appointment } from '../types';
import { CalendarIcon } from './icons/Icons';

interface AppointmentManagerProps {
  appointments: Appointment[];
}

const statusColorMap: { [key in Appointment['status']]: string } = {
    'ยืนยันแล้ว': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
    'รอการยืนยัน': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/50 dark:text-yellow-200',
    'เลื่อนนัด': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
    'ยกเลิก': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
    'เสร็จสิ้น': 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200',
};

export const AppointmentManager: React.FC<AppointmentManagerProps> = ({ appointments }) => {
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  const filteredAppointments = appointments.filter(app => {
    const isPast = new Date(app.time.split(' ')[0]) < new Date();
    if (filter === 'upcoming') return !isPast || app.status === 'ยืนยันแล้ว' || app.status === 'รอการยืนยัน';
    return isPast && (app.status === 'เสร็จสิ้น' || app.status === 'ยกเลิก');
  }).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  return (
    <div className="space-y-6">
      <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md">
        <h3 className="text-2xl font-bold flex items-center mb-4">
            <CalendarIcon className="h-7 w-7 mr-3 text-primary"/>
            จัดการนัดหมาย
        </h3>
        
        {/* Filter Buttons */}
        <div className="flex border border-border-light dark:border-border-dark rounded-lg overflow-hidden w-full md:w-1/2 mx-auto">
            <button 
                onClick={() => setFilter('upcoming')}
                className={`w-1/2 p-3 font-semibold transition-colors ${filter === 'upcoming' ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
                นัดหมายที่จะถึง
            </button>
            <button 
                onClick={() => setFilter('past')}
                className={`w-1/2 p-3 font-semibold transition-colors ${filter === 'past' ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
                ประวัติการนัดหมาย
            </button>
        </div>
        
        <div className="mt-6 space-y-4">
          {filteredAppointments.length > 0 ? filteredAppointments.map(app => (
            <div key={app.id} className="p-4 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg text-text-primary-light dark:text-text-primary-dark">{app.department}</p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">{app.doctor}</p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">{app.time}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColorMap[app.status]}`}>
                  {app.status}
                </span>
              </div>
              {app.status === 'ยืนยันแล้ว' && (
                <div className="mt-4 flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">เลื่อนนัด</button>
                    <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">ยกเลิกนัด</button>
                </div>
              )}
            </div>
          )) : (
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-center py-8">ไม่มีรายการนัดหมายในหมวดนี้</p>
          )}
        </div>
      </div>
    </div>
  );
};