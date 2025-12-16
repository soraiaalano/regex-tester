'use client';

import { ChangeEvent } from 'react';

interface RegexInputProps {
  pattern: string;
  onChange: (pattern: string) => void;
  error?: string;
  isValid: boolean;
}

export default function RegexInput({ pattern, onChange, error, isValid }: RegexInputProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Regex Pattern
      </label>
      <div className="relative">
        <textarea
          value={pattern}
          onChange={handleChange}
          placeholder="Enter regex pattern (e.g., /hello\s+world/i)"
          className={`w-full px-4 py-3 font-mono text-sm border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors resize-none ${
            error || !isValid
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent'
          }`}
          rows={3}
          spellCheck={false}
        />
        {pattern && (
          <div className="absolute top-2 right-2">
            <span
              className={`text-xs px-2 py-1 rounded ${
                isValid
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
              }`}
            >
              {isValid ? '✓ Valid' : '✗ Invalid'}
            </span>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Tip: Use forward slashes for delimiters (optional), e.g., /pattern/flags
      </p>
    </div>
  );
}

