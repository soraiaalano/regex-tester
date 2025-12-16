export interface RegexFlags {
  global: boolean;        // g
  caseInsensitive: boolean; // i
  multiline: boolean;      // m
  dotAll: boolean;        // s
  unicode: boolean;       // u
  sticky: boolean;        // y
}

export interface MatchGroup {
  index: number;
  match: string;
  groups: Record<string, string | undefined>;
  startIndex: number;
  endIndex: number;
}

export interface RegexTestResult {
  isValid: boolean;
  error?: string;
  matches: MatchGroup[];
  matchCount: number;
  flags: RegexFlags;
}

export interface RegexPattern {
  pattern: string;
  flags: RegexFlags;
}

