
import React from 'react';
import { HeartIcon } from './icons/Icons';

const donationProjects = [
    {
        id: 1,
        title: 'โครงการจัดซื้อเครื่องมือแพทย์สำหรับผู้ป่วยวิกฤต',
        description: 'เพื่อเพิ่มศักยภาพในการดูแลผู้ป่วยที่มีภาวะวิกฤตและต้องการเครื่องมือช่วยชีวิตที่ทันสมัย',
        goal: 5000000,
        current: 2350000,
        image: 'https://picsum.photos/seed/med1/400/200',
    },
    {
        id: 2,
        title: 'กองทุนช่วยเหลือผู้ป่วยยากไร้',
        description: 'มอบโอกาสในการเข้าถึงการรักษาพยาบาลที่มีคุณภาพให้กับผู้ป่วยที่ขาดแคลนทุนทรัพย์',
        goal: 1000000,
        current: 780000,
        image: 'https://picsum.photos/seed/med2/400/200',
    },
    {
        id: 3,
        title: 'โครงการปรับปรุงอาคารผู้ป่วยนอก (OPD)',
        description: 'เพื่อพัฒนาสภาพแวดล้อมและสิ่งอำนวยความสะดวก ให้ผู้ป่วยได้รับบริการที่สะดวกสบายและรวดเร็วยิ่งขึ้น',
        goal: 10000000,
        current: 4500000,
        image: 'https://picsum.photos/seed/med3/400/200',
    },
];

export const Donations: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center">
                <HeartIcon className="w-8 h-8 mr-3 text-secondary" />
                ร่วมบริจาคและทำบุญ
            </h2>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
                ทุกการให้ของท่าน คือการต่อชีวิตและสร้างโอกาสให้กับผู้ป่วย
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donationProjects.map(project => (
                    <div key={project.id} className="bg-card-light dark:bg-card-dark rounded-xl shadow-md overflow-hidden flex flex-col transition-transform hover:scale-105 duration-300">
                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover"/>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">{project.title}</h3>
                            <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark flex-grow">{project.description}</p>
                            <div className="mt-4">
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div 
                                        className="bg-primary h-2.5 rounded-full" 
                                        style={{ width: `${(project.current / project.goal) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-sm mt-1 text-text-secondary-light dark:text-text-secondary-dark">
                                    <span>{project.current.toLocaleString()} บาท</span>
                                    <span>เป้าหมาย: {project.goal.toLocaleString()} บาท</span>
                                </div>
                            </div>
                            <button className="mt-6 w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors font-semibold">
                                บริจาคตอนนี้
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};