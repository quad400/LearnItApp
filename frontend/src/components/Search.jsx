import React, { useState } from "react";
import algoliasearch from "algoliasearch";
import { Link,useNavigate } from "react-router-dom";
import { courseDetail } from "../actions/course";
import {useDispatch} from "react-redux";


const client = algoliasearch("YE198UKSU6", "f4d7908ef1e138c2e40453fc3a9125ae");
const index = client.initIndex("coderblack_Course");

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSearch = async (query) => {
    try {
      const { hits } = await index.search(query);
      console.log(hits)
      setSearchResults(hits);

    } catch (error) {
      console.error("Error searching:", error);
      // Handle error state or display error message to the user
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    handleSearch(value);
  };
  
  const handleClick=(e)=> {
    dispatch(courseDetail(e))
    setSearchQuery("")
    // return 
  }

  return (
    <div className="nav__search">
      <div className="search_box">
        <div className="form">
          <button className="icon" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
          <input
            type="text"
            className="search"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search"
          />
        </div>
      </div>
      {searchQuery !== "" ?
      <ul className="result_search">
        {searchResults.map((result) => (
          <Link onClick={()=>handleClick(result.objectID)} to={`/${result.objectID}`} className="link search_content" key={result.objectID}>
            <p>{result.title}</p>
            <div className="search_content_bottom">
              <small>by {result.user}</small>
              <small>#{result.price}</small>
            </div>
            {/* Display other fields as needed */}
          </Link>
        ))}
      </ul> : <></>}
    </div>
  );
};

export default SearchComponent;
