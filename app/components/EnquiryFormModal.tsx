'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { markEnquirySubmitted } from '../hooks/useScrollTrigger';
import { useScrollLock } from '../hooks/useScrollLock';

interface EnquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourcePage?: string;
  hiddenFields?: Record<string, string>;
}

export default function EnquiryFormModal({ isOpen, onClose, sourcePage = 'General', hiddenFields = {} }: EnquiryFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    studyLevel: '',
    interestedField: '',
    cityState: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Lock scroll when modal is open
  useScrollLock(isOpen);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
      if (!/^[0-9]{10}$/.test(cleanPhone)) {
        newErrors.phone = 'Phone number must be exactly 10 digits';
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Study level validation
    if (!formData.studyLevel) {
      newErrors.studyLevel = 'Please select your study level';
    }

    // Interested field validation
    if (!formData.interestedField) {
      newErrors.interestedField = 'Please select your field of interest';
    }

    // City/State validation
    if (!formData.cityState.trim()) {
      newErrors.cityState = 'City/State is required';
    } else if (formData.cityState.trim().length < 2) {
      newErrors.cityState = 'Please enter a valid city/state';
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
        body: JSON.stringify({ ...formData, sourcePage, hiddenFields })
      });

      if (response.ok) {
        alert('Thank you! We will contact you soon.');
        markEnquirySubmitted(); // Mark as submitted to prevent future popups
        setFormData({ name: '', phone: '', email: '', studyLevel: '', interestedField: '', cityState: '' });
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

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-sm w-full max-h-[85vh] overflow-y-auto transition-all duration-300 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-blue-600 text-white px-4 py-4 rounded-t-2xl flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold">Get Expert Guidance</h2>
            <p className="text-blue-100 text-sm mt-1">Fill the form and we&apos;ll call you back</p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-blue-700 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Hidden Fields */}
          <input type="hidden" name="sourcePage" value={sourcePage} />
          {Object.entries(hiddenFields).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-sm ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => {
                // Allow only numbers and common phone formatting characters
                const value = e.target.value.replace(/[^0-9\s\-\(\)\+]/g, '');
                handleInputChange('phone', value);
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-sm ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter 10-digit mobile number"
              maxLength={15}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value.toLowerCase())}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-sm ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Study Level *</label>
            <select
              required
              value={formData.studyLevel}
              onChange={(e) => handleInputChange('studyLevel', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm ${
                errors.studyLevel ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              } ${formData.studyLevel === "" ? "text-gray-400" : "text-gray-900"}`}
            >
              <option value="" disabled>
                Select your study level
              </option>
              <option value="UG">Undergraduate (UG)</option>
              <option value="PG">Postgraduate (PG)</option>
              <option value="Diploma">Diploma</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.studyLevel && <p className="text-red-500 text-xs mt-1">{errors.studyLevel}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interested Field *</label>
            <select
              required
              value={formData.interestedField}
              onChange={(e) => handleInputChange('interestedField', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm ${
                errors.interestedField ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              } ${formData.interestedField === "" ? "text-gray-400" : "text-gray-900"}`}
            >
              <option value="" disabled>
                Select your field of interest
              </option>
              <option value="Engineering">Engineering</option>
              <option value="Management">Management</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
              <option value="Medical">Medical</option>
              <option value="Law">Law</option>
              <option value="Architecture">Architecture</option>
              <option value="Other">Other</option>
            </select>
            {errors.interestedField && <p className="text-red-500 text-xs mt-1">{errors.interestedField}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City/State *</label>
            <input
              type="text"
              required
              value={formData.cityState}
              onChange={(e) => handleInputChange('cityState', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-sm ${
                errors.cityState ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Chennai, Tamil Nadu"
            />
            {errors.cityState && <p className="text-red-500 text-xs mt-1">{errors.cityState}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 mt-2 rounded-lg font-medium text-md hover:bg-blue-700 transition shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
