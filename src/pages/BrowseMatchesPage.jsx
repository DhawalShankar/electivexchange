// src/pages/BrowseMatchesPage.jsx
import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Heart, Settings } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportButton from '../components/ReportButton';
import StudentCard from '../components/StudentCard';
import { databaseService } from '../services/databaseService';
import { matchingService } from '../services/matchingService';
import { authService } from '../services/authService';

const BrowseMatchesPage = ({ user, userProfile, onEditProfile }) => {
  const [allStudents, setAllStudents] = useState([]);
  const [contacted, setContacted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    const result = await databaseService.getAllStudents(user.uid);
    if (result.success) {
      setAllStudents(result.data);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await authService.signOut();
    window.location.reload();
  };

  const handleContact = (studentUid) => {
    setContacted([...contacted, studentUid]);
  };

  const matchedStudents = matchingService.findMatches(userProfile, allStudents);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <Header 
        user={user} 
        onSignOut={handleSignOut}
        onSettings={onEditProfile}
        subtitle={`Perfect Matches for ${userProfile.name}`} 
      />

      {/* Profile Summary */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Your Listing</h3>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Has: <span className="font-semibold">{userProfile.currentElective}</span></span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Wants: <span className="font-semibold">{userProfile.wantedElectives.join(', ')}</span></span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white text-center">
                <div className="text-3xl font-bold">{matchedStudents.length}</div>
                <div className="text-xs opacity-80">Perfect Matches</div>
              </div>
              <button
                onClick={onEditProfile}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-semibold text-white transition-all flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-white py-20">
            <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg">Loading matches...</p>
          </div>
        ) : matchedStudents.length === 0 ? (
          <div className="text-center text-white py-20">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">No Perfect Matches Yet</h2>
            <p className="opacity-80 mb-4">No one currently has the electives you want and wants what you have.</p>
            <button
              onClick={onEditProfile}
              className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              Update Preferences
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-white font-bold text-xl mb-4">
              Perfect Matches (Sorted by Your Priority)
            </h2>
            {matchedStudents.map((student) => (
              <StudentCard
                key={student.uid}
                student={student}
                userProfile={userProfile}
                isContacted={contacted.includes(student.uid)}
                onContact={handleContact}
              />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
      <ReportButton />
    </div>
  );
};

export default BrowseMatchesPage;