import React, { Component  } from "react";
import PropTypes from "prop-types";
import "./App.css";

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBooks: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired
  };

 
  
  state = {
    value: "",
  };

  handleClick = (e) => {
    this.setState({value: e.target.value});
    console.log(this.state.value)
    console.log("teste")

  }
   
 
  render() {
    let  { books, status, onChangeBooks} = this.props;
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.value = status
    console.log(books);
    console.log(this.state.value)

    return (
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{status}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  { 
                    books.filter(e => e.shelf===status).map((book) => {
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
                                value={this.state.value} 
                                onChange={() => this.handleClick}
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