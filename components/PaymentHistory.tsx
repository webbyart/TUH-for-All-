
import React from 'react';
import { CreditCardIcon } from './icons/Icons';
import { Payment } from '../types';

interface PaymentHistoryProps {
    payments: Payment[];
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
    return (
        <div className="space-y-6 p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center">
                <CreditCardIcon className="w-8 h-8 mr-3 text-primary"/>
                ประวัติการชำระเงิน
            </h2>

            <div className="rounded-xl border border-border-light dark:border-border-dark overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-background-light dark:bg-background-dark">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">รหัสอ้างอิง</th>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">วันที่</th>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">รายละเอียด</th>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider text-right">จำนวนเงิน (บาท)</th>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider text-center">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light dark:divide-border-dark">
                            {payments.length > 0 ? payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{payment.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light dark:text-text-secondary-dark">{payment.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light dark:text-text-secondary-dark">{payment.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary-light dark:text-text-primary-dark text-right">{payment.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            payment.status === 'ชำระแล้ว' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 text-text-secondary-light dark:text-text-secondary-dark">
                                        ไม่มีประวัติการชำระเงิน
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};