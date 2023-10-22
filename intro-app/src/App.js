import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=dd6ab67c";

const App = () => {
 

  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState("");

  const searchMovies = async (word) => {
    const response = await fetch(`${API_URL}&s=${word}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  return (
    <>
      <div className="app">
        <h1>MovieLand</h1>

        <div className="search">
          <input
            placeholder="Search for movies..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => {
              searchMovies(keyword);
            }}
          />
        </div>

        {movies.length > 0 ? (
          <div className="container">
            {movies.map((movie) => {
                return (<MovieCard movie={movie}/>)
            })}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found.</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
