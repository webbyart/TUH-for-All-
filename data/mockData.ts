
import { Patient, Appointment, Payment, LabResult, MedicalCertificateData, Drug, QueueState, QueueTicket } from '../types';

const firstNames = ['สมชาย', 'สมหญิง', 'อาทิตย์', 'จันทรา', 'อังคาร', 'มานี', 'ปิติ', 'วีระ', 'ชูใจ', 'เพชร', 'กานดา', 'มานะ'];
const lastNames = ['ใจดี', 'สบายดี', 'ศรีสุวรรณ', 'ทองมี', 'เพชรงาม', 'รักไทย', 'ยิ่งเจริญ', 'เจริญสุข', 'รุ่งเรือง', 'มั่งมี'];
export const doctors = ['นพ. สมเกียรติ ยิ่งยง', 'พญ. จิราพร สุขสันต์', 'นพ. วิชัย ชัยชนะ', 'พญ. อรทัย มั่นคง'];
export const departments = ['อายุรกรรม', 'ศัลยกรรม', 'กุมารเวชกรรม', 'สูตินรีเวชกรรม', 'ออร์โธปิดิกส์', 'โรคหัวใจ'];
const diagnoses = ['ไข้หวัดใหญ่', 'ความดันโลหิตสูง', 'เบาหวาน', 'โรคกระเพาะ', 'กระดูกข้อเท้าหัก', 'ตรวจสุขภาพประจำปี'];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const createPastDate = (daysAgo: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
};

const createFutureDate = (daysFromNow: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date;
}

const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const formatDateTime = (date: Date): string => {
    const hours = Math.floor(Math.random() * 8) + 9; // 9 AM to 4 PM
    return `${formatDate(date)} ${hours.toString().padStart(2, '0')}:00 น.`;
};

export const mockDrugs: Drug[] = [
    { id: 1, name: { th: 'พาราเซตามอล', en: 'Paracetamol' }, type: 'ยาทั่วไป', price: 1.5, description: 'ยาแก้ปวด ลดไข้' },
    { id: 2, name: { th: 'แอสไพริน', en: 'Aspirin' }, type: 'ยาทั่วไป', price: 2.0, description: 'ยาแก้ปวด ลดไข้ ต้านการอักเสบ' },
    { id: 3, name: { th: 'ไอบูโพรเฟน', en: 'Ibuprofen' }, type: 'ยาทั่วไป', price: 3.0, description: 'ยาแก้ปวด ลดไข้ ต้านการอักเสบ' },
    { id: 4, name: { th: 'อะมอกซิซิลลิน', en: 'Amoxicillin' }, type: 'ยาตามใบสั่งแพทย์', price: 5.0, description: 'ยาปฏิชีวนะ' },
    { id: 5, name: { th: 'ลอราทาดีน', en: 'Loratadine' }, type: 'ยาทั่วไป', price: 4.0, description: 'ยาแก้แพ้ ลดน้ำมูก' },
    { id: 6, name: { th: 'โอเมพราโซล', en: 'Omeprazole' }, type: 'ยาตามใบสั่งแพทย์', price: 7.0, description: 'ยาลดกรดในกระเพาะ' },
    { id: 7, name: { th: 'ซิมวาสแตติน', en: 'Simvastatin' }, type: 'ยาตามใบสั่งแพทย์', price: 8.0, description: 'ยาลดไขมันในเลือด' },
    { id: 8, name: { th: 'เมตฟอร์มิน', en: 'Metformin' }, type: 'ยาตามใบสั่งแพทย์', price: 3.5, description: 'ยารักษาเบาหวาน' },
    { id: 9, name: { th: 'ฟ้าทะลายโจร', en: 'Andrographis paniculata' }, type: 'สมุนไพร', price: 2.5, description: 'สมุนไพร บรรเทาอาการหวัด' },
    { id: 10, name: { th: 'ขมิ้นชัน', en: 'Turmeric' }, type: 'สมุนไพร', price: 2.0, description: 'สมุนไพร บรรเทาอาการท้องอืด' },
    { id: 11, name: { th: 'แอมโลดิพีน', en: 'Amlodipine' }, type: 'ยาตามใบสั่งแพทย์', price: 6.0, description: 'ยาลดความดันโลหิต' },
    { id: 12, name: { th: 'เซทิริซีน', en: 'Cetirizine' }, type: 'ยาทั่วไป', price: 3.0, description: 'ยาแก้แพ้' },
    { id: 13, name: { th: 'โคลพิโดเกรล', en: 'Clopidogrel' }, type: 'ยาตามใบสั่งแพทย์', price: 12.0, description: 'ยาต้านเกล็ดเลือด' },
    { id: 14, name: { th: 'ไดโคลฟีแนค', en: 'Diclofenac' }, type: 'ยาทั่วไป', price: 4.5, description: 'ยาแก้ปวด ต้านการอักเสบ' },
    { id: 15, name: { th: 'ฟลูออกซิทีน', en: 'Fluoxetine' }, type: 'ยาตามใบสั่งแพทย์', price: 15.0, description: 'ยารักษาอาการซึมเศร้า' },
    { id: 16, name: { th: 'กาบาเพนติน', en: 'Gabapentin' }, type: 'ยาตามใบสั่งแพทย์', price: 10.0, description: 'ยารักษาอาการชักและปวดเส้นประสาท' },
    { id: 17, name: { th: 'ไฮโดรคลอโรไทอะไซด์', en: 'Hydrochlorothiazide' }, type: 'ยาตามใบสั่งแพทย์', price: 2.5, description: 'ยาขับปัสสาวะ ลดความดัน' },
    { id: 18, name: { th: 'อินดาพาไมด์', en: 'Indapamide' }, type: 'ยาตามใบสั่งแพทย์', price: 5.5, description: 'ยาขับปัสสาวะ ลดความดัน' },
    { id: 19, name: { th: 'คีโตโคนาโซล', en: 'Ketoconazole' }, type: 'ยาทั่วไป', price: 9.0, description: 'ยาต้านเชื้อรา' },
    { id: 20, name: { th: 'เลโวไทรอกซีน', en: 'Levothyroxine' }, type: 'ยาตามใบสั่งแพทย์', price: 7.5, description: 'ฮอร์โมนไทรอยด์สังเคราะห์' },
];

