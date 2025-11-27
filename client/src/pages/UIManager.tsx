import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { uiApi } from '../services/api';
import { UIList } from '../components/UIList';
import { Loader } from '../components/common/Loader';

export const UIManager: React.FC = () => {
  const [uis, setUis] = useState<Array<{ name: string; createdAt?: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingUI, setDeletingUI] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUIs = async () => {
    try {
      setLoading(true);
      const response = await uiApi.listUIs();
      setUis(response.uis);
      setError(null);
    } catch (err) {
      console.error('Error fetching UIs:', err);
      setError('Failed to load UIs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUIs();
  }, []);

  const handleDelete = async (name: string) => {
    setDeletingUI(name);
    try {
      await uiApi.deleteUI(name);
      toast.success(`UI "${name}" deleted successfully`);
      await fetchUIs();
    } catch (err) {
      console.error('Error deleting UI:', err);
      toast.error('Failed to delete UI. Please try again.');
    } finally {
      setDeletingUI(null);
    }
  };

  const filteredUIs = uis.filter((ui) =>
    ui.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manage UIs
            </h1>
            <p className="text-gray-600">
              View, browse, and manage your dynamic UIs
            </p>
          </div>

        </div>

        {/* Search Bar i have added as an optimisation */}
        {uis.length > 0 && (
          <div className="mt-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search UIs by name..."
              className="input-field max-w-md"
            />
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
          <button onClick={fetchUIs} className="text-red-600 hover:text-red-700 text-sm mt-2">
            Try Again
          </button>
        </div>
      )}

      {!error && uis.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total UIs</p>
              <p className="text-2xl font-bold text-gray-900">{uis.length}</p>
            </div>
            {searchTerm && (
              <div>
                <p className="text-sm text-gray-600">Search Results</p>
                <p className="text-2xl font-bold text-gray-900">{filteredUIs.length}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <UIList uis={filteredUIs} onDelete={handleDelete} isDeleting={deletingUI} />
    </div>
  );
};

