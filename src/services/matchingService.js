// src/services/matchingService.js

export const matchingService = {
  findMatches: (userProfile, allStudents) => {
    if (!userProfile.currentElective || userProfile.wantedElectives.length === 0) {
      return [];
    }

    const normalize = (s) => (s || "").toString().trim().toLowerCase();

    const userCampus = normalize(userProfile.campus);
    const userHas = normalize(userProfile.currentElective);
    const userWants = userProfile.wantedElectives.map(normalize);

    const matched = allStudents.filter(student => {
      const stuCampus = normalize(student.campus);
      const stuHas = normalize(student.currentElective);
      const stuWants = (student.wantedElectives || []).map(normalize);

      return (
        stuCampus === userCampus &&     // campus match
        userWants.includes(stuHas) &&   // user wants student's elective
        stuWants.includes(userHas)      // student wants user's elective
      );
    });

    return matched.sort((a, b) => {
      const aPriority = userWants.indexOf(normalize(a.currentElective));
      const bPriority = userWants.indexOf(normalize(b.currentElective));
      return aPriority - bPriority;
    });
  },

  getPriorityIndex: (userProfile, studentElective) => {
    const normalize = (s) => (s || "").toString().trim().toLowerCase();
    const wants = userProfile.wantedElectives.map(normalize);
    return wants.indexOf(normalize(studentElective));
  },

  getPriorityColor: (priority) => {
    if (priority === 0) return 'from-yellow-400 to-orange-500';
    if (priority === 1) return 'from-blue-400 to-indigo-500';
    if (priority === 2) return 'from-purple-400 to-pink-500';
    return 'from-gray-400 to-gray-500';
  }
};
