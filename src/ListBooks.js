import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";
import escapeRegExp from "escape-string-regexp";

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBook: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  render() {
    const { books, onChangeBooks } = this.props;
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
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">book.shelf</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {showingBooks.map((book) => {
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
                                onChange={() =>
                                  onChangeBooks(book.title, book.shelf)
                                }
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
      </div>
    );
  }
}
export default ListBooks;
