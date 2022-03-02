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
    value: this.props.status,
  };

  handleClick = (e,book, id) => {
   let newShelft = e.target.value
    this.setState({value: newShelft});
    this.props.onChangeBooks(book ,newShelft, id )
  }

 
  render() {
    let  { books,status} = this.props;
  
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
                                onChange={(e) => this.handleClick(e,book, book.id)}
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