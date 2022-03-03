import React, {Component} from "react";
import * as BooksAPI from './utils/BooksAPI'
import ListBooks from './ListBooks'


class Home extends Component {

  state = {
    books : [],
    shelf: "",
  
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook(book, newShelf, id) {
    BooksAPI.update(book,newShelf).then(() => {
      let elementsIndex = this.state.books.findIndex(element => element.id === id)
      let newArray = [...this.state.books]
      newArray[elementsIndex] = {...newArray[elementsIndex], shelf : newShelf}
      this.setState({books: newArray })
      this.setState({shelf: newShelf})
    })
  }

  render(){
    return (
      <div className="app"> 
            <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
          <ListBooks
            onChangeBooks={(book,newShelf, id) => this.updateBook(book,newShelf,id)}
            books={this.state.books}
            status="read"
          />
          <ListBooks
            onChangeBooks={(book,newShelf, id) => this.updateBook(book,newShelf, id)}
            books={this.state.books}
            status="currentlyReading"
          />
          <ListBooks
            onChangeBooks={(book,newShelf, id) => this.updateBook(book,newShelf,id)}
            books={this.state.books}
            status="wantToRead"
          />
          </div>
      </div>
    )
  }


}

export default Home;