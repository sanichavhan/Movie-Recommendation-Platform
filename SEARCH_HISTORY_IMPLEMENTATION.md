# User Search History Persistence - Implementation Guide

## Overview

This feature enables **logged-in users** to have their search queries automatically saved to the database, while **unauthenticated users** can still use the search with localStorage-based recent searches.

## Features Implemented

### 1. **Automatic Search Persistence for Logged-in Users**
- When a logged-in user performs a search, the query is automatically saved to their user profile in MongoDB
- Maximum of 50 searches stored per user (automatically enforced on the backend)
- Each search entry includes:
  - Query text
  - Timestamp (createdAt)
  - Unique MongoDB _id

### 2. **Display User Saved Searches**
- Logged-in users see "Your Saved Searches" section with a counter
- Searches are displayed with:
  - Star icon (⭐) to distinguish from recent searches
  - Search query text
  - Date when the search was performed
- Clickable to quickly run the same search again

### 3. **Recent Searches (localStorage fallback)**
- Each user (logged in or not) also has "Recent Searches" in localStorage (as before)
- Limited to 5 most recent searches
- Independent of database persistence
- Has delete/clear button for individual searches

### 4. **Dual Persistence Strategy**
```
Logged-in User:
  ├── Database Searches (persistent, synced across devices)
  └── localStorage (browser-specific, backup)

Unauthenticated User:
  └── localStorage only (no database)
```

---

## Backend Implementation

### 1. **User Model Update** (`src/models/user.model.js`)

```javascript
searchHistory: {
    type: [{
        query: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    default: []
}
```

**Pre-save Middleware:**
- Automatically limits search history to 50 most recent items
- Runs before each user document save
- Prevents database bloat

### 2. **Controller Functions** (`src/controllers/auth.controller.js`)

Three new async functions added:

#### `saveSearchHistory(req, res)`
- **Route:** POST `/api/auth/search-history`
- **Protected:** Yes (requires authentication)
- **Request Body:** `{ query: string }`
- **Response:** `{ message, searchHistory }`
- **Logic:**
  1. Validate authenticated user
  2. Validate query string
  3. Find user by ID
  4. Add new search to beginning of array
  5. Save user document (triggers pre-save middleware)
  6. Return updated search history

#### `getSearchHistory(req, res)`
- **Route:** GET `/api/auth/search-history`
- **Protected:** Yes (requires authentication)
- **Request Body:** None
- **Response:** `{ message, searchHistory: [] }`
- **Logic:**
  1. Validate authenticated user
  2. Find user by ID
  3. Return complete searchHistory array
  4. Sorted by date (most recent first)

#### `deleteSearchHistory(req, res)`
- **Route:** DELETE `/api/auth/search-history/:searchId`
- **Protected:** Yes (requires authentication)
- **Request Params:** `{ searchId: string }`
- **Response:** `{ message, searchHistory: [] }`
- **Logic:**
  1. Validate authenticated user
  2. Find user by ID
  3. Filter out search by MongoDB _id
  4. Save updated document
  5. Return updated history

### 3. **Routes** (`src/routes/auth.route.js`)

```javascript
router.post('/search-history', authMiddleware.authUser, authController.saveSearchHistory)
router.get('/search-history', authMiddleware.authUser, authController.getSearchHistory)
router.delete('/search-history/:searchId', authMiddleware.authUser, authController.deleteSearchHistory)
```

---

## Frontend Implementation

### 1. **API Layer** (`src/api/searchApi.js`)

```javascript
export const saveSearchHistory = async (query) => {
  const response = await axios.post("/auth/search-history", { query })
  return response.data
}

export const getSearchHistory = async () => {
  const response = await axios.get("/auth/search-history")
  return response.data
}

export const deleteSearchHistory = async (searchId) => {
  const response = await axios.delete(`/auth/search-history/${searchId}`)
  return response.data
}
```

### 2. **Service Layer** (`src/services/searchService.js`)

Wrapper functions that call corresponding API functions:
- `saveSearchHistory(query)`
- `getSearchHistory()`
- `deleteSearchHistory(searchId)`

### 3. **Custom Hook** (`src/hooks/search/useSavedSearches.js`)

**`useSavedSearches(userId)` Hook:**

```javascript
const { savedSearches, loading, error, saveSearch, deleteSearch, clearAllSearches, refetch } = useSavedSearches(user?.id)
```

**Returned Object:**
- `savedSearches`: Array of search history objects
- `loading`: Boolean indicating fetch status
- `error`: Error message if any
- `saveSearch(query)`: Function to save a new search
- `deleteSearch(searchId)`: Function to delete a specific search
- `clearAllSearches()`: Function to delete all searches
- `refetch()`: Function to manually refetch searches

**Key Features:**
- Auto-fetches searches when userId changes
- Returns empty array if not authenticated
- Handles all error states gracefully
- Updates UI state immediately after operations

### 4. **SearchPage Integration** (`src/pages/SearchPage.jsx`)

**Added Imports:**
```javascript
import { useSavedSearches } from "../hooks/search/useSavedSearches"
import { AuthContext } from "../context/AuthContext"
```

**In Component:**
```javascript
const { user } = useContext(AuthContext)
const { savedSearches, saveSearch } = useSavedSearches(user?.id)
```

