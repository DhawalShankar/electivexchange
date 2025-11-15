// src/services/authService.js
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export const authService = {
  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      console.error("Login Error:", error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error("Sign out Error:", error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback) => {
    return auth.onAuthStateChanged(callback);
  }
};