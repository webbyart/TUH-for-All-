
import React from 'react';
import { QueueTicket as QueueTicketType } from '../types';
import { HeartIcon, PrinterIcon } from './icons/Icons';

interface QueueTicketProps {
    ticket: QueueTicketType;
}

export const QueueTicket: React.FC<QueueTicketProps> = ({ ticket }) => {
    
    const handlePrint = () => {
        window.print();
    }

    return (
        <div className="max-w-md mx-auto">
            <div id="printable-ticket" className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg border-t-8 border-primary p-6 relative">
                <div className="text-center mb-6">
                    <HeartIcon className="w-12 h-12 mx-auto text-primary" />
                    <h2 className="text-2xl font-bold mt-2 text-text-primary-light dark:text-text-primary-dark">โรงพยาบาล TU for All</h2>
                    <p className="text-lg font-semibold text-primary">{ticket.type === 'Examination' ? 'บัตรคิวห้องตรวจ' : 'บัตรคิวห้องปฏิบัติการ'}</p>
                </div>

                <div className="text-center my-8">
                    <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">หมายเลขคิวของคุณ</p>
                    <p className="text-8xl font-bold text-primary tracking-tighter">{ticket.queueNumber}</p>
                </div>

                <div className="border-t border-dashed border-border-light dark:border-border-dark my-6"></div>

                <div className="space-y-3 text-lg">
                    <div className="flex justify-between">
                        <span className="font-semibold text-text-secondary-light dark:text-text-secondary-dark">ชื่อ-สกุล:</span>
                        <span className="font-bold text-text-primary-light dark:text-text-primary-dark">{ticket.patientName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-text-secondary-light dark:text-text-secondary-dark">HN:</span>
                        <span className="font-bold text-text-primary-light dark:text-text-primary-dark">{ticket.hn}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="font-semibold text-text-secondary-light dark:text-text-secondary-dark">แผนก:</span>
                        <span className="font-bold text-text-primary-light dark:text-text-primary-dark">{ticket.department}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-text-secondary-light dark:text-text-secondary-dark">ห้องตรวจ:</span>
                        <span className="font-bold text-text-primary-light dark:text-text-primary-dark">{ticket.room}</span>
                    </div>
                </div>

                <p className="text-center text-xs text-text-secondary-light dark:text-text-secondary-dark mt-8">
                    ออก ณ วันที่ {new Date(ticket.timestamp).toLocaleString('th-TH')}
                </p>
            </div>
             <button 
                onClick={handlePrint}
                className="mt-6 w-full flex items-center justify-center px-4 py-3 bg-secondary text-white font-bold rounded-md hover:bg-secondary-light transition-colors"
            >
                <PrinterIcon className="h-6 w-6 mr-2" />
                พิมพ์บัตรคิว
            </button>
        </div>
    );
};