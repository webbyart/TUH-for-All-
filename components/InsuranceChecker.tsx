
import React from 'react';
import { Patient } from '../types';
import { ShieldCheckIcon } from './icons/Icons';

interface InsuranceCheckerProps {
    patient: Patient;
}

export const InsuranceChecker: React.FC<InsuranceCheckerProps> = ({ patient }) => {
    return (
        <div className="space-y-6">
             <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center">
                <ShieldCheckIcon className="w-8 h-8 mr-3 text-primary"/>
                ตรวจสอบสิทธิ์การรักษา
            </h2>
             <div className="p-8 bg-card-light dark:bg-card-dark rounded-xl shadow-md">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <ShieldCheckIcon className="w-16 h-16 text-primary" />
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">ผู้ป่วย: {patient.name} (HN: {patient.hn})</p>
                        <h3 className="text-4xl font-bold text-primary my-1">{patient.insurance}</h3>
                        <p className="text-lg font-semibold text-green-600 dark:text-green-400">สถานะ: <span className="underline">ใช้งานได้</span></p>
                    </div>
                </div>
                <div className="mt-6 border-t border-border-light dark:border-border-dark pt-4 text-text-secondary-light dark:text-text-secondary-dark space-y-2">
                    <p><strong>เงื่อนไข:</strong> สามารถใช้สิทธิ์ได้ที่โรงพยาบาล TU for All และโรงพยาบาลในเครือข่าย</p>
                    <p><strong>ข้อมูลเพิ่มเติม:</strong> กรุณาแสดงบัตรประชาชนทุกครั้งก่อนรับบริการเพื่อยืนยันสิทธิ์</p>
                </div>
             </div>
        </div>
    );
};