import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FormBuilder } from "../components/FormBuilder";
import { uiApi } from "../services/api";
import type { UISchema } from "../types/schema";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (uiName: string, schema: UISchema) => {
    try {
      await uiApi.saveUI(uiName, schema);
      toast.success(`UI "${uiName}" saved successfully!`);

      setTimeout(() => {
        navigate(`/dynamic-ui/${uiName}`);
      }, 1000);
    } catch (error: any) {
      console.error("Error saving UI:", error);
      const message =
        error.response?.data?.message || "Failed to save UI. Please try again.";
      toast.error(message);
      throw error;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Dynamic UI
        </h1>
        <p className="text-gray-600">
          Define your UI structure using JSON schema
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <FormBuilder onSubmit={handleSubmit} />
      </div>

      {/* Documentation Section */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📖 How to Use
        </h2>
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h3 className="font-semibold mb-1">Supported Element Types:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <code className="bg-white px-2 py-1 rounded">div</code> -
                Container with optional header and children
              </li>
              <li>
                <code className="bg-white px-2 py-1 rounded">input</code> - Text
                input field with name and placeholder
              </li>
              <li>
                <code className="bg-white px-2 py-1 rounded">button</code> -
                Button with label
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Example Structure:</h3>
            <pre className="bg-white p-3 rounded overflow-x-auto text-xs">
              {`{
  "type": "div",
  "header": "Section Title",
  "children": [
    { "type": "input", "name": "fieldName" },
    { "type": "button", "label": "Submit" }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
