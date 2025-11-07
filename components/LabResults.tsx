
import React from 'react';
import { LabResult } from '../types';
import { TestTubeIcon } from './icons/Icons';

interface LabResultsProps {
    labResults: LabResult[];
}

export const LabResults: React.FC<LabResultsProps> = ({ labResults }) => {
    return (
        <div className="space-y-6 p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center">
                <TestTubeIcon className="w-8 h-8 mr-3 text-primary"/>
                ผลการตรวจทางห้องปฏิบัติการ (LAB)
            </h2>

             <div className="rounded-xl border border-border-light dark:border-border-dark overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-background-light dark:bg-background-dark">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">วันที่ตรวจ</th>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">รายการตรวจ</th>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider text-center">ผลตรวจ</th>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">หน่วย</th>
                                <th className="px-6 py-3 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">ค่าอ้างอิง</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light dark:divide-border-dark">
                            {labResults.length > 0 ? labResults.map((result) => (
                                <tr key={result.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light dark:text-text-secondary-dark">{result.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{result.testName}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-center ${result.isNormal ? 'text-green-600' : 'text-red-600'}`}>
                                        {result.value}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light dark:text-text-secondary-dark">{result.unit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light dark:text-text-secondary-dark">{result.referenceRange}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 text-text-secondary-light dark:text-text-secondary-dark">
                                        ไม่มีผลการตรวจ LAB
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}