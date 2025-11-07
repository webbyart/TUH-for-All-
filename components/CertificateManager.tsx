
import React from 'react';
import { MedicalCertificateData } from '../types';
import { MedicalCertificate } from './MedicalCertificate';

interface CertificateManagerProps {
    certificate?: MedicalCertificateData;
    patientName: string;
}

export const CertificateManager: React.FC<CertificateManagerProps> = ({ certificate, patientName }) => {
    return (
        <div>
            <MedicalCertificate certificate={certificate} patientName={patientName} />
        </div>
    );
};