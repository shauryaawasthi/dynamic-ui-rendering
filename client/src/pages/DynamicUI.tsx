import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { uiApi } from '../services/api';
import { UIRenderer } from '../lib/UIRenderer';
import { Loader } from '../components/common/Loader';
import type { UISchema } from '../types/schema';

export const DynamicUI: React.FC = () => {
  const { uiName } = useParams<{ uiName: string }>();
  const [schema, setSchema] = useState<UISchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | undefined>();

  useEffect(() => {
    const fetchUI = async () => {
      if (!uiName) {
        setError('UI name is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await uiApi.getUI(uiName);
        setSchema(response.schema);
        setCreatedAt(response.createdAt);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching UI:', err);
        if (err.response?.status === 404) {
          setError(`UI "${uiName}" not found`);
        } else {
          setError('Failed to load UI. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUI();
  }, [uiName]);

  if (loading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex justify-center space-x-4">
            <Link to="/manage" className="btn-secondary">
              Browse UIs
            </Link>
            <Link to="/" className="btn-primary">
              Create New UI
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="mb-6 text-sm">
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          Home
        </Link>
        {' / '}
        <Link to="/manage" className="text-blue-600 hover:text-blue-700">
          Manage UIs
        </Link>
        {' / '}
        <span className="text-gray-600">{uiName}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900 break-words">
            {uiName}
          </h1>
        </div>
        {createdAt && (
          <p className="text-sm text-gray-500">
            Created: {new Date(createdAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Rendered UI */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {schema && <UIRenderer schema={schema} />}
      </div>

      <div className="mt-6 flex space-x-4">
        <Link to="/manage" className="btn-secondary">
          ← Back to All UIs
        </Link>
        <Link to="/" className="btn-primary">
          Create New UI
        </Link>
      </div>
    </div>
  );
};

