import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const OpenSearch = (props) => {

  let books = props.books
  console.log(books)
    return (
    <div className="open-search">
          <Link  
          to={{
            pathname: "/search",
            state:"teste"
            
          }}
          
          onClick={Search} > 
            <button></button> 
          </Link>
    </div>
    )

}

export default OpenSearch