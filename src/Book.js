import React,{useState} from "react";


const Book = (props) => {
    const [shelf, setShelf] = useState(props.bookshelf)
    
    
    const handleChange = (e, book, id) => {
    let newShelft = e.target.value;
    setShelf(newShelft);
    console.log(book)   
 };
    

return (
    <div className="book">
      <div className="book-top">
    <div
      className="book-cover"
      style={{
        width: 128,
        height: 193,
        backgroundImage: `url("${props.book.imageLinks.thumbnail}")`,
      }}
    />
   <div className="book-shelf-changer">
       <select
            value={shelf}   
            onChange={(e) =>
              handleChange(e,props.book, props.book.id)
            }     
          >
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
          </select>
      </div>
      </div>
    <div className="book-title">{props.book.title}</div>
    <div className="book-authors">{props.book.authors}</div>
  </div>  
  )

}


export default Book;