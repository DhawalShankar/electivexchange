// src/components/StudentCard.jsx
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
      <div className="flex flex-col md:flex-row">
        {/* Priority Badge Section */}
        <div className={`bg-gradient-to-br ${priorityColor} p-6 flex flex-col items-center justify-center md:w-48`}>
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-3">
            <User className="w-10 h-10 text-purple-600" />
          </div>
          <div className="bg-white/90 px-4 py-2 rounded-full mb-2">
            <div className="text-xs text-gray-600 font-medium">Your Priority</div>
            <div className="text-2xl font-bold text-gray-900 text-center">#{priorityIndex + 1}</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-gray-800">Perfect Match!</span>
          </div>
        </div>

        {/* Student Details Section */}
        <div className="flex-1 p-6">
          {/* Name and Basic Info */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{student.enrollment}</p>
            <div className="flex items-center space-x-3 mt-2 text-sm text-gray-600">
              <span className="font-medium">{student.semester} Sem</span>
              <span>•</span>
              <span className="font-medium">{student.branch}</span>
            </div>
          </div>

          {/* Electives Grid */}
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200">
              <div className="flex items-center space-x-2 mb-1">
                <BookOpen className="w-4 h-4 text-green-600" />
                <h3 className="font-bold text-gray-900 text-sm">They Have</h3>
              </div>
              <p className="text-base font-semibold text-green-700">{student.currentElective}</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-2 mb-1">
                <Heart className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-gray-900 text-sm">They Want</h3>
              </div>
              <p className="text-sm font-medium text-purple-700">{student.wantedElectives.join(', ')}</p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{student.phone}</span>
              </div>
              {student.email && (
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{student.email}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleWhatsApp}
              disabled={isContacted}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 shadow-lg ${
                isContacted
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isContacted ? 'Contacted' : 'Message'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;