"use client";
import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useSession, signIn, signOut } from "next-auth/react";

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [favorites, setFavorites] = useState([]);
  const { data: session } = useSession();
  const pathname = usePathname(); // Correct usage of usePathname()

  useEffect(() => {
    async function fetchData() {
      try {
        const movieRes = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_TMDB_API_KEY"
        );
        const movieData = await movieRes.json();
        setMovies(movieData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.some((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <nav className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Movie Recommendations</h1>
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded bg-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-3 py-1 rounded bg-gray-700 text-white"
            onChange={(e) => setFilterGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
            <option value="27">Horror</option>
          </select>
          <input
            type="number"
            placeholder="Year"
            className="px-3 py-1 rounded bg-gray-700 text-white"
            onChange={(e) => setFilterYear(e.target.value)}
          />
          <input
            type="number"
            placeholder="Rating"
            className="px-3 py-1 rounded bg-gray-700 text-white"
            onChange={(e) => setFilterRating(e.target.value)}
          />
          <Link href="/favorites" className="px-4 py-2 bg-blue-600 rounded">
            Favorites
          </Link>
          {session ? (
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-600 rounded"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-green-600 rounded"
            >
              Sign In
            </button>
          )}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h2 className="text-2xl font-semibold mb-3">Movies</h2>
          {loading ? (
            <p>Loading movies...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {movies
                .filter(
                  (movie) =>
                    movie.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) &&
                    (!filterGenre ||
                      movie.genre_ids.includes(Number(filterGenre))) &&
                    (!filterYear ||
                      new Date(movie.release_date).getFullYear().toString() ===
                        filterYear) &&
                    (!filterRating || movie.vote_average >= filterRating)
                )
                .map((movie) => (
                  <div key={movie.id} className="bg-gray-800 p-3 rounded-lg">
                    <Link href={`/movie/${movie.id}`}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        width={150}
                        height={200}
                        className="rounded"
                      />
                    </Link>
                    <h3 className="text-lg font-medium mt-2">{movie.title}</h3>
                    <p>Rating: {movie.vote_average}</p>
                    <button
                      className="mt-2 px-3 py-1 bg-blue-600 rounded text-white"
                      onClick={() => toggleFavorite(movie)}
                    >
                      {favorites.some((fav) => fav.id === movie.id)
                        ? "Unfavorite"
                        : "Favorite"}
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </FavoritesContext.Provider>
  );
}
