
# Netflix-like Movies App (React + TypeScript)

A simple, clean, and responsive movies web app using React, TypeScript, and The Movie Database (TMDB) API. The UI is inspired by Netflix, with grid/list views, skeleton loading, and smooth navigation.

## Features

- Browse "Now Playing" and "Top Rated" movies
- Search for movies by name
- Switch between grid and list view
- Movie detail page with more info
- Responsive design for desktop and mobile
- Skeleton loading for better UX
- Pagination with Prev/Next buttons
- Clean, maintainable code (TypeScript, SCSS modules, lodash)

## Demo

![screenshot placeholder]

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/your-username/netflix-movies-app.git
cd netflix-movies-app
```

### 2. Install dependencies

Make sure you have [Node.js](https://nodejs.org/) installed (v16+ recommended).

```
npm install
```

### 3. Get a TMDB API Key

- Go to [TMDB](https://www.themoviedb.org/) and sign up for a free account
- Navigate to your account settings > API > Create an API key
- Copy your API key

### 4. Set up environment variables

Create a `.env` file in the root folder and add:

```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### 5. Start the development server

```
npm run dev
```

The app will be running at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Build for Production

```
npm run build
```

## Project Structure

- `src/components/` — React components (MovieList, TabBar, etc.)
- `src/pages/` — Page components (MovieDetail, Home, etc.)
- `src/services/` — API logic and types
- `src/styles/` — SCSS modules and main styles

## Customization

- All styles use SCSS modules for easy editing
- You can change the color theme in `src/styles/main.scss`
- Add more features as you like!

## Credits

- [TMDB API](https://www.themoviedb.org/documentation/api)
- Netflix for UI inspiration

---

Feel free to fork, modify, and use this project for learning or your own portfolio.

---

If you have any issues or suggestions, just open an issue or PR. Enjoy coding!
