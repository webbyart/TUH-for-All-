
import React from 'react';
import { MedicalCertificateData } from '../types';
import { DocumentCheckIcon, HeartIcon } from './icons/Icons';


interface MedicalCertificateProps {
    certificate?: MedicalCertificateData;
    patientName: string;
}

export const MedicalCertificate: React.FC<MedicalCertificateProps> = ({ certificate, patientName }) => {
    
    if (!certificate) {
        return (
             <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md text-center">
                <DocumentCheckIcon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600"/>
                <h2 className="mt-4 text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">ไม่มีใบรับรองแพทย์</h2>
                <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">
                    ไม่พบข้อมูลใบรับรองแพทย์แบบอิเล็กทรอนิกส์สำหรับ {patientName}
                </p>
             </div>
        )
    }

    return (
        <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md">
            <div className="border-2 border-primary p-6 rounded-lg font-serif">
                <header className="text-center mb-8">
                    <div className="flex justify-center items-center gap-3">
                         <HeartIcon className="w-10 h-10 text-primary"/>
                         <h1 className="text-3xl font-bold text-primary">โรงพยาบาล TU for All</h1>
                    </div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">123 Healthway Rd, Wellness City | (02)-123-4567</p>
                    <h2 className="text-2xl font-semibold mt-6 border-b-2 pb-2">ใบรับรองแพทย์ (Medical Certificate)</h2>
                </header>

                <main className="space-y-4 text-text-primary-light dark:text-text-primary-dark">
                    <div className="flex justify-between">
                        <span><strong>เลขที่:</strong> {certificate.id}</span>
                        <span><strong>วันที่ออก:</strong> {certificate.issuedDate}</span>
                    </div>
                    <p><strong>ชื่อ-สกุลผู้ป่วย:</strong> {certificate.patientName}</p>
                    <p><strong>ผลการวินิจฉัย:</strong> {certificate.diagnosis}</p>
                    <p><strong>คำแนะนำของแพทย์:</strong> {certificate.recommendation}</p>
                </main>

                <footer className="mt-16 text-right">
                    <p>....................................................</p>
                    <p>({certificate.doctorName})</p>
                    <p>แพทย์ผู้ตรวจ</p>
                    <p>เลขที่ใบประกอบวิชาชีพ: {certificate.doctorLicense}</p>
                </footer>
            </div>
            <button className="mt-6 w-full px-4 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-light transition-colors">
                ดาวน์โหลดเป็น PDF
            </button>
        </div>
    );
}