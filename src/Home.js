import React, { Component } from "react";
import * as BooksAPI from "./utils/BooksAPI";
import ListBooks from "./ListBooks";
import OpenSearch from "./OpenSearch"

class Home extends Component {
  state = {
    books: [],
    shelf: "",
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateBook(book, newShelf) {
    BooksAPI.update(book, newShelf).then((books) => {
      this.setState({ books }); 
      BooksAPI.getAll();
    });
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <ListBooks
            onChangeBooks={(book, newShelf) =>
              this.updateBook(book, newShelf)
            }
            bookshelfTitle={"wantToRead"}
            books={this.state.books}
          />
          <ListBooks
            onChangeBooks={(book, newShelf) =>
              this.updateBook(book, newShelf)
            }
            bookshelfTitle={"currentlyReading"}
            books={this.state.books}
          />
          <ListBooks
            onChangeBooks={(book, newShelf) =>
              this.updateBook(book, newShelf)
            }
            bookshelfTitle={"read"}
            books={this.state.books}
          />
        </div>
        <OpenSearch /> 
      </div>   
    );
  }
}

export default Home;
