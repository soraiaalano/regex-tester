'use client';

import { RegexFlags } from '@/types';
import { flagsToString } from '@/lib/regexTester';
import { useState } from 'react';

interface ExportButtonsProps {
    pattern: string;
    flags: RegexFlags;
    isValid: boolean;
}

export default function ExportButtons({ pattern, flags, isValid }: ExportButtonsProps) {
    const [copied, setCopied] = useState<string | null>(null);

    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(type);
            setTimeout(() => setCopied(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const flagString = flagsToString(flags);
    const fullPattern = `/${pattern}/${flagString}`;

    const exportJavaScript = () => {
        const code = `const regex = /${pattern}/${flagString};\nconst result = regex.test(yourString);`;
        return code;
    };

    const exportPython = () => {
        const escapedPattern = pattern.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        const pythonFlags = flagString.split('').map(f => {
            const flagMap: Record<string, string> = {
                i: 'IGNORECASE',
                m: 'MULTILINE',
                s: 'DOTALL',
                u: 'UNICODE'
            };
            return flagMap[f] || '';
        }).filter(Boolean);

        const flagsCode = pythonFlags.length > 0
            ? `re.${pythonFlags.join(' | re.')}`
            : '0';

        const code = `import re\n\npattern = r"${escapedPattern}"\nregex = re.compile(pattern, ${flagsCode})\nresult = regex.search(your_string)`;
        return code;
    };

    if (!isValid || !pattern) {
        return null;
    }

    return (
        <div className="w-full space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Export
            </h3>

            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() => copyToClipboard(pattern, 'pattern')}
                    className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors border border-gray-300 dark:border-gray-700"
                >
                    {copied === 'pattern' ? '✓ Copied' : 'Copy Pattern'}
                </button>

                <button
                    onClick={() => copyToClipboard(fullPattern, 'full')}
                    className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors border border-gray-300 dark:border-gray-700"
                >
                    {copied === 'full' ? '✓ Copied' : 'Copy Full'}
                </button>
            </div>

            <div className="space-y-2">
                <button
                    onClick={() => copyToClipboard(exportJavaScript(), 'js')}
                    className="w-full px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg transition-colors border border-blue-200 dark:border-blue-800 text-left"
                >
                    {copied === 'js' ? '✓ Copied JavaScript' : '📋 Copy JavaScript Code'}
                </button>

                <button
                    onClick={() => copyToClipboard(exportPython(), 'py')}
                    className="w-full px-3 py-2 text-sm bg-yellow-50 dark:bg-yellow-900/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-lg transition-colors border border-yellow-200 dark:border-yellow-800 text-left"
                >
                    {copied === 'py' ? '✓ Copied Python' : '🐍 Copy Python Code'}
                </button>
            </div>
        </div>
    );
}

