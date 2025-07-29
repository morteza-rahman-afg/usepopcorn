import { useState, useEffect } from "react";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const Key = "f1b40931";
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${Key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("There was a problem fetching data.");
          const data = await res.json();
          if (data.Response === "False") throw new Error("movies not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "abortError") {
            setError(err.message);
          }
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
