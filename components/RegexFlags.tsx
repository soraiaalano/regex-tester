'use client';

import { RegexFlags } from '@/types';

interface RegexFlagsProps {
  flags: RegexFlags;
  onChange: (flags: RegexFlags) => void;
}

export default function RegexFlags({ flags, onChange }: RegexFlagsProps) {
  const toggleFlag = (flagName: keyof RegexFlags) => {
    onChange({
      ...flags,
      [flagName]: !flags[flagName],
    });
  };

  const flagConfigs = [
    { key: 'global' as keyof RegexFlags, label: 'g', name: 'Global', description: 'Find all matches' },
    { key: 'caseInsensitive' as keyof RegexFlags, label: 'i', name: 'Case Insensitive', description: 'Ignore case' },
    { key: 'multiline' as keyof RegexFlags, label: 'm', name: 'Multiline', description: '^ and $ match line breaks' },
    { key: 'dotAll' as keyof RegexFlags, label: 's', name: 'Dot All', description: '. matches newline' },
    { key: 'unicode' as keyof RegexFlags, label: 'u', name: 'Unicode', description: 'Unicode support' },
    { key: 'sticky' as keyof RegexFlags, label: 'y', name: 'Sticky', description: 'Matches only from lastIndex' },
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Flags
      </label>
      <div className="grid grid-cols-2 gap-2">
        {flagConfigs.map(({ key, label, name, description }) => (
          <button
            key={key}
            type="button"
            onClick={() => toggleFlag(key)}
            className={`px-3 py-2 text-sm border rounded-lg transition-colors text-left ${
              flags[key]
                ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 text-blue-900 dark:text-blue-100'
                : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            title={description}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base">{label}</span>
              <span className="text-xs">{name}</span>
            </div>
          </button>
        ))}
      </div>
      {Object.values(flags).some(Boolean) && (
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Active flags:{' '}
          <span className="font-mono">
            {flagConfigs.filter(({ key }) => flags[key]).map(({ label }) => label).join('') || 'none'}
          </span>
        </div>
      )}
    </div>
  );
}

