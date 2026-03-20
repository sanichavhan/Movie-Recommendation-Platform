# Movie Recommendation System - Quick Reference Guide

## 🎬 System Overview

```
┌──────────────────────────────────────────────────────────────┐
│             SEARCH-BASED MOVIE RECOMMENDATION SYSTEM         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  1. USER SEARCHES          2. RESULTS APPEAR                 │
│  ┌──────────────────┐     ┌──────────────────────────┐      │
│  │ 🔍 Avengers      │────→│ Movie 1  Movie 2  Movie 3│      │
│  └──────────────────┘     │ Movie 4  Movie 5  Movie 6│      │
│                           └──────────────────────────┘      │
│                                    │                         │
│                                    │ Click                   │
│                                    ↓                         │
│  3. RECOMMENDATION MODAL    4. EXPLORE FURTHER             │
│  ┌───────────────────────┐  ┌──────────────────────┐       │
│  │ Selected Movie        │ │ Similar Movie 1      │       │
│  │ ⭐ 8.5 | 🕒 148 min  │ │ Similar Movie 2      │       │
│  │ "Plot description..." │ │ Similar Movie 3      │       │
│  │ [View Details] ✕      │ │ More similar movies  │       │
│  │                       │ │                      │       │
│  │ Similar Movies:       │ └──────────────────────┘       │
│  │ 🎬 🎬 🎬              │                               │
│  └───────────────────────┘                               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start (3 Steps)

### Step 1: Search
```
Go to Search Page → Type "Avengers" → Press Enter
```

### Step 2: Click
```
Click on any movie thumbnail in search results
```

### Step 3: Explore
```
View recommendations in modal → Click similar movie to explore more
```

---

## 📱 User Interface

### Search Page
```
┌─────────────────────────────────────────────┐
│ 🔍 Movies, shows and more          ✕        │
├─────────────────────────────────────────────┤
│                                             │
│ Recent Searches:                           │
│ ⏱️ Avengers  ✕                             │
│ ⏱️ Harry Potter  ✕                        │
│ ⏱️ Inception  ✕                           │
│                                             │
│ or                                          │
│                                             │
│ Trending in India:                         │
│ [Poster] [Poster] [Poster] [Poster]...    │
│                                             │
└─────────────────────────────────────────────┘
```

### Search Results
```
┌─────────────────────────────────────────────┐
│ 🔍 Avengers [search bar]                    │
├─────────────────────────────────────────────┤
│ Found 247 results for "Avengers"            │
│ 💡 Click on any movie to see recommendations│
│                                             │
│ [Poster] [Poster] [Poster] [Poster]...    │
│ [Poster] [Poster] [Poster] [Poster]...    │
│ [Poster] [Poster] [Poster] [Poster]...    │
│                                             │
└─────────────────────────────────────────────┘
```

### Recommendation Modal
```
┌───────────────────────────────────────────────┐
│ ⭐ 8.5 | 📅 2012 | 🕒 143 min           ✕   │
│                                               │
│ ┌──────────┐  The Avengers                   │
│ │ Poster   │  When an alien army invades     │
│ │ ✓ Image  │  Earth, a team of superheroes  │
│ └──────────┘  must work together to save...  │
│                                               │
│               [View Full Details →]          │
│                                               │
│ Similar Movies You Might Like                │
│ ┌─────┬─────┬─────┬─────┬─────┬─────┐     │
│ │ 1   │ 2   │ 3   │ 4   │ 5   │ 6   │     │
│ └─────┴─────┴─────┴─────┴─────┴─────┘     │
│                                               │
└───────────────────────────────────────────────┘
```

### Movie Details Page
```
┌─────────────────────────────────────────────┐
│ [Poster]  Movie Title                       │
│           ⭐ 8.5 | 📅 2012 | 🕒 143 min    │
│           [Genre 1] [Genre 2] [Genre 3]    │
│           Plot description...               │
│           💰 Budget: $220M                   │
│           💵 Revenue: $1.5B                  │
│                                             │
│ Cast:                                       │
│ [Actor 1] [Actor 2] [Actor 3]              │
│                                             │
│ Similar Movies:                             │
│ [Poster] [Poster] [Poster] [Poster]...    │
│ [Poster] [Poster] [Poster] [Poster]...    │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 💾 Data Flow