**Modified handleSearchSubmit:**
```javascript
const handleSearchSubmit = (searchQuery) => {
    if (searchQuery.trim()) {
        // Save to database if logged in
        if (user?.id) {
            saveSearch(searchQuery)
        }
        
        // Save to localStorage (for everyone)
        const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
        setRecentSearches(updated)
        localStorage.setItem('recentSearches', JSON.stringify(updated))
        setQuery(searchQuery)
    }
}
```

**UI Changes:**
1. Conditional rendering of "Your Saved Searches" section (only if `user?.id && savedSearches.length > 0`)
2. "Recent Searches" section still shows (from localStorage)
3. Visual distinction:
   - Saved searches: Star icon (⭐), darker gradient
   - Recent searches: Clock icon (⏱️), lighter gradient

### 5. **Styling** (`src/styles/SearchPage.scss`)

**New CSS Classes:**
- `.saved-searches`: Container for saved searches section
- `.saved-searches-header`: Header with title and count
- `.saved-searches-list`: Flex container for items
- `.saved-search-item`: Individual saved search styling

**Visual Features:**
- Gradient background (darker than recent searches)
- Smooth hover effects with color transition
- Search date display
- Responsive layout

---

## User Experience Flow

### For Authenticated Users:

1. **Initial Load:**
   - SearchPage mounts
   - User context checked, userId extracted
   - `useSavedSearches` hook fetches saved searches from DB
   - Both "Your Saved Searches" and "Recent Searches" displayed

2. **On Search:**
   - User types and presses Enter
   - `handleSearchSubmit` called with query
   - If `user?.id` exists: `saveSearch(query)` called
     - API POST to `/api/auth/search-history`
     - UI state updated with new search
   - localStorage also updated (for backup)
   - Search results displayed

3. **Viewing History:**
   - User can click any saved search to re-run it
   - Quick access to frequently searched queries
   - All searches sync across devices

### For Unauthenticated Users:

1. **Initial Load:**
   - SearchPage mounts
   - No user context
   - `useSavedSearches` returns empty array
   - Only "Recent Searches" shown from localStorage

2. **On Search:**
   - Only localStorage is updated
   - No database persistence
   - 5 most recent searches stored locally

---

## API Endpoints Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/auth/search-history` | ✅ | Save a search query |
| GET | `/api/auth/search-history` | ✅ | Retrieve all saved searches |
| DELETE | `/api/auth/search-history/:searchId` | ✅ | Delete specific search |

---

## Error Handling

### Backend Errors:
- `401`: User not authenticated
- `400`: Invalid/missing query
- `404`: User not found or search not found
- `500`: Server error

### Frontend Handling:
- Hook returns `error` state
- API errors caught and logged
- Failed operations don't update UI state
- User gets feedback via error message

---

## Database Schema

### User Document:
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String,
  searchHistory: [
    {
      _id: ObjectId,
      query: String,
      createdAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes Created (Recommended):
```javascript
db.users.createIndex({ "searchHistory.createdAt": -1 })
```

---

## Testing Checklist

### Backend:
- [ ] POST `/api/auth/search-history` saves search
- [ ] GET `/api/auth/search-history` retrieves all searches
- [ ] DELETE `/api/auth/search-history/:id` removes search
- [ ] Unauthenticated requests return 401
- [ ] Search history limited to 50 items
- [ ] Invalid queries return 400

### Frontend:
- [ ] Logged-in users see "Your Saved Searches"
- [ ] Searches are saved on submit
- [ ] Saved searches can be clicked to re-run
- [ ] localStorage still works for backup
- [ ] Unauthenticated users don't see saved searches section
- [ ] Navigation between auth states updates UI
- [ ] Error states handled gracefully

---

## Future Enhancements

1. **Search Analytics:**
   - Track search frequency
   - Show most searched terms
   - Filter by date range

2. **Search Management:**
   - Rename saved searches
   - Create custom tags/collections
   - Share searches with friends
   - Export search history

3. **Smart Recommendations:**
   - Suggest searches based on history
   - Auto-complete from saved searches
   - Trending searches among users

4. **Performance:**
   - Pagination for large histories
   - Only return recent N searches by default
   - Archive old searches

---

## Troubleshooting

### Issue: Searches not saving
**Solution:** 
- Check user is logged in: `console.log(user?.id)`
- Verify auth token is valid
- Check network tab for POST error

### Issue: Old searches not displayed
**Solution:**
- Check MongoDB connection
- Verify user._id matches in requests
- Clear browser cache and refresh

### Issue: Too many searches in database
**Solution:**
- Pre-save middleware limits to 50
- Run database cleanup: `db.users.updateMany({}, {$slice: {searchHistory: 50}})`

---

## Files Modified/Created

### Created:
- `Frontend/src/hooks/search/useSavedSearches.js` (77 lines)

### Modified:
- `Backend/src/models/user.model.js` (+18 lines)
- `Backend/src/controllers/auth.controller.js` (+107 lines)
- `Backend/src/routes/auth.route.js` (+3 lines)
- `Frontend/src/api/searchApi.js` (+33 lines)
- `Frontend/src/services/searchService.js` (+24 lines)
- `Frontend/src/pages/SearchPage.jsx` (+50 lines)
- `Frontend/src/styles/SearchPage.scss` (+120 lines)

**Total Lines Added:** ~432
**Total Files Modified:** 7
**New Files:** 1
