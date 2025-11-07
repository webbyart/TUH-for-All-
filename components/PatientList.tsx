
import React, { useState, useMemo } from 'react';
import { Patient } from '../types';
import { UserCircleIcon, SearchIcon } from './icons/Icons';

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
}

export const PatientList: React.FC<PatientListProps> = ({ patients, onSelectPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = useMemo(() => {
    if (!searchTerm) {
      return patients;
    }
    return patients.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.hn.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  return (
    <div className="space-y-4 animate-fade-in">
        <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">ข้อมูลผู้ป่วย</h2>
        
        <div className="relative">
            <input 
                type="text"
                placeholder="ค้นหาด้วยชื่อ หรือ HN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-border-light dark:border-border-dark rounded-xl bg-card-light dark:bg-card-dark focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary-light dark:text-text-secondary-dark" />
        </div>

      <div className="space-y-3">
        {filteredPatients.map(patient => (
          <button 
            key={patient.id} 
            onClick={() => onSelectPatient(patient)}
            className="w-full text-left flex items-center p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
            >
            <UserCircleIcon className="h-10 w-10 text-primary mr-4" />
            <div>
              <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">{patient.name}</p>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">HN: {patient.hn} - อายุ: {patient.age} ปี</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
