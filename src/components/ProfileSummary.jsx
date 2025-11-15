// src/components/ProfileSummary.jsx - NEW COMPONENT (Mobile Responsive)
import React from 'react';
import { BookOpen, Heart, Settings } from 'lucide-react';

const ProfileSummary = ({ userProfile, matchCount, onEdit }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-base sm:text-lg">Your Listing</h3>
          <button
            onClick={onEdit}
            className="px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-semibold text-white transition-all flex items-center space-x-2 text-sm min-h-[44px]"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>

        {/* Profile Info - Stack on mobile */}
        <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          {/* What you have/want */}
          <div className="space-y-2 flex-1">
            <div className="flex items-start space-x-2 text-white/90 text-xs sm:text-sm">
              <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-white/70">Has: </span>
                <span className="font-semibold break-words">{userProfile.currentElective}</span>
              </div>
            </div>
            
            <div className="flex items-start space-x-2 text-white/90 text-xs sm:text-sm">
              <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-white/70">Wants: </span>
                <span className="font-semibold break-words">{userProfile.wantedElectives.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Match count */}
          <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-center sm:ml-6 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/20 sm:pl-6">
            <span className="text-white/80 text-xs sm:text-center sm:mb-1">Perfect Matches</span>
            <div className="text-3xl sm:text-4xl font-bold text-white">{matchCount}</div>
          </div>
        </div>

        {/* User details - Mobile only */}
        <div className="sm:hidden pt-3 border-t border-white/20 flex flex-wrap gap-2 text-xs text-white/80">
          <span className="bg-white/10 px-2 py-1 rounded-full">{userProfile.semester} Sem</span>
          <span className="bg-white/10 px-2 py-1 rounded-full">{userProfile.branch}</span>
          <span className="bg-white/10 px-2 py-1 rounded-full">{userProfile.enrollment}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;