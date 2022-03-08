import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./utils/BooksAPI";
import Home from "./Home";
import EmptyState from "./EmptyState";

const Search = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [shelf, setShelf] =useState("")
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

  const handleChange = (e, book, id) => {
    let newShelft = e.target.value;
    setShelf(newShelft);
    //nChangeBooks(book, newShelft, id);
  };

  const addBookToShelf = () =>{
      
  }


  const renderedResults = results.map((result) => {
    return (
      <li key={result.id} className="item">
        <div className="book">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${result.imageLinks.thumbnail}")`,
            }}
          />
         <div className="">
             <select
                  value={shelf}   
                  onChange={(e) =>
                    handleChange(e, result, result.id)
                  }     
                >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
                </select>
            </div>
          <div className="book-title">{result.tittle}</div>
          <div className="book-authors">{result.authors}</div>
        </div>
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
