'use client';

import { ChangeEvent } from 'react';

interface TestStringInputProps {
  testString: string;
  onChange: (testString: string) => void;
}

export default function TestStringInput({ testString, onChange }: TestStringInputProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Test String
      </label>
      <textarea
        value={testString}
        onChange={handleChange}
        placeholder="Enter text to test against the regex pattern..."
        className="flex-1 w-full px-4 py-3 font-mono text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        spellCheck={false}
      />
    </div>
  );
}

