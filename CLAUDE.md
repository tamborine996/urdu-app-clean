# Urdu Learning App - Development Guide

## ⚠️ CRITICAL: Project Configuration  
**ALWAYS work in the `urdu-app-clean` folder and deploy to the `urdu-app-clean` Vercel project!**

### 📁 Correct Working Directory
```bash
# ALWAYS use this directory
cd "C:\Users\mqc20\Downloads\Projects\urdu-app-clean"
```

### 🌐 Production URL
**Stable Production URL**: https://urdu-app-clean.vercel.app
- This is the main production URL that never changes
- All deployments should update this URL automatically  
- Connected to the `urdu-app-clean` Vercel project

## Development Environments

### Option 1: Vercel Dev (Recommended for Authentication & Translation Testing)
```bash
# MUST be in urdu-app-clean directory
cd "C:\Users\mqc20\Downloads\Projects\urdu-app-clean"
vercel dev --yes

# Visit: http://localhost:3000
# Benefits: Real Microsoft Translator API + Supabase authentication
```

### Option 2: Python Server (For UI Testing Only)
```bash
# MUST be in urdu-app-clean directory
cd "C:\Users\mqc20\Downloads\Projects\urdu-app-clean"
python -m http.server 8000 --bind 127.0.0.1

# Visit: http://127.0.0.1:8000
# Benefits: Fast startup, limited functionality (no auth/translation)
```

### Production Deployment
```bash
# MUST be in urdu-app-clean directory
cd "C:\Users\mqc20\Downloads\Projects\urdu-app-clean"
vercel --prod --yes

# Automatically updates: https://urdu-app-clean.vercel.app
```

## 🏗️ DEVELOPMENT STANDARDS (CRITICAL - READ FIRST)

### Architecture-First Approach (MANDATORY)
- **ALWAYS** propose the optimal technical approach before implementing any feature
- **NEVER** follow existing poor patterns without questioning and suggesting improvements
- **ALWAYS** consider scalability (24 episodes, 100+ articles, thousands of users)
- **ALWAYS** separate data from code (external files, APIs, databases - NEVER hardcode large content)
- **ALWAYS** think modular and maintainable

### Decision Process (REQUIRED FOR ALL TASKS)
1. **Analyze**: Review the request for architectural implications and scalability concerns
2. **Identify**: Spot any existing poor patterns that need refactoring
3. **Propose**: Present 2-3 implementation options with clear trade-offs
4. **Wait**: Get explicit approval before implementing
5. **Implement**: Execute the chosen approach following web development best practices

### Code Quality Requirements
- **External Data**: Content must be in separate files (.txt, .json, .js) or fetched from APIs
- **Modular Structure**: Functions should be single-purpose and reusable
- **Performance**: Consider load times, memory usage, and user experience
- **Maintainability**: Code should be readable and editable by future developers
- **Scalability**: Solutions must work with 10x, 100x the current data size

### Content Management Standards
- **Novel Episodes**: Store in `/mkm-chapters/` as individual .txt files
- **BBC Articles**: Keep using Sheet1.html but consider JSON conversion for performance
- **Vocabulary**: Database-first approach with localStorage fallback only
- **User Data**: Always use proper database schemas with appropriate indexing

### Red Flags to Always Question
- Hardcoding large text content in JavaScript strings
- Following existing poor patterns without improvement
- Quick fixes that don't scale
- Mixing data with presentation logic
- Missing error handling or fallback strategies

## Current Project Status (Latest Updates - July 30, 2025)

### ✅ Recently Completed Features
1. **Complete UX Overhaul**: Mobile-first design with sticky translation bar, desktop sidebar
2. **Vocabulary Difficulty System**: Color-coded dots (green=easy, yellow=medium, red=hard) with tap-to-cycle
3. **Advanced Vocabulary Interface**: Clean tab system (Browse/Filter tabs) for better mobile experience
4. **BBC Article Integration**: Automatic loading of Row 1 & Row 2 from Sheet1.html with AI-optimized headlines
5. **Smart Translation System**: Environment-aware routing for Python/Vercel/Production
6. **Confirmation Systems**: Safe vocabulary deletion with popup confirmations
7. **Novel Content System**: External file loading for "Mann Kay Muhallay Mein" Episode 1 with proper pagination (12 sentences per page)
8. **COMPREHENSIVE MOBILE FIX**: Complete mobile layout redesign with viewport-aware architecture

### 🔧 Current Technical Setup
- **Translation System**: Environment-aware routing
  - Python server (127.0.0.1:8000): Uses mock translations
  - Vercel dev (localhost:3000): Uses real Microsoft Translator API
  - Production (vercel.app): Uses real Microsoft Translator API
- **BBC Articles**: Automatically loads Row 1 & Row 2 from Sheet1.html with AI-optimized BBC-prefixed headlines
- **Vocabulary System**: Color-coded difficulty tracking with localStorage persistence
- **Novel Content**: External file loading from `mkm-chapters/ep1.txt` with 12 sentences per page
- **Mobile UX**: Comprehensive viewport-aware mobile layout with zero-margin architecture
- **Authentication**: Google OAuth with Supabase backend, cross-device vocabulary sync

## Sheet1.html Structure (CRITICAL)
**Understanding the data structure**:
- **Row 1**: A1 (title) + H1 (content) = First BBC article (Asia Cup)
- **Row 2**: A2 (title) + H2 (content) = Second BBC article (Social Media)
- **Row 3**: A3 (title) + H3 (content) = Third BBC article (Currency/ISI)

Current implementation loads **Row 1 & Row 2 only** for performance.

