import React, {Component} from "react";
import * as BooksAPI from './utils/BooksAPI'
import ListBooks from './ListBooks'


class App extends Component {

  state = {
    books : [],
    shelf: ""
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }


  updateBook = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
    }))

    BooksAPI.update(book,shelf)
  }


  render(){
    return (
      <div className="app"> 
            <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
          <ListBooks
            onChangeBooks={this.updateBook}
            books={this.state.books}
            status="read"
          />
          <ListBooks
            onChangeBooks={this.updateBook}
            books={this.state.books}
            status="currentlyReading"
          />
          <ListBooks
            onChangeBooks={this.updateBook}
            books={this.state.books}
            status="wantToRead"
          />
          </div>
      </div>
    )
  }


}

export default App;