```
User Input
    ↓
Query: "Avengers"
    ↓
Frontend: searchService.searchMulti(query)
    ↓
Backend: GET /api/search?query=Avengers
    ↓
TMDB API: /search/multi
    ↓
Response: [Movie1, Movie2, Movie3, ...]
    ↓
Display: Search Results Carousel
    ↓
User Clicks Movie
    ↓
Modal Opens with Selected Movie
    ↓
Hook: useSimilarMovies(movieId)
    ↓
Backend: GET /api/movies/550/similar
    ↓
TMDB API: /movie/550/similar
    ↓
Response: [Similar1, Similar2, ...]
    ↓
Display: Similar Movies Grid
    ↓
User Can Explore Further
```

---

## 🎯 Component Tree

```
App.jsx
├── SearchPage.jsx
│   ├── Navbar
│   ├── Search Input
│   ├── Search Results / Trending
│   └── RecommendationModal ← USER CLICKS
│       ├── Movie Details
│       └── Similar Movies (useSimilarMovies)
│           └── MovieCard x 6
├── MovieDetailsPage.jsx
│   ├── Navbar
│   ├── Movie Details
│   ├── Cast (CastComponent)
│   └── SimilarMoviesSection ← AUTO-LOADED
│       └── MovieCard x 12
└── Footer
```

---

## 🔌 API Endpoints

```
Frontend                    Backend                 TMDB
┌──────────────────────┐   ┌──────────────────┐   ┌─────────────────┐
│                      │   │                  │   │                 │
│ searchMulti(query)   │──→│ GET /api/search  │──→│ /search/multi   │
│                      │   │                  │   │                 │
│ getSimilarMovies(id) │──→│ GET /api/movies  │──→│ /movie/:id/     │
│                      │   │ /:id/similar     │   │ similar         │
│                      │   │                  │   │                 │
└──────────────────────┘   └──────────────────┘   └─────────────────┘
```

---

## 📊 State Management

### SearchPage Component
```javascript
const [query, setQuery] = useState("")
const [selectedMovieForRecommendation, setSelectedMovieForRecommendation] = useState(null)
const [recentSearches, setRecentSearches] = useState([...])

const { movies, loading, error } = useSearch(query)
const { movies: similarMovies, loading: similarLoading } = useSimilarMovies(selectedMovieForRecommendation?.id)
```

### MovieDetailsPage Component
```javascript
const { id } = useParams()
const { movie, loading, error } = useMovieDetails(id)
const { cast, loading: castLoading } = useCast(id)
const { movies: similarMovies, loading: similarLoading } = useSimilarMovies(id)
```

---

## 🎨 Styling System

### Colors
```css
Primary:     #e50914 (Netflix Red)
Secondary:   #1a1a2e (Dark Blue)
Text Light:  #ffffff
Text Dim:    #b0b0b0
```

### Responsive Breakpoints
```css
Mobile:    < 480px   (Single column)
Tablet:    480-768px (2 columns)
Desktop:   > 768px   (3+ columns)
```

### Animations
```css
fadeIn:    0.3s ease-in-out
slideUp:   0.3s ease-in-out
hover:     0.3s ease (transform)
```

---

## 🔍 Search Types

```
Movie Name:        "Avengers"
Multiple Words:    "superhero action"
Genre:             "sci-fi"
Actor Name:        "Tom Hanks"
Director:          "Steven Spielberg"
Year:              "2023"
Combination:       "2023 action movies"
```

---

## 🎬 Movie Information Displayed

### In Search Results
```
┌──────────┐
│ Poster   │ Title
│          │ ⭐ Rating
│          │ 📅 Year
└──────────┘
```

### In Recommendation Modal
```
Movie Header:
├── Poster Image
├── Title
├── ⭐ Rating (e.g., 8.5/10)
├── 📅 Release Year
├── 🕒 Duration (minutes)
└── Overview (Plot Description)

Button:
└── View Full Details

Similar Movies:
└── 6 Movie Cards
```

