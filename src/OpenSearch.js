import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const OpenSearch = (props) => {

    return (
    <div className="open-search">
          <Link to="/search" onClick={Search}> 
            <button></button> 
          </Link>
    </div>
    )

}

export default OpenSearch