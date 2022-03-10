import React from "react";
import "./App.css";
import Book from "./Book";


const  ListBooks = (props) =>  {
  

 

  const list  = props.books.filter((book) => book.shelf === props.bookshelfTitle).map((book) => {
        return (  
          <li key={book.id} className="item">
            <Book  book={book}  list={props.books}  bookshelf={props.bookshelfTitle} 
            
            onChangeBooks={(book, newShelf) =>
              props.onChangeBooks(book, newShelf)
            }
            />
          </li>
        );
      });
    

    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{props.bookshelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {list}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default ListBooks;
