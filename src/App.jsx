import React, { useState } from 'react';
import { Heart, X, Settings, User, Clock, Users, BookOpen, Zap, ArrowUp, ArrowDown, MessageCircle, Phone, Mail, GripVertical, Plus, Trash2 } from 'lucide-react';

const ElectiveXChange = () => {
  const [step, setStep] = useState('profile'); // 'profile' or 'browse'
  const [userProfile, setUserProfile] = useState({
    name: '',
    enrollment: '',
    phone: '',
    email: '',
    semester: '6th',
    branch: 'CSE',
    currentElective: '',
    wantedElectives: []
  });

  const [tempElective, setTempElective] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);

  // All available students with their electives
  const allStudents = [
    {
      id: 1,
      name: "Rahul Sharma",
      enrollment: "21SCSE1234567",
      currentElective: "Machine Learning",
      wantedElectives: ["Blockchain Technology", "Cloud Computing", "Cyber Security"],
      semester: "6th",
      branch: "CSE",
      avatar: "RS",
      timePosted: "2 hours ago",
      phone: "+91 98765 43210",
      email: "rahul.sharma@jiit.ac.in"
    },
    {
      id: 2,
      name: "Priya Malhotra",
      enrollment: "21SCSE1234568",
      currentElective: "Cloud Computing",
      wantedElectives: ["Machine Learning", "Data Science"],
      semester: "6th",
      branch: "CSE",
      avatar: "PM",
      timePosted: "5 hours ago",
      phone: "+91 98765 43211",
      email: "priya.malhotra@jiit.ac.in"
    },
    {
      id: 3,
      name: "Arjun Verma",
      enrollment: "21SCSE1234569",
      currentElective: "Cyber Security",
      wantedElectives: ["Machine Learning", "Blockchain Technology"],
      semester: "6th",
      branch: "CSE",
      avatar: "AV",
      timePosted: "1 day ago",
      phone: "+91 98765 43212",
      email: "arjun.verma@jiit.ac.in"
    },
    {
      id: 4,
      name: "Sneha Kapoor",
      enrollment: "21SCSE1234570",
      currentElective: "Blockchain Technology",
      wantedElectives: ["Cloud Computing", "Data Science"],
      semester: "6th",
      branch: "CSE",
      avatar: "SK",
      timePosted: "3 hours ago",
      phone: "+91 98765 43213",
      email: "sneha.kapoor@jiit.ac.in"
    },
    {
      id: 5,
      name: "Vikram Singh",
      enrollment: "21SCSE1234571",
      currentElective: "Data Science",
      wantedElectives: ["Machine Learning", "Cyber Security"],
      semester: "6th",
      branch: "CSE",
      avatar: "VS",
      timePosted: "6 hours ago",
      phone: "+91 98765 43214",
      email: "vikram.singh@jiit.ac.in"
    },
    {
      id: 6,
      name: "Ananya Gupta",
      enrollment: "21SCSE1234572",
      currentElective: "IoT Systems",
      wantedElectives: ["Machine Learning", "Cloud Computing"],
      semester: "6th",
      branch: "CSE",
      avatar: "AG",
      timePosted: "4 hours ago",
      phone: "+91 98765 43215",
      email: "ananya.gupta@jiit.ac.in"
    },
    {
      id: 7,
      name: "Karan Mehta",
      enrollment: "21SCSE1234573",
      currentElective: "Blockchain Technology",
      wantedElectives: ["Data Science", "Machine Learning"],
      semester: "6th",
      branch: "CSE",
      avatar: "KM",
      timePosted: "7 hours ago",
      phone: "+91 98765 43216",
      email: "karan.mehta@jiit.ac.in"
    }
  ];

  const [contacted, setContacted] = useState([]);

  const addWantedElective = () => {
    if (tempElective.trim() && !userProfile.wantedElectives.includes(tempElective.trim())) {
      setUserProfile({
        ...userProfile,
        wantedElectives: [...userProfile.wantedElectives, tempElective.trim()]
      });
      setTempElective('');
    }
  };

  const removeWantedElective = (index) => {
    setUserProfile({
      ...userProfile,
      wantedElectives: userProfile.wantedElectives.filter((_, i) => i !== index)
    });
  };

  const moveElective = (fromIndex, toIndex) => {
    const newElectives = [...userProfile.wantedElectives];
    const [movedItem] = newElectives.splice(fromIndex, 1);
    newElectives.splice(toIndex, 0, movedItem);
    setUserProfile({
      ...userProfile,
      wantedElectives: newElectives
    });
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      moveElective(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const canSubmit = () => {
    return userProfile.name && userProfile.enrollment && userProfile.phone && 
           userProfile.currentElective && userProfile.wantedElectives.length > 0;
  };

  // Filter and sort students based on user's wanted electives priority
  const getMatchedStudents = () => {
    if (!userProfile.currentElective || userProfile.wantedElectives.length === 0) {
      return [];
    }

    const matched = allStudents.filter(student => 
      userProfile.wantedElectives.includes(student.currentElective) &&
      student.wantedElectives.includes(userProfile.currentElective)
    );

    return matched.sort((a, b) => {
      const aPriority = userProfile.wantedElectives.indexOf(a.currentElective);
      const bPriority = userProfile.wantedElectives.indexOf(b.currentElective);
      return aPriority - bPriority;
    });
  };

  const matchedStudents = getMatchedStudents();

  const getPriorityColor = (priority) => {
    if (priority === 0) return 'from-yellow-400 to-orange-500';
    if (priority === 1) return 'from-blue-400 to-indigo-500';
    if (priority === 2) return 'from-purple-400 to-pink-500';
    return 'from-gray-400 to-gray-500';
  };

  if (step === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">ElectiveXChange</h1>
                <p className="text-xs text-white/80">Jaypee Institute of Information Technology</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Set Up Your Profile</h2>
              <p className="text-gray-600">Enter your details to find the perfect elective exchange</p>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Enrollment Number *</label>
                  <input
                    type="text"
                    value={userProfile.enrollment}
                    onChange={(e) => setUserProfile({...userProfile, enrollment: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                    placeholder="21SCSE1234567"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                    placeholder="your.email@jiit.ac.in"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Semester</label>
                  <select
                    value={userProfile.semester}
                    onChange={(e) => setUserProfile({...userProfile, semester: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option>5th</option>
                    <option>6th</option>
                    <option>7th</option>
                    <option>8th</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
                  <select
                    value={userProfile.branch}
                    onChange={(e) => setUserProfile({...userProfile, branch: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option>CSE</option>
                    <option>IT</option>
                    <option>ECE</option>
                    <option>BioTech</option>
                  </select>
                </div>
              </div>

              {/* Current Elective */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  <span>Current Elective (What You Have) *</span>
                </label>
                <input
                  type="text"
                  value={userProfile.currentElective}
                  onChange={(e) => setUserProfile({...userProfile, currentElective: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:outline-none transition-all bg-white"
                  placeholder="e.g., Machine Learning"
                />
              </div>

              {/* Wanted Electives with Priority */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <span>Wanted Electives (In Priority Order) *</span>
                </label>
                <p className="text-xs text-gray-600 mb-4">Add electives in order of preference. Drag to reorder.</p>
                
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={tempElective}
                    onChange={(e) => setTempElective(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addWantedElective()}
                    className="flex-1 px-4 py-3 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all bg-white"
                    placeholder="e.g., Cloud Computing"
                  />
                  <button
                    onClick={addWantedElective}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add</span>
                  </button>
                </div>

                {userProfile.wantedElectives.length > 0 && (
                  <div className="space-y-2">
                    {userProfile.wantedElectives.map((elective, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`bg-white p-4 rounded-xl border-2 border-purple-200 flex items-center justify-between cursor-move hover:border-purple-400 transition-all ${
                          draggedIndex === index ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <GripVertical className="w-5 h-5 text-gray-400" />
                          <div className={`w-8 h-8 bg-gradient-to-br ${getPriorityColor(index)} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                            {index + 1}
                          </div>
                          <span className="font-semibold text-gray-900">{elective}</span>
                        </div>
                        <button
                          onClick={() => removeWantedElective(index)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-all group"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={() => canSubmit() && setStep('browse')}
                disabled={!canSubmit()}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  canSubmit()
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl hover:scale-[1.02]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Find My Matches
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">ElectiveXChange</h1>
                <p className="text-xs text-white/80">Perfect Matches for {userProfile.name}</p>
              </div>
            </div>
            <button
              onClick={() => setStep('profile')}
              className="p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Your Profile Summary */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Your Listing</h3>
              <div className="flex items-center space-x-4 text-white/90 text-sm">
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
            </div>
          </div>
        </div>

        {/* Matched Students */}
        {matchedStudents.length === 0 ? (
          <div className="text-center text-white py-20">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">No Perfect Matches Yet</h2>
            <p className="opacity-80 mb-4">No one currently has the electives you want and wants what you have.</p>
            <button
              onClick={() => setStep('profile')}
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
            {matchedStudents.map((student) => {
              const priorityIndex = userProfile.wantedElectives.indexOf(student.currentElective);
              const isContacted = contacted.includes(student.id);

              return (
                <div
                  key={student.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left: Avatar & Priority */}
                    <div className={`bg-gradient-to-br ${getPriorityColor(priorityIndex)} p-6 flex flex-col items-center justify-center md:w-48`}>
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-3">
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-pink-600">
                          {student.avatar}
                        </span>
                      </div>
                      <div className="bg-white/90 px-4 py-2 rounded-full mb-2">
                        <div className="text-xs text-gray-600 font-medium">Your Priority</div>
                        <div className="text-2xl font-bold text-gray-900 text-center">#{priorityIndex + 1}</div>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-bold text-gray-800">Perfect Match!</span>
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div className="flex-1 p-6">
                      <div className="mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                        <p className="text-sm text-gray-500 mt-1">{student.enrollment}</p>
                        <div className="flex items-center space-x-3 mt-2 text-sm text-gray-600">
                          <span className="font-medium">{student.semester} Sem</span>
                          <span>•</span>
                          <span className="font-medium">{student.branch}</span>
                          <span>•</span>
                          <span className="text-gray-500">{student.timePosted}</span>
                        </div>
                      </div>

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
                          onClick={() => setContacted([...contacted, student.id])}
                          disabled={isContacted}
                          className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 shadow-lg ${
                            isContacted
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
                          }`}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{isContacted ? 'Contacted' : 'Contact Now'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectiveXChange;