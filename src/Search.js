import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import "./App.css";
import * as BooksAPI from './utils/BooksAPI'
import Home from "./Home";



 const Search = () => {
    const [term, setTerm] = useState("");
    const [results,setResults] = useState([])
    console.log(results)

    useEffect(() => {
        const search = async () => {
          BooksAPI.search(term).then((data) =>     
          setResults(data))};
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
            <div className="content">
              <div className="header">{result.title}</div>
            </div>
          </li>
        );
    });

    return (
    <div>
        <div className="search-books">
            <div className="search-books-bar">
                <Link to='/' onClick={Home}><button className="close-search" >Close</button></Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input value={term} onChange={(e) =>setTerm(e.target.value)} type="text" placeholder="Search by title or author"/>

                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                    {renderedResults}
                </ol>
            </div>
        </div>
    </div>
    );
 }

 

 export default Search