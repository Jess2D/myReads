import React from "react";
import "./App.css";
import Book from "./Book";


const  ListBooks = (props) =>  {

  
  console.log(props.allBooks)

  const list  = props.books.map(book => {
        return (  
          <li key={book.id} className="item">
          
            <Book  book={book}  id={book.id} updateBook={props.updateBook}/>
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
