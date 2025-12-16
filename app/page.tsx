'use client';

import { useState } from 'react';
import RegexInput from '@/components/RegexInput';
import TestStringInput from '@/components/TestStringInput';
import MatchHighlighter from '@/components/MatchHighlighter';
import RegexFlags from '@/components/RegexFlags';
import MatchInfo from '@/components/MatchInfo';
import ExportButtons from '@/components/ExportButtons';
import { testRegex, getDefaultFlags } from '@/lib/regexTester';
import { RegexFlags as RegexFlagsType } from '@/types';

export default function Home() {
  const [pattern, setPattern] = useState<string>('');
  const [testString, setTestString] = useState<string>('');
  const [flags, setFlags] = useState<RegexFlagsType>(getDefaultFlags());

  // Test regex whenever pattern, testString, or flags change
  const testResult = testRegex(pattern, testString, flags);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Regex Tester & Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test and build regular expressions with real-time preview
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Regex Input */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <RegexInput
                pattern={pattern}
                onChange={setPattern}
                error={testResult.error}
                isValid={testResult.isValid}
              />
            </div>

            {/* Flags */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <RegexFlags flags={flags} onChange={setFlags} />
            </div>

            {/* Match Info */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <MatchInfo
                matchCount={testResult.matchCount}
                matches={testResult.matches}
                isValid={testResult.isValid}
              />
            </div>

            {/* Export */}
            {pattern && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                <ExportButtons
                  pattern={pattern}
                  flags={flags}
                  isValid={testResult.isValid}
                />
              </div>
            )}
          </div>

          {/* Right Column: Test String & Highlighting */}
          <div className="lg:col-span-2 space-y-6">
            {/* Test String Input */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-48">
              <TestStringInput
                testString={testString}
                onChange={setTestString}
              />
            </div>

            {/* Highlighted Output */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 min-h-96">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Highlighted Matches
              </label>
              <MatchHighlighter
                testString={testString}
                matches={testResult.matches}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Built with Next.js • Real-time regex testing
          </p>
        </footer>
      </div>
    </div>
  );
}
