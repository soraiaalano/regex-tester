'use client';

import { MatchGroup } from '@/types';
import { useMemo } from 'react';

interface MatchHighlighterProps {
  testString: string;
  matches: MatchGroup[];
}

export default function MatchHighlighter({ testString, matches }: MatchHighlighterProps) {
  const highlightedContent = useMemo(() => {
    if (!testString || matches.length === 0) {
      return <span className="whitespace-pre-wrap">{testString}</span>;
    }

    // Sort matches by start index
    const sortedMatches = [...matches].sort((a, b) => a.startIndex - b.startIndex);

    // Build array of segments (text and matches)
    const segments: Array<{ text: string; isMatch: boolean; matchIndex?: number }> = [];
    let lastIndex = 0;

    sortedMatches.forEach((match, matchIndex) => {
      // Add text before match
      if (match.startIndex > lastIndex) {
        segments.push({
          text: testString.substring(lastIndex, match.startIndex),
          isMatch: false,
        });
      }

      // Add match
      segments.push({
        text: match.match,
        isMatch: true,
        matchIndex,
      });

      lastIndex = match.endIndex;
    });

    // Add remaining text after last match
    if (lastIndex < testString.length) {
      segments.push({
        text: testString.substring(lastIndex),
        isMatch: false,
      });
    }

    return (
      <span className="whitespace-pre-wrap font-mono text-sm">
        {segments.map((segment, index) => {
          if (segment.isMatch) {
            return (
              <span
                key={index}
                className="bg-yellow-200 dark:bg-yellow-900/50 text-yellow-900 dark:text-yellow-100 px-0.5 rounded"
                title={`Match ${(segment.matchIndex ?? 0) + 1}`}
              >
                {segment.text}
              </span>
            );
          }
          return <span key={index}>{segment.text}</span>;
        })}
      </span>
    );
  }, [testString, matches]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 overflow-auto min-h-96">
        {highlightedContent}
      </div>
    </div>
  );
}

