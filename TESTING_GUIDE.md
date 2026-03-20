# User Search History - Testing Guide

## 🧪 Quick Test (5 Minutes)

### Prerequisites
- Application running locally or deployed
- User account created
- Search page accessible

### Test Steps

#### Step 1: Login
1. Open application
2. Click Login
3. Enter credentials
4. Click Submit
5. **Verify:** You see "Welcome, [username]" and navbar shows logout button

#### Step 2: Go to Search Page
1. Click on Search in navigation
2. **Verify:** You see search input box and "Recent Searches" if you have any

#### Step 3: Perform First Search
1. Type "Marvel" in search box
2. Press Enter
3. **Verify:** 
   - Search results appear
   - "Marvel" appears in "Your Saved Searches" (NEW section!)
   - "Marvel" appears in "Recent Searches" as well

#### Step 4: Perform Second Search
1. Type "Sci-Fi" in search box
2. Press Enter
3. **Verify:**
   - Search results appear
   - "Sci-Fi" appears at top of "Your Saved Searches"
   - Count shows (2)

#### Step 5: Click Saved Search
1. Click on "Marvel" in "Your Saved Searches"
2. **Verify:**
   - Search results for Marvel appear instantly

#### Step 6: Refresh Page
1. Press F5 or Cmd+R
2. **Verify:**
   - "Your Saved Searches" shows both searches
   - Searches are still there (not lost!)

#### Step 7: Logout and Login Again
1. Click Logout button
2. See "Your Saved Searches" disappears
3. Click Login again
4. **Verify:**
   - "Your Saved Searches" reappears
   - All previous searches are there!

#### Step 8: Non-Logged-In Search
1. Logout
2. Search for "Action"
3. **Verify:**
   - No "Your Saved Searches" section
   - Only "Recent Searches" from localStorage
   - Search still works

---

## 🔍 Detailed Testing

### Backend API Testing

#### 1. Test Save Endpoint
```bash
# Using Postman or Terminal

# Step 1: Get login token (if using JWT auth)
# Most systems will have token in cookie

# Step 2: POST to save endpoint
POST /api/auth/search-history
Header: Cookie: token=<your_token>
Body: {
  "query": "Avatar"
}

# Expected Response:
{
  "message": "Search saved successfully",
  "searchHistory": [
    {
      "_id": "123abc...",
      "query": "Avatar",
      "createdAt": "2024-12-12T10:30:00Z"
    }
  ]
}
```

#### 2. Test Get Endpoint
```bash
GET /api/auth/search-history
Header: Cookie: token=<your_token>

# Expected Response:
{
  "message": "Search history retrieved successfully",
  "searchHistory": [
    {
      "_id": "123abc...",
      "query": "Avatar",
      "createdAt": "2024-12-12T10:30:00Z"
    },
    {
      "_id": "456def...",
      "query": "Iron Man",
      "createdAt": "2024-12-11T15:45:00Z"
    }
  ]
}
```

#### 3. Test Delete Endpoint
```bash
DELETE /api/auth/search-history/123abc...
Header: Cookie: token=<your_token>

# Expected Response:
{
  "message": "Search deleted successfully",
  "searchHistory": [
    {
      "_id": "456def...",
      "query": "Iron Man",
      "createdAt": "2024-12-11T15:45:00Z"
    }
  ]
}
```

### Frontend Component Testing

#### 1. Check Hook Is Working
```javascript
// In browser console on Search page
// Check that user is logged in
console.log(document.querySelector('nav')?.innerHTML)
// Should show username or logout button

// Check that searched items appear in saved searches
// Do a search and look at DOM
console.log(document.querySelector('.saved-searches'))
// Should exist if logged in and have searches
```

#### 2. Check Network Requests
1. Open Developer Tools (F12)
2. Go to Network tab
3. Search for "Sci-Fi"
4. **Verify:**
   - POST request to `/api/auth/search-history`
   - Status 200 (success)
   - Response includes searchHistory array

5. Refresh page
6. **Verify:**
   - GET request to `/api/auth/search-history`
   - Status 200 (success)
   - Returns all saved searches

#### 3. Check Local Storage
1. Open Developer Tools (F12)
2. Go to Application tab
3. Find Local Storage
4. Find 'recentSearches' key
5. **Verify:**
   - Still contains recent searches
   - Independent of database searches

### Database Testing

#### 1. Check MongoDB (Locally)
```bash
# Connect to MongoDB
mongo

# Select your database
use movie_db

# View user document
db.users.findOne({email: "your@email.com"})

# Look for searchHistory field - should see array of searches
# Example:
{
  "_id": ObjectId("..."),
  "username": "john",
  "email": "your@email.com",
  "searchHistory": [
    {
      "_id": ObjectId("..."),
      "query": "Marvel",
      "createdAt": ISODate("2024-12-12T10:30:00Z")
    }
  ]
}
```

#### 2. Check Limit (50 searches)
```bash
# After saving 51 searches, verify only 50 are stored
db.users.findOne({email: "your@email.com"}).searchHistory.length
# Should return 50

# The oldest search should be removed automatically
```

---

## ✅ Verification Checklist

