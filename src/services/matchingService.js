// src/services/matchingService.js

export const matchingService = {
  // Find students who match the user's criteria
  findMatches: (userProfile, allStudents) => {
    if (!userProfile.currentElective || userProfile.wantedElectives.length === 0) {
      return [];
    }

    // Filter students who:
    // 1. Have what the user wants
    // 2. Want what the user has
    const matched = allStudents.filter(student => 
      userProfile.wantedElectives.includes(student.currentElective) &&
      student.wantedElectives.includes(userProfile.currentElective)
    );

    // Sort by user's priority (index in wantedElectives array)
    return matched.sort((a, b) => {
      const aPriority = userProfile.wantedElectives.indexOf(a.currentElective);
      const bPriority = userProfile.wantedElectives.indexOf(b.currentElective);
      return aPriority - bPriority;
    });
  },

  // Get priority index for a student's elective
  getPriorityIndex: (userProfile, studentElective) => {
    return userProfile.wantedElectives.indexOf(studentElective);
  },

  // Get color for priority badge
  getPriorityColor: (priority) => {
    if (priority === 0) return 'from-yellow-400 to-orange-500';
    if (priority === 1) return 'from-blue-400 to-indigo-500';
    if (priority === 2) return 'from-purple-400 to-pink-500';
    return 'from-gray-400 to-gray-500';
  }
};