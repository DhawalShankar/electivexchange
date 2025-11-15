// src/components/Header.jsx - MOBILE RESPONSIVE
import React, { useState } from 'react';
import { Zap, LogOut, Settings, Menu, X } from 'lucide-react';

const Header = ({ user, subtitle, onSignOut, onSettings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight truncate">
                  ElectiveXChange
                </h1>
                <p className="text-xs text-white/80 truncate">
                  {subtitle || 'JIIT'}
                </p>
              </div>
            </div>
            
            {/* Desktop User Menu */}
            {user && (
              <>
                {/* Desktop view */}
                <div className="hidden md:flex items-center space-x-4">
                  <div className="text-white text-right">
                    <div className="text-sm font-semibold truncate max-w-[200px]">
                      {user.displayName}
                    </div>
                    <div className="text-xs opacity-80 truncate max-w-[200px]">
                      {user.email}
                    </div>
                  </div>
                  
                  {onSettings && (
                    <button
                      onClick={onSettings}
                      className="p-2 hover:bg-white/10 rounded-full transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                      title="Settings"
                    >
                      <Settings className="w-5 h-5 text-white" />
                    </button>
                  )}
                  
                  {onSignOut && (
                    <button
                      onClick={onSignOut}
                      className="p-2 hover:bg-white/10 rounded-full transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                      title="Sign Out"
                    >
                      <LogOut className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>

                {/* Mobile hamburger menu */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 text-white" />
                  ) : (
                    <Menu className="w-6 h-6 text-white" />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {user && mobileMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-[64px] z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
            {/* User info */}
            <div className="text-white pb-3 border-b border-white/20">
              <div className="text-sm font-semibold">{user.displayName}</div>
              <div className="text-xs opacity-80 break-all">{user.email}</div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              {onSettings && (
                <button
                  onClick={() => {
                    onSettings();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white font-semibold"
                >
                  <Settings className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              )}
              
              {onSignOut && (
                <button
                  onClick={() => {
                    onSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white font-semibold"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;