import React, {Component} from "react";
import * as BooksAPI from './utils/BooksAPI'
import ListBooks from './ListBooks'

class App extends Component {

  state = {
    books : []
  }

  componentDidMount() {
    BooksAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  updateBook = (book, shelf) => {
    this.setState((book) => ({
      // eslint-disable-next-line no-undef
      books: state.books.filter((b) => b.id !== book.id)
    }))

    BooksAPI.update(book, shelf)
  }

  render(){
    return (
      <div className="app"> 
          <ListBooks
            onChangeBooks={this.updateBook}
            books={this.state.books}
          />
      </div>
    )
  }


}

export default App;