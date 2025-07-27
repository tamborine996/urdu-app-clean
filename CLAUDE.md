# Urdu Learning App - Development Guide

## IMPORTANT: Folder Name Requirements
**Vercel requires folder names without spaces!**
- ✅ Good: `urdu-app`, `urdu_app`, `urdu-learning-studio`
- ❌ Bad: `Urdu app` (spaces cause Vercel errors)

## Development Environments

### Option 1: Vercel Dev (Recommended for Translation Testing)
```bash
# Requires folder name without spaces
cd "urdu-app"  # or whatever you renamed it to
vercel dev --yes

# Visit: http://localhost:3000
# Benefits: Real Microsoft Translator API, production-identical environment
```

### Option 2: Python Server (For UI Testing Only)
```bash
# For quick UI/dropdown testing
cd "urdu-app"
python -m http.server 8000 --bind 127.0.0.1

# Visit: http://127.0.0.1:8000
# Benefits: Fast startup, mock translations for UI testing
```

## Current Project Status (Latest Updates - July 2025)

### ✅ Recently Completed Features
1. **Complete UX Overhaul**: Mobile-first design with sticky translation bar, desktop sidebar
2. **Vocabulary Difficulty System**: Color-coded dots (green=easy, yellow=medium, red=hard) with tap-to-cycle
3. **Advanced Vocabulary Interface**: Clean tab system (Browse/Filter tabs) for better mobile experience
4. **BBC Article Integration**: Automatic loading of Row 1 & Row 2 from Sheet1.html with AI-optimized headlines
5. **Smart Translation System**: Environment-aware routing for Python/Vercel/Production
6. **Confirmation Systems**: Safe vocabulary deletion with popup confirmations

### 🔧 Current Technical Setup
- **Translation System**: Environment-aware routing
  - Python server (127.0.0.1:8000): Uses mock translations
  - Vercel dev (localhost:3000): Uses real Microsoft Translator API
  - Production (vercel.app): Uses real Microsoft Translator API
- **BBC Articles**: Automatically loads Row 1 & Row 2 from Sheet1.html with AI-optimized BBC-prefixed headlines
- **Vocabulary System**: Color-coded difficulty tracking with localStorage persistence
- **Mobile UX**: Sticky bottom translation bar, desktop sidebar, no popup overlays

## Sheet1.html Structure (CRITICAL)
**Understanding the data structure**:
- **Row 1**: A1 (title) + H1 (content) = First BBC article (Asia Cup)
- **Row 2**: A2 (title) + H2 (content) = Second BBC article (Social Media)
- **Row 3**: A3 (title) + H3 (content) = Third BBC article (Currency/ISI)

Current implementation loads **Row 1 & Row 2 only** for performance.

## Project Structure
- `index.html` - Main application with complete UX system
- `Sheet1.html` - BBC articles data (HTML table export from Google Sheets)
- `api/translate.js` - Vercel serverless function for secure translations
- `api/translate-local.js` - Local development translation function
- `.env.local` - Local environment variables (Microsoft Translator API keys)
- `CLAUDE.md` - This development guide
- `README.md` - Comprehensive project documentation

## Key Features

### Advanced UX System
- **Mobile Translation Bar**: Sticky bottom bar that slides up when translating
- **Desktop Sidebar**: Right-side translation panel for larger screens
- **No Popup Overlays**: Clean UX without covering text during translation
- **Touch-Optimized**: Mobile drag-to-select with proper touch event handling

### Vocabulary Management
- **Difficulty Tracking**: Color-coded dots with tap-to-cycle functionality
- **Safe Deletion**: Confirmation popups before deleting vocabulary items
- **Tab Interface**: Browse tab (view saved words) + Filter tab (difficulty filters)
- **Persistent Storage**: All vocabulary saved to localStorage

### BBC Article Loading
- **Automatic Processing**: Loads Row 1 & Row 2 from Sheet1.html on startup
- **AI-Optimized Headlines**: Pattern matching for BBC-prefixed English titles
- **Content Cleaning**: Removes image metadata, Getty Images credits, etc.
- **Smart Extraction**: A column = title, H column = content

### Translation System
- **Environment Detection**: Automatically detects Python server vs Vercel vs Production
- **Caching**: Prevents redundant API calls for better performance
- **Error Handling**: Graceful fallbacks for failed translations

## BBC Article System

### Current Headlines Generated
Based on Urdu title patterns, generates:
- `"BBC Asia Cup Cricket Tournament"` (ایشیا کپ pattern)
- `"BBC Social Media Age Restrictions"` (سوشل میڈیا pattern)
- `"BBC Currency & ISI Investigation"` (کرنسی/ڈالر pattern)

### Adding More Articles
To load Row 3, edit `loadBBCArticle()` function:
```javascript
// Change from rowsProcessed < 2 to rowsProcessed < 3
for (let i = 0; i < rows.length && rowsProcessed < 3; i++) {
```

### Pattern Matching System
Edit `createOptimizedHeadline()` to add new patterns:
```javascript
const patterns = [
    { urdu: /new_pattern/, english: "BBC New Article Type" }
];
```

## Common Issues & Solutions
- **"Failed to fetch" BBC articles**: Use HTTP server, not file:// protocol
- **"localhost didn't send data"**: Add `--bind 127.0.0.1` flag to Python server
- **Vercel project name errors**: Remove spaces from folder name
- **Translation not working locally**: Use Vercel dev for real API, Python server only has mocks
- **Vocabulary not saving**: Check localStorage permissions in browser
- **BBC articles not loading**: Verify Sheet1.html exists and has proper table structure

## Development Workflow

### Quick UI Testing
1. Start Python server: `python -m http.server 8000 --bind 127.0.0.1`
2. Visit: `http://127.0.0.1:8000`
3. Test vocabulary, BBC loading, UI interactions

### Translation Testing
1. Start Vercel dev: `vercel dev --yes`
2. Visit: `http://localhost:3000`
3. Test real Microsoft Translator API integration

### Production Deployment
1. Push to git repository
2. Vercel auto-deploys from git
3. Environment variables already configured

## Critical Code Locations

### BBC Loading Function
**File**: `index.html` (lines ~1052-1155)
**Function**: `loadBBCArticle()`
- Processes Sheet1.html table rows
- Extracts A column (title) and H column (content)
- Generates AI-optimized headlines

### Vocabulary Difficulty System
**File**: `index.html` (lines ~2200+)
**Function**: `cycleDifficulty()`
- Cycles through easy → medium → hard → easy
- Updates color-coded dots immediately
- Saves to localStorage

### Translation Bar System
**File**: `index.html` (CSS + JS)
- Mobile: `.mobile-translation-bar` (sticky bottom)
- Desktop: `.sidebar` (right panel)
- Environment detection for API routing

## Advanced Features

### Touch Event Handling
- `touchstart`: Initiates word selection
- `touchmove`: Extends selection across words
- `touchend`: Triggers translation
- `preventDefault`: Stops scrolling during selection

### Smart Environment Detection
```javascript
// Detects environment and routes accordingly
const isLocal = window.location.hostname === '127.0.0.1';
const isVercelDev = window.location.hostname === 'localhost';
const isProduction = window.location.hostname.includes('vercel.app');
```

### Color-Coded Difficulty System
```javascript
const difficulties = ['easy', 'medium', 'hard'];
const colors = ['#22c55e', '#eab308', '#ef4444']; // green, yellow, red
```