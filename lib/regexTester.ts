import { RegexFlags, RegexTestResult, MatchGroup } from '@/types';

/**
 * Convert RegexFlags object to string format (e.g., "gim")
 */
export function flagsToString(flags: RegexFlags): string {
  let flagString = '';
  if (flags.global) flagString += 'g';
  if (flags.caseInsensitive) flagString += 'i';
  if (flags.multiline) flagString += 'm';
  if (flags.dotAll) flagString += 's';
  if (flags.unicode) flagString += 'u';
  if (flags.sticky) flagString += 'y';
  return flagString;
}

/**
 * Test regex pattern against test string
 */
export function testRegex(
  pattern: string,
  testString: string,
  flags: RegexFlags
): RegexTestResult {
  // Default result
  const result: RegexTestResult = {
    isValid: false,
    matches: [],
    matchCount: 0,
    flags,
  };

  // Empty pattern is valid but no matches
  if (pattern === '') {
    result.isValid = true;
    return result;
  }

  try {
    const flagString = flagsToString(flags);
    const regex = new RegExp(pattern, flagString);

    // Test the regex
    if (flags.global || flags.sticky) {
      // Use matchAll for global/sticky to get all matches
      const matches = Array.from(testString.matchAll(regex));
      result.matches = matches.map((match, index) => {
        const startIndex = match.index ?? 0;
        return {
          index,
          match: match[0],
          groups: match.groups || {},
          startIndex,
          endIndex: startIndex + match[0].length,
        };
      });
      result.matchCount = matches.length;
    } else {
      // Single match
      const match = testString.match(regex);
      if (match && match.index !== undefined) {
        result.matches = [
          {
            index: 0,
            match: match[0],
            groups: match.groups || {},
            startIndex: match.index,
            endIndex: match.index + match[0].length,
          },
        ];
        result.matchCount = 1;
      } else {
        result.matches = [];
        result.matchCount = 0;
      }
    }

    result.isValid = true;
  } catch (error) {
    result.error = error instanceof Error ? error.message : 'Invalid regex pattern';
    result.isValid = false;
  }

  return result;
}

/**
 * Get default flags (all false)
 */
export function getDefaultFlags(): RegexFlags {
  return {
    global: false,
    caseInsensitive: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false,
  };
}

