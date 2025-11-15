// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import LoginPage from './pages/LoginPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import ProfileEditPage from './pages/ProfileEditPage';
import BrowseMatchesPage from './pages/BrowseMatchesPage';
import { authService } from './services/authService';
import { databaseService } from './services/databaseService';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('login'); // 'login', 'setup', 'browse', 'edit'

  // Check authentication state on mount
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        await checkUserProfile(user.uid);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setCurrentView('login');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Check if user has a profile
  const checkUserProfile = async (uid) => {
    setLoading(true);
    const result = await databaseService.getProfile(uid);
    
    if (result.success && result.data) {
      setUserProfile(result.data);
      setCurrentView('browse');
    } else {
      setUserProfile(null);
      setCurrentView('setup');
    }
    
    setLoading(false);
  };

  // Handle successful login
  const handleLoginSuccess = async (user) => {
    setCurrentUser(user);
    await checkUserProfile(user.uid);
  };

  // Handle profile creation
  const handleProfileCreated = (profile) => {
    setUserProfile(profile);
    setCurrentView('browse');
  };

  // Handle profile update
  const handleProfileUpdated = (profile) => {
    setUserProfile(profile);
    setCurrentView('browse');
  };

  // Handle edit profile
  const handleEditProfile = () => {
    setCurrentView('edit');
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setCurrentView('browse');
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // Render appropriate view
  return (
    <>
      <Analytics />
      {currentView === 'login' && (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
      
      {currentView === 'setup' && currentUser && (
        <ProfileSetupPage 
          user={currentUser} 
          onProfileCreated={handleProfileCreated} 
        />
      )}
      
      {currentView === 'browse' && currentUser && userProfile && (
        <BrowseMatchesPage 
          user={currentUser} 
          userProfile={userProfile} 
          onEditProfile={handleEditProfile} 
        />
      )}
      
      {currentView === 'edit' && currentUser && userProfile && (
        <ProfileEditPage 
          user={currentUser} 
          existingProfile={userProfile} 
          onProfileUpdated={handleProfileUpdated} 
          onCancel={handleCancelEdit} 
        />
      )}
    </>
  );
};

export default App;