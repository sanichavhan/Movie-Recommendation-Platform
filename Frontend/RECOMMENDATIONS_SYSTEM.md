# Search-Based Movie Recommendation System

## Overview
This is a complete implementation of a search-based movie recommendation system in React that helps users discover movies based on:
- **Search queries** (movie names, genres, actors)
- **Similar movies** based on genre and content
- **Trending movies** displayed on the search page
- **Interactive recommendations** that appear when clicking on movies

---

## Features Implemented

### 1. **Advanced Search**
- Real-time search with TMDB API integration
- Recent search history stored in localStorage
- Quick access to trending movies

**Files:**
- `src/api/searchApi.js` - API endpoints
- `src/services/searchService.js` - Service layer
- `src/hooks/search/useSearch.js` - React hook for search

### 2. **Similar Movies Recommendation**
- Fetch similar movies based on any movie
- Displayed in a responsive grid
- Genre-based recommendations using TMDB's similar endpoint

**Files:**
- `src/hooks/search/useSimilarMovies.js` - Hook to fetch similar movies
- `src/components/search/SimilarMoviesSection.jsx` - Display component

### 3. **Interactive Recommendation Modal**
- Clicking on any search result opens a modal
- Shows the selected movie's details
- Displays up to 6 similar movies below
- Easy navigation to view full details

**Files:**
- `src/components/search/RecommendationModal.jsx` - Modal component
- `src/styles/RecommendationModal.scss` - Modal styling

### 4. **Movie Details Integration**
- Show similar movies on the movie details page
- Additional section for related content discovery
- Seamless navigation between similar movies

**Files:**
- `src/pages/MovieDetailsPage.jsx` - Enhanced with similar movies

---

## How It Works

### Search Flow
```
1. User types in search bar
   ↓
2. Search is sent to TMDB API via backend
   ↓
3. Results are displayed as movie cards
   ↓
4. User clicks on a movie card
   ↓
5. RecommendationModal opens with:
   - Selected movie details
   - Similar movies carousel
   ↓
6. User can view full details or explore similar movies
```

### Recommendation Algorithm
The system uses TMDB's built-in similarity algorithm which considers:
- Genre overlap
- Plot similarity
- User ratings and popularity
- Content metadata

---

## Component Structure

### RecommendationModal
**Props:**
```javascript
{
  movie: Object,              // Selected movie data
  similarMovies: Array,       // Array of similar movies
  loading: Boolean,           // Loading state
  onClose: Function           // Callback to close modal
}
```

**Usage:**
```jsx
<RecommendationModal 
  movie={selectedMovie}
  similarMovies={similarMovies}
  loading={isLoading}
  onClose={handleClose}
/>
```

### SimilarMoviesSection
**Props:**
```javascript
{
  movies: Array,              // List of similar movies
  loading: Boolean,           // Loading state
  error: String,             // Error message if any
  title: String              // Section title (default: "Similar Movies")
}
```

**Usage:**
```jsx
<SimilarMoviesSection 
  movies={similarMovies}
  loading={similarLoading}
  error={similarError}
  title="Similar Movies"
/>
```

---

## Hooks

### useSimilarMovies
Fetches similar movies for a given movie ID.

```javascript
const { movies, loading, error } = useSimilarMovies(movieId);
```

**Returns:**
- `movies` - Array of similar movies
- `loading` - Boolean indicating fetch state
- `error` - Error message if fetch fails

### useSearch
Performs multi-source search across movies, TV shows, and people.

```javascript
const { movies, loading, error } = useSearch(query);
```

**Returns:**
- `movies` - Array of search results
- `loading` - Boolean indicating fetch state
- `error` - Error message if fetch fails

---

## Styling

All components come with responsive SCSS styling:
- **RecommendationModal.scss** - Modal styling with animations
- **SimilarMoviesSection.scss** - Grid layout for similar movies
- Mobile-friendly design with breakpoints at 768px and 480px

---

## API Endpoints Used

### Backend Routes
```
GET /api/search?query={query}           // Search across all types
GET /api/movies/{id}/similar            // Get similar movies
GET /api/movies/{id}/recommendations    // Get recommendations
```

### TMDB Integration
The backend uses TMDB's endpoints:
```
GET /search/multi?query={query}         // Multi-search
GET /movie/{id}/similar                 // Similar movies
GET /movie/{id}/recommendations         // Recommendations
```

---

## State Management

### SearchPage
```javascript
const [query, setQuery]                           // Current search text
const [selectedMovieForRecommendation, setSelectedMovieForRecommendation] // Modal state
const [recentSearches, setRecentSearches]        // Search history
```

### MovieDetailsPage
```javascript
const [similarMovies, loading, error] = useSimilarMovies(id)  // From hook
```

---

## Local Storage
Recent searches are stored in localStorage:
- Key: `recentSearches`
- Value: JSON array of last 5 searches
- Persists across browser sessions

---

## Performance Optimizations

1. **Memoization** - useCallback for handlers prevents unnecessary re-renders
2. **Lazy Loading** - Similar movies load only when needed
3. **Timeout Prevention** - 10-second timeout on search requests
4. **Image Optimization** - Fallback placeholder for missing images
5. **Grid Layout** - CSS Grid for responsive carousels

---

## Error Handling

- Timeout handling for slow API requests
- Fallback UI for missing images
- Error messages for failed API calls
- Empty state messages when no results found
- Graceful degradation for missing data

---

## Future Enhancements

1. **User Ratings** - Save and display user ratings for movies
2. **Watchlist** - Add/remove movies from watchlist
3. **Advanced Filters** - Filter by year, rating, genre
4. **Trending Predictions** - Show trending searches
5. **Social Sharing** - Share recommendations with friends
6. **Machine Learning** - Personalized recommendations based on watch history
7. **Voice Search** - Search by voice input
8. **Save Recommendations** - Bookmark favorite recommendations

---

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Proper color contrast ratios
- Semantic HTML structure
- Screen reader friendly

---

## Testing

Example test cases to implement:

```javascript
// useSimilarMovies.test.js
describe('useSimilarMovies', () => {
  it('should fetch similar movies for a given ID', () => {
    // Test implementation
  });
  
  it('should handle errors gracefully', () => {
    // Test implementation
  });
});

// RecommendationModal.test.jsx
describe('RecommendationModal', () => {
  it('should display movie details and similar movies', () => {
    // Test implementation
  });
  
  it('should close modal on close button click', () => {
    // Test implementation
  });
});
```

---

## Deployment Notes

Ensure environment variables are set:
```
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

The recommendation system will work with any backend that implements these endpoints:
- `/search?query={query}`
- `/movies/{id}/similar`
- `/movies/{id}/recommendations`

---

## Support

For issues or improvements, please refer to:
- TMDB API Documentation: https://www.themoviedb.org/settings/api
- React Documentation: https://react.dev
- Backend API Routes: See `Backend/src/routes/movie.routes.js`

