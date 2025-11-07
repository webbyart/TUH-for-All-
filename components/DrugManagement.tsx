
import React, { useState, useCallback } from 'react';
import { Drug, InteractionResult } from '../types';
import { checkDrugInteractions } from '../services/geminiService';
import { PlusIcon, TrashIcon, SparklesIcon, ExclamationIcon, BookOpenIcon, DatabaseIcon } from './icons/Icons';

interface DrugManagementProps {
  dbDrugs: Drug[];
  onAddDrug: (newDrug: Omit<Drug, 'id'>) => void;
}

const getSeverityClass = (severity: InteractionResult['severity']) => {
  switch (severity) {
    case 'Severe':
      return 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200';
    case 'Moderate':
      return 'bg-yellow-100 dark:bg-yellow-800/50 border-yellow-500 text-yellow-800 dark:text-yellow-200';
    case 'Mild':
      return 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200';
    default:
      return 'bg-gray-100 dark:bg-gray-700/50 border-gray-500 text-gray-800 dark:text-gray-200';
  }
};

export const DrugManagement: React.FC<DrugManagementProps> = ({ dbDrugs, onAddDrug }) => {
  const [personalDrugs, setPersonalDrugs] = useState<Drug[]>([]);
  const [selectedDrugId, setSelectedDrugId] = useState<string>('');
  const [selectedForCheck, setSelectedForCheck] = useState<number[]>([]);
  const [interactionResult, setInteractionResult] = useState<InteractionResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for adding a new drug to the database
  const [newDbDrug, setNewDbDrug] = useState({ nameTh: '', nameEn: '', type: 'ยาทั่วไป', price: '', description: '' });

  const addDrugToPersonalList = () => {
    if (selectedDrugId) {
      const drugToAdd = dbDrugs.find(d => d.id === parseInt(selectedDrugId));
      if (drugToAdd && !personalDrugs.some(d => d.id === drugToAdd.id)) {
        setPersonalDrugs([...personalDrugs, drugToAdd]);
      }
      setSelectedDrugId('');
    }
  };

  const removeDrugFromPersonalList = (id: number) => {
    setPersonalDrugs(personalDrugs.filter(drug => drug.id !== id));
    setSelectedForCheck(selectedForCheck.filter(selectedId => selectedId !== id));
  };
  
  const handleDrugSelectionForCheck = (id: number) => {
    setSelectedForCheck(prev => 
      prev.includes(id) ? prev.filter(dId => dId !== id) : [...prev, id]
    );
  };

  const handleCheckInteractions = useCallback(async () => {
    if (selectedForCheck.length < 2) {
      setError('กรุณาเลือกยาอย่างน้อย 2 รายการเพื่อตรวจสอบ');
      return;
    }
    setError(null);
    setIsLoading(true);
    setInteractionResult(null);

    const drugsToCompare = personalDrugs.filter(d => selectedForCheck.includes(d.id));

    try {
      const result = await checkDrugInteractions(drugsToCompare);
      setInteractionResult(result);
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด');
    } finally {
      setIsLoading(false);
    }
  }, [selectedForCheck, personalDrugs]);

  const handleAddNewDbDrug = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDbDrug.nameTh && newDbDrug.nameEn && newDbDrug.price && newDbDrug.description) {
      onAddDrug({
        name: { th: newDbDrug.nameTh, en: newDbDrug.nameEn },
        type: newDbDrug.type as Drug['type'],
        price: parseFloat(newDbDrug.price),
        description: newDbDrug.description
      });
      setNewDbDrug({ nameTh: '', nameEn: '', type: 'ยาทั่วไป', price: '', description: '' }); // Reset form
    } else {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">การจัดการยาและปฏิกิริยาของยา</h2>
      
      {/* Personal Drug List */}
      <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md space-y-4">
        <h3 className="text-xl font-semibold flex items-center"><BookOpenIcon className="h-6 w-6 mr-2 text-primary"/>รายการยาของคุณ</h3>
        <div className="flex space-x-2">
          <select 
            value={selectedDrugId}
            onChange={(e) => setSelectedDrugId(e.target.value)}
            className="flex-grow p-2 border border-border-light dark:border-border-dark rounded-md bg-transparent focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="">-- เลือกยาจากฐานข้อมูล --</option>
            {dbDrugs.map(drug => <option key={drug.id} value={drug.id}>{drug.name.th} ({drug.name.en})</option>)}
          </select>
          <button onClick={addDrugToPersonalList} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" /> เพิ่ม
          </button>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {personalDrugs.map(drug => (
            <div key={drug.id} className="flex items-center justify-between p-3 bg-background-light dark:bg-background-dark rounded-md">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`drug-${drug.id}`}
                  checked={selectedForCheck.includes(drug.id)}
                  onChange={() => handleDrugSelectionForCheck(drug.id)}
                  className="h-5 w-5 rounded text-primary focus:ring-primary-light border-gray-300"
                />
                <label htmlFor={`drug-${drug.id}`} className="ml-3 text-text-primary-light dark:text-text-primary-dark">{drug.name.th} <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">({drug.name.en}) - {drug.type}</span></label>
              </div>
              <button onClick={() => removeDrugFromPersonalList(drug.id)} className="p-1 text-red-500 hover:text-red-700">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Interaction Checker */}
      <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md space-y-4">
        <h3 className="text-xl font-semibold">ตรวจสอบปฏิกิริยาระหว่างยา</h3>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">เลือกยา 2 รายการขึ้นไปจากรายการของคุณเพื่อตรวจสอบ</p>
        <button 
          onClick={handleCheckInteractions} 
          disabled={isLoading || selectedForCheck.length < 2}
          className="w-full px-4 py-3 bg-primary text-white rounded-md hover:bg-primary-light transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
        >
          {isLoading ? "กำลังตรวจสอบ..." : <><SparklesIcon className="h-5 w-5 mr-2" /> ตรวจสอบด้วย Gemini AI</>}
        </button>
        {error && <p className="text-red-500 dark:text-red-400 mt-4 text-center">{error}</p>}
      </div>

      {/* Results */}
      {interactionResult && (
        <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md animate-fade-in">
          <h3 className="text-xl font-semibold mb-4">ผลการตรวจสอบ</h3>
          {interactionResult.length > 0 ? (
            <div className="space-y-4">
              {interactionResult.map((result, index) => {
                const drugA_full = personalDrugs.find(d => d.name.en === result.drugA);
                const drugB_full = personalDrugs.find(d => d.name.en === result.drugB);
                const drugA_display = drugA_full ? drugA_full.name.th : result.drugA;
                const drugB_display = drugB_full ? drugB_full.name.th : result.drugB;

                return (
                    <div key={index} className={`p-4 border-l-4 rounded-r-md ${getSeverityClass(result.severity)}`}>
                      <p className="font-bold text-lg">{drugA_display} ({result.drugA}) + {drugB_display} ({result.drugB})</p>
                      <p><strong className="font-semibold">ระดับความรุนแรง (Severity):</strong> {result.severity}</p>
                      <div className="mt-2 pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                        <div>
                            <p><strong className="font-semibold">ปฏิกิริยา:</strong> {result.interaction.th}</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark"><strong className="font-semibold">Interaction:</strong> {result.interaction.en}</p>
                        </div>
                        <div>
                            <p><strong className="font-semibold">คำแนะนำ:</strong> {result.recommendation.th}</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark"><strong className="font-semibold">Recommendation:</strong> {result.recommendation.en}</p>
                        </div>
                      </div>
                    </div>
                );
              })}
            </div>
          ) : (
             <p className="text-text-secondary-light dark:text-text-secondary-dark">ไม่พบปฏิกิริยาระหว่างยาที่เลือก</p>
          )}
           <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6"><ExclamationIcon className="h-4 w-4 inline-block mr-1"/>ข้อมูลนี้ใช้เพื่อเป็นข้อมูลเบื้องต้นเท่านั้น โปรดปรึกษาแพทย์</p>
        </div>
      )}

      {/* Add New Drug to Database */}
      <div className="p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md space-y-4">
          <h3 className="text-xl font-semibold flex items-center"><DatabaseIcon className="h-6 w-6 mr-2 text-primary"/>เพิ่มยาใหม่เข้าสู่ฐานข้อมูล</h3>
          <form onSubmit={handleAddNewDbDrug} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="ชื่อยา (ภาษาไทย)" value={newDbDrug.nameTh} onChange={e => setNewDbDrug({...newDbDrug, nameTh: e.target.value})} className="p-2 border border-border-light dark:border-border-dark rounded-md bg-transparent focus:ring-2 focus:ring-primary"/>
              <input type="text" placeholder="ชื่อยา (ภาษาอังกฤษ)" value={newDbDrug.nameEn} onChange={e => setNewDbDrug({...newDbDrug, nameEn: e.target.value})} className="p-2 border border-border-light dark:border-border-dark rounded-md bg-transparent focus:ring-2 focus:ring-primary"/>
              <select value={newDbDrug.type} onChange={e => setNewDbDrug({...newDbDrug, type: e.target.value})} className="p-2 border border-border-light dark:border-border-dark rounded-md bg-transparent focus:ring-2 focus:ring-primary">
                  <option>ยาทั่วไป</option>
                  <option>ยาตามใบสั่งแพทย์</option>
                  <option>สมุนไพร</option>
              </select>
              <input type="number" placeholder="ราคา (บาท)" value={newDbDrug.price} onChange={e => setNewDbDrug({...newDbDrug, price: e.target.value})} className="p-2 border border-border-light dark:border-border-dark rounded-md bg-transparent focus:ring-2 focus:ring-primary"/>
              <textarea placeholder="คำอธิบายยา" value={newDbDrug.description} onChange={e => setNewDbDrug({...newDbDrug, description: e.target.value})} className="md:col-span-2 p-2 border border-border-light dark:border-border-dark rounded-md bg-transparent focus:ring-2 focus:ring-primary"></textarea>
              <button type="submit" className="md:col-span-2 px-4 py-3 bg-secondary text-white rounded-md hover:bg-secondary-light transition-colors font-semibold flex items-center justify-center">
                  <PlusIcon className="h-5 w-5 mr-2" /> เพิ่มยาเข้าฐานข้อมูล
              </button>
          </form>
      </div>
    </div>
  );
};