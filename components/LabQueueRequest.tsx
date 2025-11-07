
import React, { useState } from 'react';
import { Patient, QueueTicket as QueueTicketType } from '../types';
import { BeakerIcon, TicketIcon } from './icons/Icons';
import { QueueTicket } from './QueueTicket';

interface LabQueueRequestProps {
    user: Patient;
    onAddQueue: (ticket: QueueTicketType) => void;
}

export const LabQueueRequest: React.FC<LabQueueRequestProps> = ({ user, onAddQueue }) => {
    const [generatedTicket, setGeneratedTicket] = useState<QueueTicketType | null>(
        user.queueTicket && user.queueTicket.type === 'Laboratory' ? user.queueTicket : null
    );

    const handleRequestQueue = (e: React.FormEvent) => {
        e.preventDefault();
        if (generatedTicket || (user.queueTicket && user.queueTicket.type !== 'Laboratory')) {
            alert('คุณมีบัตรคิวอื่นที่ใช้งานอยู่แล้ว');
            return;
        }

        const newTicket: QueueTicketType = {
            queueNumber: Math.floor(Math.random() * 50) + 250, // Higher queue numbers for lab
            patientName: user.name,
            hn: user.hn,
            department: 'ห้องปฏิบัติการ (LAB)',
            room: 'LAB-1',
            timestamp: new Date().toISOString(),
            type: 'Laboratory',
        };
        setGeneratedTicket(newTicket);
        onAddQueue(newTicket);
    };
    
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center">
                <BeakerIcon className="w-8 h-8 mr-3 text-primary"/>
                ขอรับคิวเจาะเลือด / LAB
            </h2>
            
            {!generatedTicket ? (
                <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md text-center">
                     <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-6">
                        กดปุ่มด้านล่างเพื่อยืนยันและรับบัตรคิวสำหรับบริการห้องปฏิบัติการ
                     </p>
                    <form onSubmit={handleRequestQueue} className="space-y-4">
                        <button
                            type="submit"
                            className="w-full md:w-1/2 px-4 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-light transition-colors flex items-center justify-center text-lg mx-auto"
                        >
                            <TicketIcon className="h-6 w-6 mr-2" />
                            ยืนยันและขอรับคิว LAB
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