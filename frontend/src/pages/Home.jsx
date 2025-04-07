import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [movies, setMovies] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadPopularMovies = async () => {
  //     try {
  //       const popularMovies = await getPopularMovies();
  //       setMovies(popularMovies);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadPopularMovies();
  // }, []);

  const {
    data: movies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies", searchQuery],
    queryFn: () =>
      searchQuery.trim() ? searchMovies(searchQuery) : getPopularMovies(),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    // if (!searchQuery.trim()) return;
    // if (loading) return;

    // setLoading(true);
    // try {
    //   const searchResults = await searchMovies(searchQuery);
    //   setMovies(searchResults);
    //   setError(null);
    // } catch (err) {
    //   setError(err);
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movie"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().startsWith(searchQuery) && (
                <MovieCard key={movie.id} movie={movie} />
              )
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
