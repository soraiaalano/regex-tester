'use client';

import { MatchGroup } from '@/types';

interface MatchInfoProps {
  matchCount: number;
  matches: MatchGroup[];
  isValid: boolean;
}

export default function MatchInfo({ matchCount, matches, isValid }: MatchInfoProps) {
  if (!isValid) {
    return (
      <div className="w-full">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Match Information
        </h3>
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200">
            Invalid regex pattern. Please fix the pattern to see matches.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Match Information
      </h3>
      
      <div className="space-y-4">
        {/* Match Count */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Total Matches
            </span>
            <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
              {matchCount}
            </span>
          </div>
        </div>

        {/* Matches List */}
        {matches.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Matches ({matches.length})
            </p>
            {matches.map((match, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Match #{index + 1}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    [{match.startIndex}:{match.endIndex}]
                  </span>
                </div>
                <div className="font-mono text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700 break-all">
                  {match.match || '(empty match)'}
                </div>
                {Object.keys(match.groups).length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Groups:
                    </p>
                    {Object.entries(match.groups).map(([key, value], groupIndex) => (
                      <div
                        key={groupIndex}
                        className="text-xs font-mono bg-gray-100 dark:bg-gray-700 p-1.5 rounded"
                      >
                        <span className="text-gray-600 dark:text-gray-400">{key}:</span>{' '}
                        <span className="text-gray-900 dark:text-gray-100">
                          {value || '(undefined)'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              No matches found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

