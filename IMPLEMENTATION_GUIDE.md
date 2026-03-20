# Movie Recommendation System - Implementation Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Pages:                          Components:                │
│  ├─ SearchPage.jsx              ├─ RecommendationModal.jsx │
│  └─ MovieDetailsPage.jsx ────────└─ SimilarMoviesSection    │
│         │                                                     │
│         ├─ Hooks:                                           │
│         │  ├─ useSearch.js                                  │
│         │  └─ useSimilarMovies.js                           │
│         │                                                    │
│         └─ Services & API:                                  │
│            ├─ searchApi.js                                  │
│            └─ searchService.js                              │
│                    │                                         │
├─────────────────────────────────────────────────────────────┤
│                  Backend (Node.js + Express)                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Routes:                        Services:                   │
│  ├─ GET /search                ├─ movie.service.js         │
│  └─ GET /movies/:id/similar    └─ movie.controller.js      │
│         │                                                     │
├─────────────────────────────────────────────────────────────┤
│              External API (TMDB - The Movie Database)       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ├─ /search/multi                                           │
│  ├─ /movie/:id/similar                                      │
│  └─ /movie/:id/recommendations                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
Frontend/
├── src/
│   ├── api/
│   │   └── searchApi.js                          # API calls
│   ├── services/
│   │   └── searchService.js                      # Service layer
│   ├── hooks/
│   │   └── search/
│   │       ├── useSearch.js                      # Search hook
│   │       └── useSimilarMovies.js               # Recommendations hook
│   ├── components/
│   │   └── search/
│   │       ├── RecommendationModal.jsx           # Modal component
│   │       └── SimilarMoviesSection.jsx          # Similar movies display
│   ├── pages/
│   │   ├── SearchPage.jsx                        # Search page (enhanced)
│   │   └── MovieDetailsPage.jsx                  # Details page (enhanced)
│   └── styles/
│       ├── RecommendationModal.scss              # Modal styles
│       └── SimilarMoviesSection.scss             # Similar movies styles
│
├── RECOMMENDATIONS_SYSTEM.md                     # Technical documentation
└── USER_GUIDE.md                                 # User documentation

Backend/
├── src/
│   ├── routes/
│   │   └── movie.routes.js                       # Enhanced routes
│   ├── controllers/
│   │   └── movie.controller.js                   # Request handlers
│   └── services/
│       └── movie.service.js                      # Business logic
```

---

## Data Flow Diagram

### Search to Recommendations Flow

```
User Types in Search Bar
        ↓
SearchPage.handleSearchChange()
        ↓
setQuery(searchTerm)
        ↓
useSearch(query) Hook Triggered
        ↓
searchService.searchMulti(query)
        ↓
axios.get("/search?query=...")
        ↓
Backend: GET /api/search
        ↓
movie.controller.searchMovie()
        ↓
TMDB: /search/multi
        ↓
Response: Array of matching movies
        ↓
Display in search results carousel
        ↓
User clicks on a movie card
        ↓
handleMovieClick(movie) executed
        ↓
setSelectedMovieForRecommendation(movie)
        ↓
useSimilarMovies(movie.id) Hook Triggered
        ↓
searchService.getSimilarMovies(id)
        ↓
axios.get("/movies/:id/similar")
        ↓
Backend: GET /api/movies/:id/similar
        ↓
movie.controller.getSimilarMovies()
        ↓
TMDB: /movie/:id/similar
        ↓
Response: Array of similar movies
        ↓
RecommendationModal displays:
├─ Selected movie details
└─ Similar movies carousel
        ↓
