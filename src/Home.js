import React, {useState,useEffect } from "react";
import * as BooksAPI from "./utils/BooksAPI";
import ListBooks from "./ListBooks";
import OpenSearch from "./OpenSearch"

const Home = () => {


  const [books, setBooks] = useState([])
  const [wantToRead, setwantToRead] = useState([])
  const [read,setRead] = useState([])
  const [currentlyReading, setcurrentlyReading] = useState([])



  useEffect(() => {
    BooksAPI.getAll()
    .then((books) => {
        setBooks(books) ;
        books.map(book =>  BooksAPI.update(book, book.shelf)) 
        console.log(books)

      const listWantRead =  books.filter(book=> book.shelf ==="wantToRead")
      setwantToRead(listWantRead)
      
      const listCurrentlyReading = books.filter(book => book.shelf === "currentlyReading")
      setcurrentlyReading(listCurrentlyReading)
      
      const listRead = books.filter(book => book.shelf === "read")
      setRead(listRead)
        })
  }, [books]);


  


    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
      
          <ListBooks
            bookshelfTitle={"Want to read"}
            books={wantToRead}
          />
          <ListBooks
            bookshelfTitle={"Currently Reading"}
            books={currentlyReading}
          />
          <ListBooks
            bookshelfTitle={"Read"}
            books={read}
          />
        </div>
        <OpenSearch /> 
      </div>   
    );
  }


export default Home;
