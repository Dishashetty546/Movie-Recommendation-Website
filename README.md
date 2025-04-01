# Movie & Book Recommender

## Overview
This is a Next.js-based application that provides recommendations for popular movies and books. It allows users to search, filter, and mark their favorite movies and books. User authentication is managed using NextAuth.js.

## Features
- Displays popular movies from TMDB API.
- Fetches programming-related books from Open Library.
- User authentication with NextAuth.js.
- Search and filter functionality for movies and books.
- Favorite movies and books feature using local storage.

## Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Authentication:** NextAuth.js
- **APIs:** TMDB API (Movies), Open Library API (Books)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/movie-book-recommender.git
   cd movie-book-recommender
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file and add the following:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Usage
- Users can browse and search for movies and books.
- Logged-in users can mark items as favorites.
- Filter movies based on genre, year, and rating.
- Authentication is required for accessing favorite lists.

## Deployment
To deploy the project on Vercel:
```sh
vercel deploy
```

## Issues & Contributions
If you find any issues or want to contribute:
- Fork the repository.
- Create a new branch: `git checkout -b feature-branch`.
- Commit changes and push: `git push origin feature-branch`.
- Open a pull request.

## License
This project is licensed under the MIT License.