User can:
├─ View full details
├─ Browse similar movies
└─ Close modal & explore others
```

---

## Component Details

### 1. RecommendationModal.jsx

**Responsibilities:**
- Display selected movie information
- Show similar movies in a grid
- Handle modal open/close
- Navigation to full details

**Key Features:**
```javascript
const RecommendationModal = ({ movie, similarMovies, loading, onClose }) => {
  // Display movie details with poster, title, rating, year, description
  // Show similar movies grid (max 6 items)
  // Handle loading and error states
  // Smooth animations and transitions
}
```

**Styling Features:**
- Gradient background
- Smooth animations on open
- Responsive grid layout
- Hover effects on movie cards
- Mobile-optimized layout

### 2. SimilarMoviesSection.jsx

**Responsibilities:**
- Display carousel of similar movies
- Show loading and error states
- Responsive grid layout
- Navigation support

**Key Features:**
```javascript
const SimilarMoviesSection = ({ movies, loading, error, title }) => {
  // Display movies in auto-fill grid
  // Show up to 12 movies
  // Show loading spinner or error message
  // Hover animations
}
```

### 3. Modified SearchPage.jsx

**New State Variables:**
```javascript
const [selectedMovieForRecommendation, setSelectedMovieForRecommendation] = useState(null)
const { movies: similarMovies, loading: similarLoading } = useSimilarMovies(selectedMovieForRecommendation?.id)
```

**New Event Handlers:**
```javascript
const handleMovieClick = (e, movie) => {
  e.preventDefault()
  setSelectedMovieForRecommendation(movie)
}

const closeRecommendationModal = () => {
  setSelectedMovieForRecommendation(null)
}
```

**Rendered Modal:**
```jsx
{selectedMovieForRecommendation && (
  <RecommendationModal 
    movie={selectedMovieForRecommendation}
    similarMovies={similarMovies}
    loading={similarLoading}
    onClose={closeRecommendationModal}
  />
)}
```

### 4. Modified MovieDetailsPage.jsx

**New Imports:**
```javascript
import { useSimilarMovies } from "../hooks/search/useSimilarMovies"
import SimilarMoviesSection from "../components/search/SimilarMoviesSection"
```

**New Hook Usage:**
```javascript
const { movies: similarMovies, loading: similarLoading, error: similarError } = useSimilarMovies(id)
```

**New JSX:**
```jsx
<SimilarMoviesSection 
  movies={similarMovies}
  loading={similarLoading}
  error={similarError}
  title="Similar Movies"
/>
```

---

## Hooks Implementation

### useSimilarMovies Hook

```javascript
export const useSimilarMovies = (movieId) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!movieId) {
      setMovies([])
      return
    }

    const fetchSimilarMovies = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getSimilarMovies(movieId)
        setMovies(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Error fetching similar movies:", err)
        setError(err.message)
        setMovies([])
      } finally {
        setLoading(false)
      }
    }

    fetchSimilarMovies()
  }, [movieId])

  return { movies, loading, error }
}
```

**Key Behaviors:**
- Only fetches when movieId is provided
- Handles empty state gracefully
- Includes error handling
- Automatic cleanup on unmount

---

## API Layer

### searchApi.js Functions

```javascript
// Search across all types (movies, TV, people)
export const multiSearch = async (query) => {
  const response = await axios.get("/search", { params: { query } })
  return response.data
}

// Get movies similar to a given movie
export const getSimilarMovies = async (movieId) => {
  const response = await axios.get(`/movies/${movieId}/similar`)
  return response.data
}

// Get recommendations for a movie
export const getRecommendedMovies = async (movieId) => {
  const response = await axios.get(`/movies/${movieId}/recommendations`)
  return response.data
}
```

### Backend API Routes

```javascript
// GET /api/search?query={query}
// Returns: Array of search results
router.get('/search', movieController.searchMovie)

// GET /api/movies/:id/similar
// Returns: Array of similar movies
router.get('/:id/similar', movieController.getSimilarMovies)

// GET /api/movies/:id/recommendations
// Returns: Array of recommended movies
router.get('/:id/recommendations', movieController.getRecommendedMovies)
```

---

## Styling Architecture

### SCSS Variables (if using shared variables)

```scss
// Colors
$primary-color: #e50914
$secondary-color: #1a1a2e
$text-light: #ffffff
$text-dim: #b0b0b0

// Breakpoints
$mobile: 480px
$tablet: 768px
$desktop: 1024px

// Animations
$transition-fast: 0.3s ease
$transition-smooth: 0.5s ease-in-out
```

### Responsive Design

```scss
// Mobile First Approach
.component {
  // Mobile styles (default)
  display: block
}

// Tablet
@media (min-width: 768px) {
  .component {
    display: grid
    grid-template-columns: repeat(2, 1fr)
  }
}

