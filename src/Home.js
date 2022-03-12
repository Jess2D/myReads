import React, { useState, useEffect } from "react";
import * as BooksAPI from "./utils/BooksAPI";
import ListBooks from "./ListBooks";
import OpenSearch from "./OpenSearch";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [wantToRead, setwantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [currentlyReading, setcurrentlyReading] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  useEffect(() => {
    const listWantRead = books.filter((book) => book.shelf === "wantToRead");
    setwantToRead(listWantRead);

    const listCurrentlyReading = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    setcurrentlyReading(listCurrentlyReading);

    const listRead = books.filter((book) => book.shelf === "read");
    setRead(listRead);
  }, [books]);

  const updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        setBooks(books);
      });
    });
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <ListBooks
          bookshelfTitle={"Want to read"}
          books={wantToRead}
          changeAllBooks={setBooks}
          allBooks={books}
          updateBook={updateBook}
        />
        <ListBooks
          bookshelfTitle={"Currently Reading"}
          books={currentlyReading}
          changeAllBooks={setBooks}
          allBooks={books}
          updateBook={updateBook}
        />
        <ListBooks
          bookshelfTitle={"Read"}
          books={read}
          changeAllBooks={setBooks}
          allBooks={books}
          updateBook={updateBook}
        />
      </div>
      <OpenSearch books={books} />
    </div>
  );
};

export default Home;
