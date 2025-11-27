import React, { useState, useEffect } from 'react';
import { validateUISchema, validateUIName } from '../utils/validator';
import { UIRenderer } from '../lib/UIRenderer';
import type { UISchema } from '../types/schema';

interface FormBuilderProps {
  onSubmit: (uiName: string, schema: UISchema) => Promise<void>;
}

const EXAMPLE_SCHEMA = `[
  {
    "type": "div",
    "header": "User Details",
    "children": [
      { "type": "input", "name": "firstName", "placeholder": "Enter first name" },
      { "type": "input", "name": "lastName", "placeholder": "Enter last name" },
      {
        "type": "div",
        "header": "Address Details",
        "children": [
          { "type": "input", "name": "line1", "placeholder": "Address Line 1" },
          { "type": "input", "name": "line2", "placeholder": "Address Line 2" },
          { "type": "input", "name": "city", "placeholder": "City" },
          { "type": "input", "name": "state", "placeholder": "State" }
        ]
      },
      { "type": "button", "label": "Submit" }
    ]
  }
]`;

export const FormBuilder: React.FC<FormBuilderProps> = ({ onSubmit }) => {
  const [uiName, setUiName] = useState('');
  const [jsonInput, setJsonInput] = useState(EXAMPLE_SCHEMA);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [parsedSchema, setParsedSchema] = useState<UISchema | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const parsed = JSON.parse(jsonInput);
        const validation = validateUISchema(parsed);
        
        if (validation.valid && validation.data) {
          setValidationError(null);
          setParsedSchema(validation.data);
        } else {
          setValidationError(validation.error || 'Invalid schema');
          setParsedSchema(null);
        }
      } catch (error) {
        setValidationError('Invalid JSON syntax');
        setParsedSchema(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [jsonInput]);

  useEffect(() => {
    if (uiName) {
      const validation = validateUIName(uiName);
      setNameError(validation.valid ? null : validation.error || null);
    } else {
      setNameError(null);
    }
  }, [uiName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameValidation = validateUIName(uiName);
    if (!nameValidation.valid) {
      setNameError(nameValidation.error || 'Invalid UI name');
      return;
    }

    if (!parsedSchema) {
      setValidationError('Please enter a valid JSON schema');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(uiName, parsedSchema);
      setUiName('');
      setJsonInput(EXAMPLE_SCHEMA);
    } catch (error: any) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormatJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
    } catch (error) {
    }
  };


  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* UI Name Input */}
        <div>
          <label htmlFor="uiName" className="block text-sm font-medium text-gray-700 mb-2">
            UI Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="uiName"
            value={uiName}
            onChange={(e) => setUiName(e.target.value)}
            placeholder="e.g., user-registration-form"
            className={`input-field ${nameError ? 'border-red-500' : ''}`}
            required
          />
          {nameError && (
            <p className="mt-1 text-sm text-red-600">{nameError}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Only alphanumeric characters, hyphens, and underscores allowed
          </p>
        </div>

        {/* JSON Schema Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="jsonInput" className="block text-sm font-medium text-gray-700">
              JSON Schema <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleFormatJSON}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Format JSON
              </button>
            </div>
          </div>
          <textarea
            id="jsonInput"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON schema here..."
            className={`input-field font-mono text-sm h-64 resize-y ${
              validationError ? 'border-red-500' : ''
            }`}
            required
          />
          {validationError && (
            <p className="mt-1 text-sm text-red-600">{validationError}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !!validationError || !!nameError || !uiName}
          className="btn-primary w-full"
        >
          {isSubmitting ? 'Saving...' : 'Save UI Schema'}
        </button>
      </form>

      {/* Live Preview */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>
        </div>
        {showPreview && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            {parsedSchema ? (
              <UIRenderer schema={parsedSchema} />
            ) : (
              <div className="text-center text-gray-500 py-8">
                {validationError ? (
                  <p className="text-red-600"> {validationError}</p>
                ) : (
                  <p>Enter a valid JSON schema to see the preview</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