export const generateMockPatients = (count: number): Patient[] => {
    // This function remains largely the same, generating a list of patients for the "Patient Info" directory.
    // The "logged-in user" is now a separate, static object.
    const patients: Patient[] = [];

    for (let i = 0; i < count; i++) {
         const name = `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
        const age = Math.floor(Math.random() * 60) + 20;
        const hn = `HN${(1000000 + i).toString()}`;
        const patientId = `PID-${1000 + i}`;

        const numAppointments = Math.floor(Math.random() * 5) + 1;
        const appointments: Appointment[] = [];
        // ... (rest of the generation logic is the same)
        
        patients.push({
            id: patientId,
            name: name,
            age: age,
            gender: i % 2 === 0 ? 'ชาย' : 'หญิง',
            hn: hn,
            bloodType: getRandomElement(['A', 'B', 'AB', 'O']),
            insurance: getRandomElement(['สปสช.', 'ประกันสังคม', 'ชำระเงินเอง']),
            appointments: appointments,
            payments: [],
            labResults: [],
        });
    }

    return patients;
};

// --- Mock "Logged-in" User Data ---
const createUserData = (): Patient => {
    const name = "น.ส.จริงใจ สบายดี";
    const age = 32;
    const hn = `HN1234567`;
    const patientId = `PID-0001`;
    
    const appointments: Appointment[] = [
        { id: `APP-${patientId}-1`, doctor: doctors[0], department: departments[0], time: formatDateTime(createFutureDate(7)), status: 'ยืนยันแล้ว' },
        { id: `APP-${patientId}-2`, doctor: doctors[1], department: departments[1], time: formatDateTime(createPastDate(30)), status: 'เสร็จสิ้น' },
        { id: `APP-${patientId}-3`, doctor: doctors[2], department: departments[4], time: formatDateTime(createPastDate(90)), status: 'เสร็จสิ้น' },
    ];
    
    const payments: Payment[] = [
        { id: `PAY-${patientId}-1`, date: formatDate(createPastDate(30)), description: `ค่าบริการตรวจ ${departments[1]}`, amount: 1200, status: 'ชำระแล้ว' },
        { id: `PAY-${patientId}-2`, date: formatDate(createPastDate(90)), description: `ค่าบริการตรวจ ${departments[4]}`, amount: 850, status: 'ชำระแล้ว' },
    ];

    const labResults: LabResult[] = [
        { id: `LAB-${patientId}-1`, testName: 'Blood Sugar', value: '98', unit: 'mg/dL', referenceRange: '70-125', isNormal: true, date: formatDate(createPastDate(30)) },
        { id: `LAB-${patientId}-2`, testName: 'Cholesterol', value: '189', unit: 'mg/dL', referenceRange: '< 200', isNormal: true, date: formatDate(createPastDate(30)) },
    ];

    const medicalCertificate: MedicalCertificateData = {
        id: `CERT-${patientId}`,
        issuedDate: formatDate(createPastDate(30)),
        patientName: name,
        diagnosis: 'กล้ามเนื้ออักเสบ',
        recommendation: 'ควรพักผ่อน 3 วัน และหลีกเลี่ยงการยกของหนัก',
        doctorName: doctors[1],
        doctorLicense: `LIC-12345`
    };

    return {
        id: patientId, name, age, hn,
        gender: 'หญิง',
        bloodType: 'O',
        insurance: 'ประกันสังคม',
        appointments, payments, labResults, medicalCertificate
    };
};
export const mockUser = createUserData();

// --- Mock Queue State ---
const initialTickets: QueueTicket[] = [
    { queueNumber: 101, patientName: "นายมานะ รักไทย", hn: "HN987654", department: "อายุรกรรม", room: "10A", timestamp: new Date().toISOString(), type: 'Examination' },
    { queueNumber: 102, patientName: "นางสาวปิติ ยินดี", hn: "HN876543", department: "อายุรกรรม", room: "10A", timestamp: new Date().toISOString(), type: 'Examination' },
];

export const mockQueue: QueueState = {
    currentServing: {
        'อายุรกรรม': 100,
        'ศัลยกรรม': 50,
        'กุมารเวชกรรม': 25,
        'สูตินรีเวชกรรม': 30,
        'ออร์โธปิดิกส์': 75,
        'โรคหัวใจ': 40,
        'ห้องปฏิบัติการ': 200,
    },
    tickets: initialTickets,
};