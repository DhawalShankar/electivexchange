import React, { useState } from 'react';
import { Heart, X, Settings, User, Clock, Users, BookOpen, Zap, ArrowUp, ArrowDown, MessageCircle, Phone, Mail, GripVertical, Plus, Trash2 } from 'lucide-react';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider,db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";  // make sure at top
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Analytics } from "@vercel/analytics/next"

const ElectiveXChange = () => {
  const [step, setStep] = useState('profile'); // 'profile' or 'browse'
  const [userProfile, setUserProfile] = useState({
    name: '',
    enrollment: '',
    phone: '',
    email: '',
    semester: '4th',
    branch: 'CSE',
    currentElective: '',
    wantedElectives: []
  });

  const [tempElective, setTempElective] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  useEffect(() => {
  if (step === "browse") {
    fetchStudents();
  }
}, [step]);

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    setUserProfile({
      ...userProfile,
      name: user.displayName,
      email: user.email,
    });
  } catch (error) {
    console.error("Login Error:", error);
  }
};

// Save user profile


const saveProfile = async () => {
  try {
    const user = auth.currentUser;  // get logged-in user
    if (!user) throw new Error("User not logged in");

    await setDoc(doc(db, "students", user.uid), {
      ...userProfile,
      email: user.email,         // optional: store email
      uid: user.uid,             // store uid for reference
      createdAt: serverTimestamp()
    });

    setStep("browse");
  } catch (e) {
    console.error("Error saving profile: ", e);
  }
};

// Fetch students
const fetchStudents = async () => {
  const querySnapshot = await getDocs(collection(db, "students"));
  const students = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log("Students in Firestore:", students); // check in console
  setAllStudents(students);
};


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
     
      <div>
       <Analytics />
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
                      placeholder="23102012"
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
                      placeholder="your.email@mail.jiit.ac.in"
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
                  <label className="text-sm font-bold text-gray-900 mb-3 flex items-center space-x-2">
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
                  <label className="flex text-sm font-bold text-gray-900 mb-3 items-center space-x-2">
                    <Heart className="w-5 h-5 text-purple-600" />
                    <span>Wanted Electives (In Priority Order) *</span>
                  </label>
                  <p className="text-xs text-gray-600 mb-4">Add electives in order of preference. Drag to reorder.</p>
                  
                  <div className="flex flex-wrap space-x-2 mb-4">
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
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all mb-4"
                >
                  Continue with Google
                </button>

                {/* Submit Button */}
                <button
                      onClick={async () => {
                        if (!canSubmit()) return;
                        await saveProfile(); // save to Firestore first
                        await fetchStudents(); // fetch all students after saving
                        setStep('browse');    // now go to browse
                      }}
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
           <footer className="text-center  text-white text-sm font-bold py-6
       bg-white/10 backdrop-blur-lg border-b border-white/20  ">
            Made with <span className="text-red-400">♥</span> by Dhawal
          </footer>

          {/* Floating Report Button */}
         <button
  onClick={() => window.location.href = "mailto:dhawalworksgreat@gmail.com?subject=ElectiveXChange%20Issue&body=Hi%20Dhawal,%0A%0AI%20want%20to%20report%20a%20problem%20with..."}
  className="fixed right-[-85px] top-1/2 -translate-y-1/2 -rotate-90
             px-8 py-3 text-lg font-semibold tracking-wide
             bg-gray-700 backdrop-blur-lg text-white
             border border-white/30 shadow-xl rounded-t-xl
             hover:bg-white/30 hover:text-white transition-all"
>
  Report a Problem
</button>

        </div>
       

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
   <Analytics />
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
                > <Analytics />
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
                              onClick={() => {
                                const phone = student.phone.replace(/\D/g, ''); // Remove non-digit characters
                                const whatsappURL = `https://wa.me/${phone}`;
                                window.open(whatsappURL, '_blank'); // Opens in new tab
                                setContacted([...contacted, student.id]);
                              }}
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
            })}
          </div>
        )}

      </div>
      
        {/* Footer */}
       <footer className="text-center  text-white text-sm font-bold py-6
       bg-white/10 backdrop-blur-lg border-b border-white/20 ">
            Made with <span className="text-red-400">♥</span> by Dhawal
          </footer>

          {/* Floating Report Button */}
         <button
  onClick={() => window.location.href = "mailto:dhawalworksgreat@gmail.com?subject=ElectiveXChange%20Issue&body=Hi%20Dhawal,%0A%0AI%20want%20to%20report%20a%20problem%20with..."}
  className="fixed right-[-85px] top-1/2 -translate-y-1/2 -rotate-90
             px-8 py-3 text-lg font-semibold tracking-wide
             bg-white/20 backdrop-blur-lg text-gray-100
             border border-white/30 shadow-xl rounded-t-xl
             hover:bg-white/30 hover:text-white transition-all rounded-2xl"
>
  Report a Problem
</button>

    </div>
    
  
  );
};

export default ElectiveXChange;