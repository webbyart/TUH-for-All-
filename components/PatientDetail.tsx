
import React, { useState } from 'react';
import { Patient } from '../types';
import { PaymentHistory } from './PaymentHistory';
import { LabResults } from './LabResults';
import { MedicalCertificate } from './MedicalCertificate';
import { CalendarIcon, CreditCardIcon, TestTubeIcon, DocumentCheckIcon } from './icons/Icons';
import { AppointmentManager } from './AppointmentManager';

interface PatientDetailProps {
  patient: Patient;
}

type PatientDetailView = 'appointments' | 'payments' | 'labs' | 'certificate';

export const PatientDetail: React.FC<PatientDetailProps> = ({ patient }) => {
    const [activeTab, setActiveTab] = useState<PatientDetailView>('appointments');

    const renderContent = () => {
        switch (activeTab) {
            case 'appointments':
                // Using AppointmentManager now for consistency
                return <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md"><AppointmentManager appointments={patient.appointments} /></div>;
            case 'payments':
                return <PaymentHistory payments={patient.payments} />;
            case 'labs':
                return <LabResults labResults={patient.labResults} />;
            case 'certificate':
                return <MedicalCertificate certificate={patient.medicalCertificate} patientName={patient.name} />;
        }
    };

    const tabs = [
        { id: 'appointments', label: 'นัดหมาย', icon: CalendarIcon },
        { id: 'payments', label: 'ประวัติชำระเงิน', icon: CreditCardIcon },
        { id: 'labs', label: 'ผล LAB', icon: TestTubeIcon },
        { id: 'certificate', label: 'ใบรับรองแพทย์', icon: DocumentCheckIcon },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Patient Info Header */}
            <div className="p-5 bg-card-light dark:bg-card-dark rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-primary">{patient.name}</h2>
                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-text-secondary-light dark:text-text-secondary-dark">
                    <span>HN: {patient.hn}</span>
                    <span>อายุ: {patient.age} ปี</span>
                    <span>เพศ: {patient.gender}</span>
                    <span>กรุ๊ปเลือด: {patient.bloodType}</span>
                    <span>สิทธิ์การรักษา: {patient.insurance}</span>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {tabs.map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as PatientDetailView)}
                        className={`flex items-center justify-center p-3 rounded-lg font-semibold transition-colors duration-200 ${
                            activeTab === tab.id 
                            ? 'bg-primary text-white shadow' 
                            : 'bg-card-light dark:bg-card-dark hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        <tab.icon className="h-5 w-5 mr-2" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>
                {renderContent()}
            </div>
        </div>
    );
};