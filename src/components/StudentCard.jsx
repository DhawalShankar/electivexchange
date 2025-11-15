// src/components/StudentCard.jsx - MOBILE RESPONSIVE
import React from 'react';
import { User, BookOpen, Heart, Phone, Mail, MessageCircle } from 'lucide-react';
import { matchingService } from '../services/matchingService';

const StudentCard = ({ student, userProfile, isContacted, onContact }) => {
  const priorityIndex = matchingService.getPriorityIndex(userProfile, student.currentElective);
  const priorityColor = matchingService.getPriorityColor(priorityIndex);

  const handleWhatsApp = () => {
    const phone = student.phone.replace(/\D/g, '');
    const whatsappURL = `https://wa.me/${phone}`;
    window.open(whatsappURL, '_blank');
    onContact(student.uid);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="flex flex-col md:flex-row">
        
        {/* Priority Badge Section */}
        <div className={`bg-gradient-to-br ${priorityColor} p-4 sm:p-6 flex flex-row md:flex-col items-center justify-between md:justify-center md:w-48`}>
          <div className="flex items-center space-x-3 md:space-x-0 md:flex-col">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-0 md:mb-3 flex-shrink-0">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
            </div>
            <div className="md:hidden">
              <h2 className="text-xl font-bold text-white">{student.name}</h2>
              <p className="text-xs text-white/90">{student.enrollment}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end md:items-center space-y-2">
            <div className="bg-white/90 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <div className="text-xs text-gray-600 font-medium">Your Priority</div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 text-center">#{priorityIndex + 1}</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-gray-800">Perfect Match!</span>
            </div>
          </div>
        </div>

        {/* Student Details Section */}
        <div className="flex-1 p-4 sm:p-6">
          {/* Name and Basic Info - Hidden on mobile (shown in badge) */}
          <div className="mb-4 hidden md:block">
            <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{student.enrollment}</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-gray-600">
              <span className="font-medium">{student.semester} Sem</span>
              <span>•</span>
              <span className="font-medium">{student.branch}</span>
            </div>
          </div>

          {/* Mobile: Show semester/branch */}
          <div className="mb-3 md:hidden flex items-center gap-2 text-xs text-gray-600">
            <span className="font-medium">{student.semester} Sem</span>
            <span>•</span>
            <span className="font-medium">{student.branch}</span>
          </div>

          {/* Electives Grid - Stack on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200">
              <div className="flex items-center space-x-2 mb-1">
                <BookOpen className="w-4 h-4 text-green-600 flex-shrink-0" />
                <h3 className="font-bold text-gray-900 text-xs sm:text-sm">They Have</h3>
              </div>
              <p className="text-sm sm:text-base font-semibold text-green-700 break-words">
                {student.currentElective}
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-2 mb-1">
                <Heart className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <h3 className="font-bold text-gray-900 text-xs sm:text-sm">They Want</h3>
              </div>
              <p className="text-xs sm:text-sm font-medium text-purple-700 break-words">
                {student.wantedElectives.join(', ')}
              </p>
            </div>
          </div>

          {/* Contact Section - Stack on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 gap-3">
            <div className="space-y-1">
              <a 
                href={`tel:${student.phone}`}
                className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-all"
              >
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="font-medium break-all">{student.phone}</span>
              </a>
              {student.email && (
                <a
                  href={`mailto:${student.email}`}
                  className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-all"
                >
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="font-medium break-all">{student.email}</span>
                </a>
              )}
            </div>

            <button
              onClick={handleWhatsApp}
              disabled={isContacted}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg min-h-[48px] ${
                isContacted
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white'
              }`}
            >
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              <span>{isContacted ? 'Contacted' : 'Message on WhatsApp'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;