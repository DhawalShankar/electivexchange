// src/pages/ProfileSetupPage.jsx
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportButton from '../components/ReportButton';
import ElectiveInput from '../components/ElectiveInput';
import { databaseService } from '../services/databaseService';
import { authService } from '../services/authService';

const ProfileSetupPage = ({ user, onProfileCreated }) => {
  const [profile, setProfile] = useState({
    name: user.displayName || '',
    enrollment: '',
    phone: '',
    email: user.email || '',
    semester: '4th',
    branch: 'CSE',
    currentElective: '',
    wantedElectives: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const canSubmit = () => {
  const emailValid = /\S+@\S+\.\S+/.test(profile.email);   // basic email check
  const phoneValid = profile.phone.length === 10;          // exactly 10 digits

  return (
    profile.name &&
    profile.enrollment &&
    phoneValid &&
    emailValid &&
    profile.currentElective &&
    profile.wantedElectives.length > 0
  );
};


  const handleSubmit = async () => {
    if (!canSubmit()) return;
    
    setLoading(true);
    setError('');

    const result = await databaseService.saveProfile(user.uid, profile);
    
    if (result.success) {
      onProfileCreated(profile);
    } else {
      setError(result.error || 'Failed to save profile. Please try again.');
    }
    
    setLoading(false);
  };

  const handleSignOut = async () => {
    await authService.signOut();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <Header 
        user={user} 
        onSignOut={handleSignOut}
        subtitle="Set Up Your Profile" 
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Set Up Your Profile</h2>
            <p className="text-gray-600">Enter your details to find the perfect elective exchange</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Enrollment Number *</label>
                <input
                  type="text"
                  value={profile.enrollment}
                  onChange={(e) => setProfile({...profile, enrollment: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                  placeholder="23102012"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
               <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (/^\d{0,10}$/.test(v)) {
                        setProfile({ ...profile, phone: v });
                      }
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                    placeholder="9876543210"
                  />

              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                  placeholder="your.email@mail.jiit.ac.in"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Semester</label>
                <select
                  value={profile.semester}
                  onChange={(e) => setProfile({...profile, semester: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                >
                  <option>3rd</option>
                  <option>4th</option>
                  <option>5th</option>
                  <option>6th</option>
                  <option>7th</option>
                  <option>8th</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
               <select
                  value={profile.branch}
                  onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                >
                  <option>CSE</option>
                  <option>IT</option>
                  <option>ECE</option>
                  <option>BioTech</option>
                  <option>Other</option>
                </select>

              </div>
            </div>

            {/* Current Elective */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
              <label className="text-sm font-bold text-gray-900 mb-3 flex  items-center space-x-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                <span>Current Elective (What You Have) *</span>
              </label>
              <input
                type="text"
                value={profile.currentElective}
                onChange={(e) => setProfile({...profile, currentElective: e.target.value})}
                className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:outline-none transition-all bg-white"
                placeholder="e.g., Machine Learning"
              />
            </div>

            {/* Wanted Electives */}
            <ElectiveInput
              wantedElectives={profile.wantedElectives}
              onChange={(electives) => setProfile({...profile, wantedElectives: electives})}
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit() || loading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                canSubmit() && !loading
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl hover:scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? 'Creating Profile...' : 'Find My Matches'}
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
      <ReportButton />
    </div>
  );
};

export default ProfileSetupPage;