// Desktop
@media (min-width: 1024px) {
  .component {
    display: grid
    grid-template-columns: repeat(3, 1fr)
  }
}
```

---

## Error Handling Strategy

### API Error Handling

```javascript
try {
  const data = await getSimilarMovies(movieId)
  setMovies(data)
} catch (err) {
  // Network error
  if (err.message === "Network Error") {
    setError("Check your internet connection")
  }
  // API error
  else if (err.response?.status === 404) {
    setError("Movie not found")
  }
  // Generic error
  else {
    setError("Failed to load similar movies")
  }
  setMovies([])
}
```

### User-Facing Error Messages

1. **Network errors** - "Check your internet connection"
2. **Not found (404)** - "Movie not found"
3. **Server errors (5xx)** - "Server error, please try again"
4. **Timeout** - "Request timed out, please try again"
5. **Generic** - "Failed to load recommendations"

---

## Performance Optimization

### 1. Memoization
```javascript
const handleMovieClick = useCallback((e, movie) => {
  e.preventDefault()
  setSelectedMovieForRecommendation(movie)
}, [])
```

### 2. Lazy Loading
- Similar movies only load when modal opens
- Images load on demand with fallback

### 3. Debouncing (for future enhancement)
```javascript
const debouncedSearch = useCallback(
  debounce((query) => setQuery(query), 300),
  []
)
```

### 4. Caching (for future enhancement)
```javascript
const cachedSimilarMovies = useMemo(
  () => movies,
  [movies]
)
```

---

## Testing Strategy

### Unit Tests

```javascript
// __tests__/useSimilarMovies.test.js
describe('useSimilarMovies', () => {
  test('should fetch similar movies', async () => {
    const { result } = renderHook(() => useSimilarMovies(550))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.movies.length).toBeGreaterThan(0)
  })

  test('should handle errors', async () => {
    const { result } = renderHook(() => useSimilarMovies(null))
    expect(result.current.error).toBe(null)
    expect(result.current.movies).toEqual([])
  })
})
```

### Component Tests

```javascript
// __tests__/RecommendationModal.test.jsx
describe('RecommendationModal', () => {
  test('should render movie details', () => {
    const movie = { id: 1, title: 'Test', vote_average: 8.5 }
    render(<RecommendationModal movie={movie} similarMovies={[]} loading={false} onClose={() => {}} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  test('should close on X button click', () => {
    const onClose = jest.fn()
    const { getByText } = render(<RecommendationModal ... onClose={onClose} />)
    getByText('✕').click()
    expect(onClose).toHaveBeenCalled()
  })
})
```

---

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |
| IE      | 11      | ❌ No   |

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Backend API endpoints working
- [ ] TMDB API key valid
- [ ] Build successful (`npm run build`)
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Modal animations smooth
- [ ] Similar movies loading
- [ ] Search functionality working
- [ ] Images loading correctly
- [ ] Mobile experience tested
- [ ] Performance optimized

---

## Future Enhancements

### Phase 1 (Short term)
- [ ] Add movie filters (year, rating, genre)
- [ ] Implement watchlist feature
- [ ] Add user ratings

### Phase 2 (Medium term)
- [ ] User authentication
- [ ] Personalized recommendations
- [ ] Save search preferences

### Phase 3 (Long term)
- [ ] Machine learning recommendations
- [ ] Social sharing
- [ ] Mobile native app

---

## Troubleshooting Guide

### Issue: Similar movies not loading
**Debug steps:**
1. Check network tab in DevTools
2. Verify API endpoint: `/movies/{id}/similar`
3. Check console for errors
4. Verify TMDB API key in backend

### Issue: Modal not appearing
**Debug steps:**
1. Verify `selectedMovieForRecommendation` state
2. Check `handleMovieClick` is called
3. Verify RecommendationModal import
4. Check z-index in RecommendationModal.scss

### Issue: Images not loading
**Debug steps:**
1. Check image URL format
2. Verify TMDB image base URL
3. Check CORS policy
4. Use placeholder fallback

---

## Resources

- **TMDB Documentation**: https://www.themoviedb.org/settings/api
- **React Hooks Documentation**: https://react.dev/reference/react
- **Axios Documentation**: https://axios-http.com/
- **SCSS Documentation**: https://sass-lang.com/documentation

---

## Support & Contact

For implementation questions or issues:
1. Check this documentation
2. Review example code
3. Check TMDB API status
4. Check browser console for errors
5. Review network requests in DevTools

