import React, { Component  } from "react";
import PropTypes from "prop-types";
import "./App.css";
import escapeRegExp from "escape-string-regexp";

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBooks: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired
  };


  state = {
    query: "",
  };

 
  render() {
    const { books, status, onChangeBooks} = this.props;
    const { query } = this.state;
    let showingBooks;
    

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingBooks = books.filter((book) => match.test(book.title));
    } else {
      showingBooks = books;
    }
    
    console.log(showingBooks);

    return (
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{status}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  { 
                    showingBooks.filter(e => e.shelf===status).map((book) => {
                    return (
                      <li key={book.id}>
    
                        <div className="book" id={book.id}>
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                              }}
                            />
                            <div className="book-shelf-changer">
                              <select
                                value={book.shelf} 
                                onChange={() => onChangeBooks(book, book.shelf, book.id)}
                            >
                                <option value="move" disabled>
                                  Move to...
                                </option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.tittle}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
export default ListBooks;
