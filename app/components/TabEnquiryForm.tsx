'use client';

import { useState } from 'react';
import { useScrollLock } from '../hooks/useScrollLock';
import { markEnquirySubmitted } from '../hooks/useScrollTrigger';
import { X } from 'lucide-react';

interface TabEnquiryFormProps {
  collegeName: string;
  tabName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function TabEnquiryForm({ collegeName, tabName, isOpen, onClose }: TabEnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useScrollLock(isOpen);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const cleanPhone = formData.phone.replace(/[\\s\\-\\(\\)\\+]/g, '');
      if (!/^[0-9]{10}$/.test(cleanPhone)) {
        newErrors.phone = 'Phone number must be exactly 10 digits';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sourcePage: `${collegeName} - ${tabName} Tab`,
          hiddenFields: {
            collegeName,
            tabName,
            interestedField: 'College Information'
          }
        })
      });

      if (response.ok) {
        alert('Thank you! We will contact you soon.');
        markEnquirySubmitted();
        setFormData({ name: '', phone: '', email: '' });
        setErrors({});
        onClose();
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full px-3">
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="bg-white rounded-t-xl mb-4 pt-5">
            <div className="flex justify-between items-start">
              <div className='w-[80%]'>
                <h3 className="text-lg font-semibold">Get {tabName} Details</h3>
                <p className="text-gray-500 text-xs mt-2">For {collegeName}</p>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-700 rounded-full text-right justify-end transition"
              >
                <X size={20} />
              </button>
            </div>

          </div>

          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label> */}
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-sm  ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label> */}
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9\\s\\-\\(\\)\\+]/g, '');
                handleInputChange('phone', value);
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-sm  ${errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter Phone number"
              maxLength={15}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label> */}
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value.toLowerCase())}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none transition placeholder:text-sm  ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter Mail"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 mt-2 rounded-lg font-medium text-md hover:bg-blue-700 transition shadow-md transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : `Get Details`}
          </button>
        </form>
      </div>
    </div>
  );
}
