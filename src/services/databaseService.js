// src/services/databaseService.js
import { collection, doc, setDoc, getDoc, getDocs, serverTimestamp, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const databaseService = {
  // Save or update user profile
  saveProfile: async (uid, profileData) => {
    try {
      await setDoc(doc(db, "students", uid), {
        ...profileData,
        uid,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      return { success: true };
    } catch (error) {
      console.error("Error saving profile:", error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get user profile by UID
  getProfile: async (uid) => {
    try {
      const docRef = doc(db, "students", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          success: true,
          data: docSnap.data()
        };
      } else {
        return {
          success: true,
          data: null
        };
      }
    } catch (error) {
      console.error("Error getting profile:", error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get all students except current user
  getAllStudents: async (excludeUid = null) => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const students = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(student => !excludeUid || student.uid !== excludeUid);
      
      return {
        success: true,
        data: students
      };
    } catch (error) {
      console.error("Error getting students:", error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  },

  // Check if user profile exists
  profileExists: async (uid) => {
    try {
      const docRef = doc(db, "students", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error("Error checking profile:", error);
      return false;
    }
  }
};