### UI Verification
- [ ] "Your Saved Searches" appears only when logged in
- [ ] "Your Saved Searches" disappears on logout
- [ ] Search count shows correctly
- [ ] Star icon (⭐) shows for saved searches
- [ ] Clock icon (⏱️) shows for recent searches
- [ ] Date displays correctly (e.g., "12/12/2024")
- [ ] Clicking saved search re-runs it
- [ ] Hover effects work smoothly
- [ ] Mobile view looks good

### Functionality Verification
- [ ] Searches saved to database (not just localStorage)
- [ ] Old searches appear after page refresh
- [ ] Searches persist after logout/login
- [ ] Max 50 searches enforced
- [ ] Date shows when search was performed
- [ ] Non-logged-in users see no saved searches
- [ ] localStorage still works as backup
- [ ] No errors in browser console

### Data Verification
- [ ] Each search has unique MongoDB _id
- [ ] createdAt timestamp is correct
- [ ] Query text matches what was searched
- [ ] Array is sorted newest first
- [ ] Old searches removed when limit exceeded

---

## 🐛 Troubleshooting

### "Your Saved Searches" Not Showing
**Possible Causes:**
1. Not logged in - logout and check
2. No searches yet - perform a search
3. Network error - check Network tab
4. Hook not loading - check browser console for errors

**Fix:**
```javascript
// In browser console
// Check if user is logged in
window.AuthContext.user // should show user object
```

### Searches Not Saving
**Possible Causes:**
1. Token expired - logout and login again
2. Backend not running - check server
3. API endpoint down - test POST with curl
4. localStorage taking over - check application tab

**Fix:**
```bash
# Test backend endpoint
curl -X POST http://localhost:5000/api/auth/search-history \
  -H "Cookie: token=<your_token>" \
  -H "Content-Type: application/json" \
  -d '{"query":"test"}'
```

### Old Searches Not Appearing After Login
**Possible Causes:**
1. Database connection issue
2. User._id doesn't match
3. GET request failing

**Fix:**
```javascript
// Check user ID
console.log(user.id)

// Force refetch
const { refetch } = useSavedSearches(user.id)
refetch()
```

### Too Many Searches Accumulated
**Expected Behavior:**
- Only 50 most recent are kept
- Oldest are automatically removed

**To Verify:**
```bash
# Count searches in database
db.users.findOne({email: "test@email.com"}).searchHistory.length
# Should be ≤ 50
```

---

## 📊 Performance Testing

### Expected Response Times
- Save search: <100ms
- Get searches: <50ms
- Delete search: <50ms

**To Measure:**
1. Open Developer Tools Network tab
2. Perform action
3. Check Request/Response time
4. Should be under expectations

### Expected Data Size
- Per search: ~100 bytes
- 50 searches: ~5KB
- Per user storage: minimal impact

---

## 🔐 Security Testing

### Test Authentication
1. **Without Login:**
   ```bash
   curl http://localhost:5000/api/auth/search-history
   # Should return 401 Unauthorized
   ```

2. **With Invalid Token:**
   ```bash
   curl -H "Cookie: token=invalid" \
     http://localhost:5000/api/auth/search-history
   # Should return 401 Unauthorized
   ```

3. **With Valid Token:**
   ```bash
   curl -H "Cookie: token=<valid_token>" \
     http://localhost:5000/api/auth/search-history
   # Should return 200 with data
   ```

### Test User Isolation
1. Login as User A
2. Save search "Marvel"
3. Logout
4. Login as User B
5. Go to Search page
6. **Verify:** 
   - Don't see User A's saved searches
   - Only see User B's searches

---

## 📋 Complete Test Report Template

```
Date: ___________
Tester: ___________
Environment: Local / Production

BACKEND TESTS:
- [ ] POST /api/auth/search-history works
- [ ] GET /api/auth/search-history works  
- [ ] DELETE /api/auth/search-history worked
- [ ] Authentication required (401 without token)
- [ ] Searches limited to 50 items

FRONTEND TESTS:
- [ ] "Your Saved Searches" appears when logged in
- [ ] Searches save automatically
- [ ] Searches persist after refresh
- [ ] Searches persist after logout/login
- [ ] Click saved search re-runs it
- [ ] Styling looks good on mobile/desktop
- [ ] No console errors

DATABASE TESTS:
- [ ] searchHistory field exists in user
- [ ] Searches stored with timestamps
- [ ] Oldest removed when max reached
- [ ] User isolation works

OVERALL RESULT:
[ ] All tests passed - Ready for production
[ ] Some issues - Document and fix
[ ] Major issues - Do not deploy

Notes:
_________________________
```

---

## 🎯 Final Verification

Before considering testing complete:

1. ✅ Can you see saved searches on Search page?
2. ✅ Do saved searches persist after refresh?
3. ✅ Can you click saved search to re-run it?
4. ✅ Do searches disappear when you logout?
5. ✅ Do searches reappear when you login again?
6. ✅ Are there no errors in browser console?

If all yes → **Feature is working correctly!**

---

**Testing Status:** ✅ Ready to Test

Use this guide to verify all functionality is working as expected before deployment.