### On Movie Details Page
```
Main Info:
├── Poster & Image
├── Title
├── ⭐ Rating
├── 📅 Release Date
├── 🕒 Duration
├── Genres
├── Overview
├── 💰 Budget
└── 💵 Revenue

Additional:
├── Cast Section
└── Similar Movies Section
    └── 12 Movie Cards
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Submit search |
| `Esc` | Close modal |
| `Tab` | Navigate items |
| `Space` | Click focused |

---

## 🐛 Common Issues & Solutions

### Issue: No results
```
Solution:
1. Check spelling
2. Try different search term
3. Check internet connection
```

### Issue: Modal not opening
```
Solution:
1. Click on movie card directly
2. Ensure query is not empty
3. Check browser console
```

### Issue: Images not loading
```
Solution:
1. Refresh page
2. Clear cache
3. Check TMDB API status
```

### Issue: Slow recommendations
```
Solution:
1. Check internet speed
2. Wait for loading to complete
3. Close and retry modal
```

---

## 📈 Performance Tips

### For Users
- ✅ Search with specific keywords
- ✅ Wait for results to load
- ✅ Use recent searches for quick access
- ✅ Clear browser cache periodically

### For Developers
- ✅ Use useCallback for handlers
- ✅ Lazy load images
- ✅ Implement error boundaries
- ✅ Monitor API response times

---

## 🔐 Security & Privacy

```
What's Stored:
✅ Last 5 searches (localStorage)
❌ No passwords
❌ No personal data
❌ No tracking cookies

Data Location:
✅ Searches stored on your device
❌ No data sent to unknown servers
✅ Only TMDB API calls are made
```

---

## 📱 Mobile Experience

### Touch Interactions
```
Single Tap:    Click movie card → Open modal
Swipe Left:    Move to next movie
Swipe Right:   Move to previous movie
Swipe Down:    Close modal
Pinch:         Zoom image (browser default)
```

### Mobile Layout
```
Portrait:      Single column layout
Landscape:     2 column layout
Small Screen:  Reduced modal size
Large Screen:  Full modal display
```

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ OK  |
| Firefox | 88+     | ✅ OK  |
| Safari  | 14+     | ✅ OK  |
| Edge    | 90+     | ✅ OK  |
| IE      | 11      | ❌ No  |

---

## 📚 Documentation Map

```
PROJECT_SUMMARY.md
    └─ Overview & completion status

SETUP_GUIDE.md
    ├─ Installation steps
    ├─ Configuration
    └─ Quick reference

USER_GUIDE.md
    ├─ How to use
    ├─ Features
    ├─ Troubleshooting
    └─ FAQs

RECOMMENDATIONS_SYSTEM.md
    ├─ Technical specs
    ├─ Component APIs
    ├─ Hooks usage
    └─ Performance details

IMPLEMENTATION_GUIDE.md
    ├─ Architecture
    ├─ Code examples
    ├─ Testing
    └─ Deployment
```

---

## ✅ Getting Help

### Check Documentation:
1. Look in PROJECT_SUMMARY.md for overview
2. Check USER_GUIDE.md for how-to
3. Review RECOMMENDATIONS_SYSTEM.md for technical details
4. See IMPLEMENTATION_GUIDE.md for code examples

### Debugging:
1. Open DevTools (F12)
2. Check Console for errors
3. Check Network tab for API calls
4. Look at Element inspector

### Troubleshooting:
1. Refresh page (F5)
2. Clear cache (Ctrl+Shift+Delete)
3. Check internet connection
4. Try different browser

---

## 🎉 Ready to Use!

Your search-based movie recommendation system is complete and ready to deploy!

### Quick Checklist:
- ✅ All features implemented
- ✅ Comprehensive documentation
- ✅ Mobile responsive
- ✅ Error handling
- ✅ Performance optimized

### Start Using:
```bash
npm run dev
# Open http://localhost:5173
# Start searching for movies!
```

---

**Happy Movie Discovering! 🍿🎬**

Built with React, Vite, and TMDB API

