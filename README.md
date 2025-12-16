  # Regex Tester & Builder

A modern web application for testing and building regular expressions with real-time preview and visual highlighting. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Real-time Testing** - Test regex patterns as you type with instant feedback
- 🎨 **Visual Highlighting** - See all matches highlighted in the test string with color coding
- 🚩 **Regex Flags** - Toggle all standard flags (g, i, m, s, u, y) with visual indicators
- 📊 **Match Information** - Detailed match statistics including:
  - Total match count
  - Individual match details with positions
  - Capture groups breakdown
- ✅ **Error Handling** - Clear error messages for invalid regex patterns
- 📋 **Export Options**:
  - Copy regex pattern
  - Copy full pattern with flags
  - Export to JavaScript code snippet
  - Export to Python code snippet
- 🌙 **Dark Mode** - Automatic dark mode support
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
regex-tester/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with all components
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── RegexInput.tsx      # Regex pattern input component
│   ├── TestStringInput.tsx # Test string input component
│   ├── MatchHighlighter.tsx # Visual highlighting component
│   ├── RegexFlags.tsx      # Flags toggle component
│   ├── MatchInfo.tsx       # Match information panel
│   └── ExportButtons.tsx   # Export/copy buttons
├── lib/
│   └── regexTester.ts     # Core regex testing logic
└── types/
    └── index.ts            # TypeScript type definitions
```

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and effects

## How to Use

1. **Enter Regex Pattern**: Type your regular expression in the pattern input field
2. **Set Flags**: Toggle the regex flags you need (global, case-insensitive, multiline, etc.)
3. **Enter Test String**: Type or paste the text you want to test against the pattern
4. **View Results**: 
   - See highlighted matches in the test string
   - Check match information panel for details
   - View match count and capture groups
5. **Export**: Copy the pattern or export to JavaScript/Python code

## Regex Flags

- **g (Global)**: Find all matches instead of just the first one
- **i (Case Insensitive)**: Ignore case when matching
- **m (Multiline)**: ^ and $ match line breaks
- **s (Dot All)**: . matches newline characters
- **u (Unicode)**: Enable full Unicode support
- **y (Sticky)**: Matches only from the lastIndex position

## Examples

### Email Validation
```
Pattern: ^[^\s@]+@[^\s@]+\.[^\s@]+$
Flags: None
Test String: contact@example.com
```

### Phone Number
```
Pattern: \d{3}-\d{3}-\d{4}
Flags: g (global)
Test String: Call 123-456-7890 or 987-654-3210
```

### Extract URLs
```
Pattern: https?://[^\s]+
Flags: g (global), i (case insensitive)
Test String: Visit https://example.com and HTTP://test.org
```

## Building for Production

```bash
npm run build
npm start
```

Production output is in the `.next/` folder.

## License

MIT License - feel free to use for personal or commercial projects.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

Made with ❤️ using Next.js
