import { useState, useEffect } from "react";
import React from "react";
import Search from "./Components/Search";
import Spinner from "./Components/Spinner";
import MovieCard from "./Components/MovieCard";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// const API_OPTIONS = {
//   method: "GET",
//   header: {
//     accept: "application/json",
//     authorization: `Bearer ${API_KEY}`,
//   },
// };

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const Timer = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      setTimeout(() => {
        setCount((count) => count + 1);
      }, 5000);
    });

    return <h1>I've rendered {count} times!</h1>;
  };

  //useState
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [debounceTerm, setDebounceTerm] = useState("");

  useDebounce(() => setDebounceTerm(searchTerm), 500, [searchTerm]);

  const fetchMovie1 = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      console.log(response);

      if (data.Response === "False") {
        setErrorMessage(data?.error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.error(`We have an error!!! - ${error}`);
      setErrorMessage("Error Fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie1(debounceTerm);
  }, [debounceTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero Banner"></img>
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2>All movies</h2>
          {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}

          {isloading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
