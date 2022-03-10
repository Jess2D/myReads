import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./utils/BooksAPI";
import Home from "./Home";
import EmptyState from "./EmptyState";
import Book from "./Book";

const Search = (props) => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  console.log(results);



  useEffect(() => {
    const search = async () => {
      BooksAPI.search(term).then((data) => !!data && data.length ? setResults(data) : setResults([]));
    };
    if (term && !results.length) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);




  const renderedResults = results.map((result) => {
    return (
      <li key={result.id} className="item">
        <Book  book={result}  list={results} changeList={setResults}/>
      </li>
    );
  });

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" onClick={Home}>
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{results.length ? renderedResults : <EmptyState />}</ol>
        </div>
      </div>
    </div>
  );
};

export default Search;
