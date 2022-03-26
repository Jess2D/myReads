import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import * as BooksAPI from "./utils/BooksAPI";
import Home from "./Home";
import EmptyState from "./EmptyState";
import Book from "./Book";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";


const Search = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleResults = (resultsFromAPI) => {
    if (!!resultsFromAPI && resultsFromAPI.length) {
      // TODO Check if books on shelf before setting results
      // ...
      BooksAPI.getAll().then((books) => {
        const newResultsArray = resultsFromAPI.map((bookResult) => {
          const bookFound = books.find((book) => book.id === bookResult.id);
          return bookFound || bookResult;
        });
        setResults(newResultsArray);
      });
    } else {
      setResults([]);
    }
  };

  const search = (term) =>
    debounce(async (term) => {
      if (term){
        BooksAPI.search(term).then(handleResults);
      } else {
        setResults([]);
      }
    }, 1000);

  const debsearch = useMemo(search, []);

  useEffect(() => {
      debsearch(term);
  }, [term]);

  const updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
  };

  const renderedResults = results.map((book) => {
    return (
      <li key={book.id} className="item">
        <Book book={book} serchedBooks={results} updateBook={updateBook} />
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
