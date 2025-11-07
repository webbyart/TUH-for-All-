
import React, { useState } from 'react';
import { Patient, QueueTicket as QueueTicketType } from '../types';
import { departments } from '../data/mockData';
import { ClipboardCheckIcon, TicketIcon } from './icons/Icons';
import { QueueTicket } from './QueueTicket';

interface QueueTicketRequestProps {
    user: Patient;
    onAddQueue: (ticket: QueueTicketType) => void;
}

export const QueueTicketRequest: React.FC<QueueTicketRequestProps> = ({ user, onAddQueue }) => {
    const [selectedDept, setSelectedDept] = useState(departments[0]);
    const [generatedTicket, setGeneratedTicket] = useState<QueueTicketType | null>(user.queueTicket || null);

    const handleRequestQueue = (e: React.FormEvent) => {
        e.preventDefault();
        if (generatedTicket) {
            alert('คุณมีบัตรคิวที่ใช้งานอยู่แล้ว');
            return;
        }

        const newTicket: QueueTicketType = {
            queueNumber: Math.floor(Math.random() * 100) + 200, // Random queue number for demo
            patientName: user.name,
            hn: user.hn,
            department: selectedDept,
            room: `${Math.floor(Math.random() * 5) + 10}${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`, // e.g., 10A, 12C
            timestamp: new Date().toISOString(),
            type: 'Examination',
        };
        setGeneratedTicket(newTicket);
        onAddQueue(newTicket);
    };
    
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center">
                <ClipboardCheckIcon className="w-8 h-8 mr-3 text-primary"/>
                ขอรับคิวตรวจ
            </h2>
            
            {!generatedTicket ? (
                <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md">
                    <form onSubmit={handleRequestQueue} className="space-y-4">
                        <div>
                            <label htmlFor="department" className="block text-lg font-medium text-text-primary-light dark:text-text-primary-dark">เลือกแผนกที่ต้องการตรวจ</label>
                            <select
                                id="department"
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                className="mt-2 block w-full p-3 border border-border-light dark:border-border-dark rounded-md bg-transparent focus:ring-2 focus:ring-primary focus:outline-none text-lg"
                            >
                                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-light transition-colors flex items-center justify-center text-lg"
                        >
                            <TicketIcon className="h-6 w-6 mr-2" />
                            ยืนยันและขอรับคิว
                        </button>
                    </form>
                </div>
            ) : (
                <div className="animate-fade-in">
                    <h3 className="text-xl font-semibold text-center text-green-600 mb-4">ออกบัตรคิวสำเร็จ!</h3>
                    <QueueTicket ticket={generatedTicket} />
                </div>
            )}
        </div>
    );
};