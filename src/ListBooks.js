import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import './App.css'
import escapeRegExp from 'escape-string-regexp'


class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeBook: PropTypes.func.isRequired
      }

      state = {
        query: ''
      }
    
      updateQuery = (query) => {
        this.setState({ query: query.trim() })
      }
    
      clearQuery = () => {
        this.setState({ query: '' })
      }

render(){

    const { books, onChangeBooks } = this.props
    const { query } = this.state
    let showingBooks

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    } else {
        showingBooks = books
    }

    console.log(showingBooks)

    return(
    
        <div className="list-books">
                    <div className="list-books-title">
                    <h1>MyReads</h1>
                    </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                    <li>
                                        <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                                            <div className="book-shelf-changer">
                                            <select>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                            </div>
                                        </div>
                                        <div className="book-title">To Kill a Mockingbird</div>
                                        <div className="book-authors">Harper Lee</div>
                                        </div>
                                    </li>
                                    </ol>
                                </div>
                    </div>   
                </div>
            </div>
        </div>
    )
}

}

export default ListBooks