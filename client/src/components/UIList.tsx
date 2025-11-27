import React from 'react';
import { Link } from 'react-router-dom';

interface UIListProps {
  uis: Array<{
    name: string;
    createdAt?: string;
  }>;
  onDelete: (name: string) => void;
  isDeleting: string | null;
}

export const UIList: React.FC<UIListProps> = ({ uis, onDelete, isDeleting }) => {
  const handleDelete = (name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete(name);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'N/A';
    }
  };

  if (uis.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No UIs Found</h3>
        <p className="text-gray-500 mb-4">Create your first dynamic UI to get started</p>
        <Link to="/" className="btn-primary inline-block">
          Create UI
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {uis.map((ui) => (
        <div key={ui.name} className="card hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 break-words">
                {ui.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Created: {formatDate(ui.createdAt)}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Link
              to={`/dynamic-ui/${ui.name}`}
              className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              View
            </Link>
            <button
              onClick={() => handleDelete(ui.name)}
              disabled={isDeleting === ui.name}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isDeleting === ui.name ? '...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

