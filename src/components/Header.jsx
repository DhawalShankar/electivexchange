// src/components/Header.jsx
import React from 'react';
import { Zap, LogOut, Settings } from 'lucide-react';

const Header = ({ user, subtitle, onSignOut, onSettings }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">ElectiveXChange</h1>
              <p className="text-xs text-white/80">{subtitle || 'Jaypee Institute of Information Technology'}</p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-white text-right hidden md:block">
                <div className="text-sm font-semibold">{user.displayName}</div>
                <div className="text-xs opacity-80">{user.email}</div>
              </div>
              
              {onSettings && (
                <button
                  onClick={onSettings}
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                  title="Settings"
                >
                  <Settings className="w-5 h-5 text-white" />
                </button>
              )}
              
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;