
import React from 'react';
import { Payment } from '../types';
import { PaymentHistory } from './PaymentHistory';

interface PaymentManagerProps {
    payments: Payment[];
}

export const PaymentManager: React.FC<PaymentManagerProps> = ({ payments }) => {
    return (
        <div>
            <PaymentHistory payments={payments} />
        </div>
    );
};