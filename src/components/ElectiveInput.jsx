// src/components/ElectiveInput.jsx
import React, { useState } from 'react';
import { Heart, Plus, Trash2, GripVertical } from 'lucide-react';

const ElectiveInput = ({ wantedElectives, onChange }) => {
  const [tempElective, setTempElective] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);

  const getPriorityColor = (priority) => {
    if (priority === 0) return 'from-yellow-400 to-orange-500';
    if (priority === 1) return 'from-blue-400 to-indigo-500';
    if (priority === 2) return 'from-purple-400 to-pink-500';
    return 'from-gray-400 to-gray-500';
  };

  const addElective = () => {
    if (tempElective.trim() && !wantedElectives.includes(tempElective.trim())) {
      onChange([...wantedElectives, tempElective.trim()]);
      setTempElective('');
    }
  };

  const removeElective = (index) => {
    onChange(wantedElectives.filter((_, i) => i !== index));
  };

  const moveElective = (fromIndex, toIndex) => {
    const newElectives = [...wantedElectives];
    const [movedItem] = newElectives.splice(fromIndex, 1);
    newElectives.splice(toIndex, 0, movedItem);
    onChange(newElectives);
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

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
      <label className="flex text-sm font-bold text-gray-900 mb-3 items-center space-x-2">
        <Heart className="w-5 h-5 text-purple-600" />
        <span>Wanted Electives (In Priority Order) *</span>
      </label>
      <p className="text-xs text-gray-600 mb-4">Add electives in order of preference. Drag to reorder.</p>
      
      {/* Input Section */}
      <div className="flex flex-wrap space-x-2 mb-4">
        <input
          type="text"
          value={tempElective}
          onChange={(e) => setTempElective(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addElective()}
          className="flex-1 px-4 py-3 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all bg-white"
          placeholder="e.g., Cloud Computing"
        />
        <button
          onClick={addElective}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add</span>
        </button>
      </div>

      {/* Electives List */}
      {wantedElectives.length > 0 && (
        <div className="space-y-2">
          {wantedElectives.map((elective, index) => (
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
                onClick={() => removeElective(index)}
                className="p-2 hover:bg-red-100 rounded-lg transition-all group"
              >
                <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectiveInput;