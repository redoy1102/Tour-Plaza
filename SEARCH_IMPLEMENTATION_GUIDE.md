# Search Feature Implementation Guide

## 🎯 Overview

This implementation uses **RTK Query** (Redux Toolkit Query) for efficient API state management with automatic caching, request deduplication, and optimistic updates.

## 📁 Frontend Implementation

### Files Created:

1. **src/Redux/store.ts** - Redux store configuration
2. **src/Redux/api/searchApi.ts** - RTK Query API slice for search
3. **src/Redux/hooks.ts** - Typed Redux hooks
4. **src/components/landingPage/Header/SearchModal.tsx** - Search results modal
5. **src/components/landingPage/Header/SearchBar.tsx** - Updated with search logic

### Key Features:

✅ **Debouncing** - 500ms delay to prevent excessive API calls
✅ **Loading states** - Shows spinner while searching
✅ **Error handling** - Graceful error messages
✅ **Empty states** - User-friendly "no results" message
✅ **Modal UI** - Beautiful animated modal with search results
✅ **RTK Query caching** - Automatic request caching and deduplication

## 🔧 Environment Setup

### Frontend (.env file):

Create a `.env` file in your project root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🚀 Backend Implementation

### Setup Instructions:

#### 1. Create Backend Directory

```bash
mkdir server
cd server
npm init -y
```

#### 2. Install Dependencies

```bash
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```

#### 3. Directory Structure

```
server/
├── models/
│   └── Course.js
├── routes/
│   └── courseRoutes.js
├── scripts/
│   └── seedCourses.js
├── .env
├── server.js
└── package.json
```

#### 4. Files to Copy

Copy the following files from `backend-examples/` to your `server/` directory:

- `Course.js` → `server/models/Course.js`
- `courseRoutes.js` → `server/routes/courseRoutes.js`
- `server.js` → `server/server.js`
- `seedCourses.js` → `server/scripts/seedCourses.js`
- `.env.example` → `server/.env` (and update with your MongoDB URI)

#### 5. Start Backend

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 📊 Search Algorithm

The backend uses **MongoDB regex search** with case-insensitive matching on:

- Course title
- Course category
- Course description

### For Better Performance (Large Datasets):

Use MongoDB's **text index** for full-text search (already included in Course model):

```javascript
// Search using text index (better for large datasets)
const courses = await Course.find(
  { $text: { $search: searchTerm } },
  { score: { $meta: "textScore" } }
)
  .sort({ score: { $meta: "textScore" } })
  .limit(20);
```

## 🎨 How It Works

### User Flow:

1. User types in search bar
2. After 500ms of no typing (debounce), search triggers
3. API call made to backend
4. Results displayed in beautiful modal
5. User clicks "বিস্তারিত দেখুন" → redirects to course details

### Technical Flow:

```
SearchBar Component
  ↓ (user types)
useState (searchTerm)
  ↓ (500ms debounce)
useLazySearchCoursesQuery (RTK Query)
  ↓ (API call)
Backend /api/courses/search?q=term
  ↓ (MongoDB search)
Results returned
  ↓
SearchModal displays results
  ↓ (user clicks)
Navigate to course details
```

## 🔍 API Endpoint

**GET** `/api/courses/search?q={searchTerm}`

### Response Format:

```json
{
  "success": true,
  "count": 5,
  "courses": [
    {
      "_id": "...",
      "title": "ওয়েব ডেভেলপমেন্ট",
      "category": "webDevelopment",
      "description": "...",
      "price": 5000
      // ... other fields
    }
  ]
}
```

## 🎯 Next Steps

### 1. Database Setup:

```bash
# Install MongoDB locally or use MongoDB Atlas
# Update .env with your MongoDB URI
```

### 2. Seed Database:

```bash
cd server
npm run seed
```

### 3. Test Search:

- Start backend: `npm run dev` (in server folder)
- Start frontend: `npm run dev` (in project root)
- Type in search bar and watch the magic! ✨

## 🚀 Advanced Features (Optional Enhancements):

### 1. Fuzzy Search

Install `fuse.js` for fuzzy matching:

```bash
npm install fuse.js
```

### 2. Search History

Store recent searches in localStorage

### 3. Search Suggestions

Add autocomplete as user types

### 4. Analytics

Track popular search terms

### 5. Filters

Add filters by category, price range, duration

## 📝 Notes

- **RTK Query** automatically handles caching, so repeated searches are instant
- Debouncing prevents API spam and improves UX
- Modal closes on backdrop click or X button
- Search requires minimum 2 characters
- Results limited to 20 courses for performance

## 🛠️ Troubleshooting

### Issue: "Cannot find module 'react-redux'"

```bash
npm install react-redux @reduxjs/toolkit
```

### Issue: CORS errors

Make sure backend CORS is configured with your frontend URL in `.env`

### Issue: MongoDB connection failed

Check your MongoDB URI in `.env` and ensure MongoDB is running

## 🎉 You're Done!

Your search feature is now fully functional with modern best practices! 🚀
