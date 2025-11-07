
import React, { useState, useEffect, useCallback } from 'react';
import { Dashboard } from './components/Dashboard';
import { DrugManagement } from './components/DrugManagement';
import { Donations } from './components/Donations';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { PatientList } from './components/PatientList';
import { PatientDetail } from './components/PatientDetail';
import { Theme, View, Patient, QueueState, QueueTicket as QueueTicketType, Drug } from './types';
import { generateMockPatients, mockUser as initialMockUser, mockQueue, mockDrugs } from './data/mockData';

// Import new components
import { OpdOnlineHub } from './components/OpdOnlineHub';
import { AppointmentManager } from './components/AppointmentManager';
import { QueueTicketRequest } from './components/QueueTicketRequest';
import { QueueStatusChecker } from './components/QueueStatusChecker';
import { LabQueueRequest } from './components/LabQueueRequest';
import { InsuranceChecker } from './components/InsuranceChecker';
import { PaymentManager } from './components/PaymentManager';
import { CertificateManager } from './components/CertificateManager';


const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      return storedTheme || 'light';
    }
    return 'light';
  });

  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [viewHistory, setViewHistory] = useState<View[]>(['dashboard']);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Logged-in user simulation
  const [mockUser, setMockUser] = useState(initialMockUser);
  const [queueState, setQueueState] = useState<QueueState>(mockQueue);

  // Drug Database state
  const [drugDatabase, setDrugDatabase] = useState<Drug[]>(mockDrugs);
  const handleAddDrug = (newDrug: Omit<Drug, 'id'>) => {
    setDrugDatabase(prev => [...prev, { ...newDrug, id: Date.now() }]);
  };


  useEffect(() => {
    setPatients(generateMockPatients(50));
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);
  
  const handleNavigate = (view: View) => {
    if (view !== 'patient-info') {
      setSelectedPatient(null);
    }

    const newHistory = [...viewHistory, view];
    setViewHistory(newHistory);
    setCurrentView(view);
  }

  const handleBack = () => {
    // If viewing a patient detail, just go back to the list
    if (selectedPatient) {
      setSelectedPatient(null);
      return;
    }

    const newHistory = [...viewHistory];
    newHistory.pop();
    
    if (newHistory.length > 0) {
      setViewHistory(newHistory);
      setCurrentView(newHistory[newHistory.length - 1]);
    }
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  }

  const handleAddQueue = (ticket: QueueTicketType) => {
    setQueueState(prev => ({
        ...prev,
        tickets: [...prev.tickets, ticket],
    }));
    // Also add to the mock user's data for consistency
    setMockUser(prev => ({
        ...prev,
        queueTicket: ticket,
    }));
    handleNavigate('queue-ticket-request'); // Navigate to show the generated ticket
  };

  const renderView = () => {
    if (selectedPatient) {
      return <PatientDetail patient={selectedPatient} />;
    }
    
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'drug':
        return <DrugManagement dbDrugs={drugDatabase} onAddDrug={handleAddDrug} />;
      case 'donation':
        return <Donations />;
      case 'patient-info':
        return <PatientList patients={patients} onSelectPatient={handleSelectPatient} />;
      
      // OPD Hub and its children
      case 'opd-hub':
        return <OpdOnlineHub onNavigate={handleNavigate} />;
      case 'appointment-manager':
        return <AppointmentManager appointments={mockUser.appointments} />;
      case 'queue-request':
        return <QueueTicketRequest user={mockUser} onAddQueue={handleAddQueue} />;
      case 'queue-checker':
        return <QueueStatusChecker queueState={queueState} />;
      case 'lab-request':
        return <LabQueueRequest user={mockUser} onAddQueue={handleAddQueue} />;
      case 'insurance-checker':
        return <InsuranceChecker patient={mockUser} />;
      case 'payment-manager':
        return <PaymentManager payments={mockUser.payments} />;
      case 'certificate-manager':
        return <CertificateManager certificate={mockUser.medicalCertificate} patientName={mockUser.name} />;

      // Fallbacks for bottom nav items that are now part of functional modules
      case 'history':
      case 'news':
        return <div className="text-center p-8"><h2 className="text-2xl font-bold">Coming Soon</h2><p>This feature is under construction.</p></div>;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };
  
  const getHeaderInfo = () => {
    const showBack = viewHistory.length > 1 || !!selectedPatient;
    let backText = 'กลับ';
    const previousView = viewHistory[viewHistory.length - 2];

    if (selectedPatient) {
        backText = 'กลับไปที่รายการ';
    } else if (currentView.includes('-')) { // Sub-views
        if (previousView === 'opd-hub') backText = 'กลับไปที่ OPD Hub';
        else if (previousView === 'dashboard') backText = 'กลับไปที่หน้าหลัก';
    }
    
    return { showBack, backText };
  }

  const { showBack, backText } = getHeaderInfo();


  return (
    <div className={`flex flex-col h-screen bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark font-sans`}>
      <Header 
        user={mockUser} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        showBack={showBack}
        onBack={handleBack}
        backText={backText}
        isPatientDetail={!!selectedPatient}
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        {renderView()}
      </main>
      <BottomNav currentView={currentView} onNavigate={handleNavigate} />
    </div>
  );
};

export default App;