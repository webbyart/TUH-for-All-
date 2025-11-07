export type Theme = 'light' | 'dark';
export type View = 
  | 'dashboard' 
  | 'drug' 
  | 'donation' 
  | 'patient-info' 
  | 'history' 
  | 'news'
  // OPD Hub and its children
  | 'opd-hub'
  | 'appointment-manager'
  | 'queue-request'
  | 'queue-ticket-request' // A view to show the generated ticket
  | 'queue-checker'
  | 'lab-request'
  | 'insurance-checker'
  | 'payment-manager'
  | 'certificate-manager';


export interface User {
  name: string;
}

export interface Drug {
  id: number;
  name: {
    th: string;
    en: string;
  };
  type: 'ยาทั่วไป' | 'ยาตามใบสั่งแพทย์' | 'สมุนไพร';
  price: number;
  description: string;
}

export interface InteractionResult {
  drugA: string;
  drugB: string;
  interaction: {
    th: string;
    en: string;
  };
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Unknown';
  recommendation: {
    th: string;
    en: string;
  };
}

export interface Appointment {
    id: string;
    doctor: string;
    department: string;
    time: string;
    status: 'ยืนยันแล้ว' | 'รอการยืนยัน' | 'เลื่อนนัด' | 'ยกเลิก' | 'เสร็จสิ้น';
}

export interface QueueTicket {
    queueNumber: number;
    patientName: string;
    hn: string;
    department: string;
    room: string;
    timestamp: string;
    type: 'Examination' | 'Laboratory';
}

export interface QueueState {
    currentServing: {
        [department: string]: number;
    };
    tickets: QueueTicket[];
}

export interface Payment {
    id: string;
    date: string;
    description: string;
    amount: number;
    status: 'ชำระแล้ว' | 'รอชำระ';
}

export interface LabResult {
    id: string;
    testName: string;
    value: string;
    unit: string;
    referenceRange: string;
    isNormal: boolean;
    date: string;
}

export interface MedicalCertificateData {
    id: string;
    issuedDate: string;
    patientName: string;
    diagnosis: string;
    recommendation: string;
    doctorName: string;
    doctorLicense: string;
}

export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'ชาย' | 'หญิง';
    hn: string; // Hospital Number
    bloodType: string;
    insurance: 'สปสช.' | 'ประกันสังคม' | 'ชำระเงินเอง';
    appointments: Appointment[];
    payments: Payment[];
    labResults: LabResult[];
    medicalCertificate?: MedicalCertificateData;
    queueTicket?: QueueTicket; // A patient can have one active ticket
}