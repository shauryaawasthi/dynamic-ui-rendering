import React, { useState } from 'react';
import type { UIElement, DivElement, InputElement, ButtonElement } from '../types/schema';

interface UIRendererProps {
  schema: UIElement[];
  className?: string;
}

export const UIRenderer: React.FC<UIRendererProps> = ({ schema, className = '' }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = () => {
    console.log('Form submitted with data:', formData);
    alert('Form submitted! Check console for data.');
  };

  const renderElement = (element: UIElement, index: number): React.ReactNode => {
    switch (element.type) {
      case 'div':
        return renderDiv(element as DivElement, index);
      case 'input':
        return renderInput(element as InputElement, index);
      case 'button':
        return renderButton(element as ButtonElement, index);
      default:
        console.warn('Unknown element type:', (element as any).type);
        return null;
    }
  };

  const renderDiv = (element: DivElement, index: number): React.ReactNode => {
    return (
      <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
        {element.header && (
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            {element.header}
          </h3>
        )}
        <div className="space-y-4">
          {element.children?.map((child, childIndex) => renderElement(child, childIndex))}
        </div>
      </div>
    );
  };

  const renderInput = (element: InputElement, index: number): React.ReactNode => {
    return (
      <div key={index} className="flex flex-col">
        <label htmlFor={element.name} className="text-sm font-medium text-gray-700 mb-1 capitalize">
          {element.name.replace(/([A-Z])/g, ' $1').trim()}
        </label>
        <input
          type="text"
          id={element.name}
          name={element.name}
          placeholder={element.placeholder || `Enter ${element.name}`}
          value={formData[element.name] || ''}
          onChange={(e) => handleInputChange(element.name, e.target.value)}
          className="input-field"
        />
      </div>
    );
  };

  const renderButton = (element: ButtonElement, index: number): React.ReactNode => {
    return (
      <button
        key={index}
        type="button"
        onClick={handleButtonClick}
        className="btn-primary w-full sm:w-auto mt-4"
      >
        {element.label}
      </button>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {schema.map((element, index) => renderElement(element, index))}
    </div>
  );
};

