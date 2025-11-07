
import React, { useState, useMemo } from 'react';
import { QueueState, QueueTicket } from '../types';
import { QueueListIcon, SearchIcon, UserCircleIcon, CheckCircleIcon } from './icons/Icons';

interface QueueStatusCheckerProps {
    queueState: QueueState;
}

export const QueueStatusChecker: React.FC<QueueStatusCheckerProps> = ({ queueState }) => {
    const [searchQueue, setSearchQueue] = useState('');
    const [searchedTicket, setSearchedTicket] = useState<QueueTicket | null>(null);
    const [error, setError] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSearchedTicket(null);
        if (!searchQueue) {
            setError('กรุณาใส่หมายเลขคิว');
            return;
        }
        const ticket = queueState.tickets.find(t => t.queueNumber.toString() === searchQueue);
        if (ticket) {
            setSearchedTicket(ticket);
        } else {
            setError('ไม่พบหมายเลขคิวนี้ในระบบ');
        }
    };

    const queueInfo = useMemo(() => {
        if (!searchedTicket) return null;

        const currentServing = queueState.currentServing[searchedTicket.department] || 0;
        const peopleAhead = searchedTicket.queueNumber - currentServing - 1;

        return {
            currentServing,
            peopleAhead: Math.max(0, peopleAhead)
        };
    }, [searchedTicket, queueState]);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center">
                <QueueListIcon className="w-8 h-8 mr-3 text-primary"/>
                ตรวจสอบสถานะคิว
            </h2>

            <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md">
                <form onSubmit={handleSearch} className="flex space-x-2">
                    <div className="relative flex-grow">
                         <input
                            type="number"
                            value={searchQueue}
                            onChange={(e) => setSearchQueue(e.target.value)}
                            placeholder="กรอกหมายเลขคิวของคุณ"
                            className="w-full p-3 pl-10 border border-border-light dark:border-border-dark rounded-md bg-transparent focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                         <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary-light dark:text-text-secondary-dark" />
                    </div>
                    <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-light transition-colors">
                        ค้นหา
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>

            {searchedTicket && queueInfo && (
                <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md animate-fade-in">
                    <h3 className="text-xl font-semibold mb-4 text-center">ผลการตรวจสอบสำหรับคิวหมายเลข {searchedTicket.queueNumber}</h3>
                     <div className="bg-background-light dark:bg-background-dark rounded-lg p-6 flex flex-col md:flex-row justify-around items-center text-center shadow-inner space-y-4 md:space-y-0">
                        <div>
                            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">แผนก</p>
                            <p className="text-2xl font-bold">{searchedTicket.department}</p>
                        </div>
                        <div>
                            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">คิวที่ให้บริการอยู่</p>
                            <p className="text-5xl font-bold">{queueInfo.currentServing}</p>
                        </div>
                        <div>
                            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">คิวของคุณ</p>
                            <p className="text-5xl font-bold text-primary">{searchedTicket.queueNumber}</p>
                        </div>
                    </div>

                    {queueInfo.peopleAhead === 0 && searchedTicket.queueNumber > queueInfo.currentServing ? (
                        <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-800/50 text-yellow-800 dark:text-yellow-200 rounded-lg text-center font-semibold">
                            ถึงคิวของคุณแล้ว กรุณาไปที่ห้องตรวจ {searchedTicket.room}
                        </div>
                    ) : searchedTicket.queueNumber <= queueInfo.currentServing ? (
                        <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-lg text-center font-semibold flex items-center justify-center">
                            <CheckCircleIcon className="w-6 h-6 mr-2"/>
                            การรับบริการของคุณเสร็จสิ้นแล้ว
                        </div>
                    ) : (
                         <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg text-center font-semibold flex items-center justify-center">
                            <UserCircleIcon className="w-6 h-6 mr-2"/>
                            เหลืออีก {queueInfo.peopleAhead} คิวจะถึงคิวของคุณ
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};