## Project Structure
**Location**: `C:\Users\mqc20\Downloads\Projects\urdu-app-clean\` (CRITICAL: Always work from this folder!)

- `index.html` - Main application with Supabase authentication and complete UX system
- `Sheet1.html` - BBC articles data (HTML table export from Google Sheets)
- `api/translate.js` - Vercel serverless function for secure translations
- `api/translate-local.js` - Local development translation function (unused in production)
- `supabase-setup.sql` - Database schema with Row Level Security policies
- `.env.local` - Local environment variables (Microsoft Translator API keys)
- `CLAUDE.md` - This development guide
- `README.md` - Comprehensive project documentation

## Vercel Project Configuration
- **Project Name**: `urdu-app-clean` (in Vercel dashboard)
- **Repository**: `https://github.com/tamborine996/urdu-learning-studio.git`
- **Production URL**: `https://urdu-app-clean.vercel.app` (stable, never changes)
- **Branch**: `master`

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

## Mobile Layout Architecture (CRITICAL - July 30, 2025)

### 🚀 Comprehensive Mobile Fix Implementation
**Problem**: Previous mobile layout had content cutoff issues, overlapping elements, and poor viewport utilization.
**Solution**: Complete mobile-first architectural redesign with viewport-aware containers.

### Key Mobile Layout Features:
1. **Viewport Control**: `width: 100vw` with `overflow-x: hidden` prevents horizontal scroll
2. **Zero-Margin Architecture**: All containers use `margin: 0` with `box-sizing: border-box`
3. **Flex-Based Navigation**: `justify-content: space-around` ensures even button distribution
4. **Centered Auth Button**: Perfect positioning with `transform: translateX(-50%)`
5. **Text Wrapping**: Enhanced Urdu text wrapping with `word-wrap: break-word` and RTL support

### Mobile CSS Structure:
```css
@media (max-width: 480px) {
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; overflow-x: hidden; }
    .container { width: 100vw; max-width: 100vw; }
    .page-navigation { justify-content: space-around; }
    .page-button { flex: 0 0 auto; max-width: 80px; }
}
```

## Common Issues & Solutions
- **"Failed to fetch" BBC articles**: Use HTTP server, not file:// protocol
- **"localhost didn't send data"**: Add `--bind 127.0.0.1` flag to Python server
- **Vercel project name errors**: Remove spaces from folder name
- **Translation not working locally**: Use Vercel dev for real API, Python server only has mocks
- **Vocabulary not saving**: Check localStorage permissions in browser
- **BBC articles not loading**: Verify Sheet1.html exists and has proper table structure
- **Mobile content cutoff**: Fixed with comprehensive viewport-aware layout (July 30, 2025)
- **Next button not visible**: Fixed with flex-based navigation system
- **Google sign-in overlap**: Fixed with centered positioning and proper header padding

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

## 📝 Recent Development Session (July 30, 2025)

### Work Completed:
1. **Mobile Layout Issues Identified**: Screenshots revealed Next button cutoff and Urdu text truncation
2. **Novel Content Integration**: Added external file loading for "Mann Kay Muhallay Mein" Episode 1
3. **Pagination Optimization**: Changed from 3 to 12 sentences per page (reduced from 63 to ~16 pages)
4. **Duplicate Story Fix**: Prevented duplicate novel loading with `novelEpisodesLoaded` flag
5. **Comprehensive Mobile Redesign**: Complete viewport-aware mobile layout architecture
6. **Google Sign-in Fix**: Resolved overlapping header issue with centered positioning

### Files Modified:
- `index.html`: Complete mobile CSS redesign, novel loading system, pagination fixes
- `mkm-chapters/ep1.txt`: Novel content file created
- `CLAUDE.md`: Updated with latest changes and mobile architecture documentation

### Next Session Priorities:
- Test mobile layout on actual devices
- Add more novel episodes if needed
- Consider additional BBC articles (Row 3 support)
- Monitor vocabulary system performance

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

### Database Schema (PostgreSQL)
```sql
CREATE TABLE user_vocabulary (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  urdu_word TEXT NOT NULL,
  english_translation TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE user_vocabulary ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own vocabulary" ON user_vocabulary
  USING (auth.uid() = user_id);
```

### Color-Coded Difficulty System
```javascript
const difficulties = ['easy', 'medium', 'hard'];
const colors = ['#22c55e', '#eab308', '#ef4444']; // green, yellow, red
```

## Authentication Features Summary

### ✅ Implemented Features
- **Google OAuth Integration**: One-click sign-in with Google accounts
- **Automatic Migration**: Seamlessly transfers localStorage vocabulary to user account
- **Cross-Device Sync**: Access vocabulary from any device after signing in
- **Anonymous Fallback**: Users can continue without signing in using localStorage
- **Secure Database**: PostgreSQL with Row Level Security protecting user data
- **Real-time Updates**: UI immediately reflects database changes
- **Error Handling**: Graceful fallbacks when authentication is unavailable

### 🔧 Technical Implementation
- **Supabase SDK**: Client-side integration with retry mechanisms
- **Row Level Security**: Database policies ensure users only see their own data
- **Environment Detection**: Authentication works in all environments (local/dev/production)
- **Safe Client Init**: Handles cases where Supabase SDK fails to load
- **User Session Management**: Persistent authentication state across page reloads

### 🔐 Authentication Quick Reference
- **Live URL**: Authentication fully functional with Google OAuth
- **Local Testing**: Use `vercel dev` for full auth features, Python server for basic UI
- **User Data**: Stored securely in PostgreSQL with automatic localStorage migration
- **Anonymous Users**: Can still use app with localStorage until they choose to sign in
- **Cross-Device**: Sign in once, access vocabulary everywhere