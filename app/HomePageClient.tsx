'use client';
import { useState, useEffect } from 'react';
import EnquiryFormModal from './components/EnquiryFormModal';
import { useScrollTrigger } from './hooks/useScrollTrigger';

export default function HomePageClient({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isTriggered, hasSubmitted } = useScrollTrigger(0.7);

  useEffect(() => {
    if (isTriggered && !hasSubmitted) {
      setIsModalOpen(true);
    }
  }, [isTriggered, hasSubmitted]);
  

  useEffect(() => {
    const handleButtonClick = () => setIsModalOpen(true);
    const button = document.querySelector('[data-application-button]');
    button?.addEventListener('click', handleButtonClick);
    return () => button?.removeEventListener('click', handleButtonClick);
  }, []);

  return (
    <>
      {children}
      <EnquiryFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        sourcePage="Home Page - Start Application"
      />
    </>
  );
}

