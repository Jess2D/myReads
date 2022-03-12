import React, { useState, useEffect } from "react";
import "./App.css";
import * as BooksAPI from "./utils/BooksAPI";
import Home from "./Home";
import EmptyState from "./EmptyState";
import Book from "./Book";
import { Link } from "react-router-dom";

const Search = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    BooksAPI.search(term).then((resultsFromAPI) => {
      if (!!resultsFromAPI && resultsFromAPI.length) {
        // TODO Check if books on shelf before setting results
        // ...
        BooksAPI.getAll().then((books) => {
          const newResultsArray = resultsFromAPI.map((bookResult) => {
            const bookFound = books.find((book) => book.id === bookResult.id);
            console.log("Iterate through Book Results", bookResult);
            return bookFound || bookResult;
          });
          console.log("resultado final", newResultsArray);
          setResults(newResultsArray);
        });

      } else {
        setResults([]);
      }
    });
  };

  useEffect(() => {
    if (term) {
      search();
    } else {
      setResults([]);
    }
  }, [term]);

  const renderedResults = results.map((book) => {
    return (
      <li key={book.id} className="item">
        <Book book={book} serchedBooks={results} changeList={setResults} />
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
          <ol className="books-grid">
            {results.length ? renderedResults : <EmptyState />}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Search;
