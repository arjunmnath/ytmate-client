import React, { useState, useEffect } from "react";
import Video from "./Video";
import SearchBar from './SearchBar'
import '../css/Videos.css';

export default function Videos({ match }) {
 

  const [items, setItems] = useState([]);
  useEffect(() => {
    const retriveData = async () => {
    const API_KEY = "AIzaSyAUfiwA7mKKrYSOQk0EEa5BDX-I5RAiD2E";
    // const API_KEY = "AIzaSyCo1CHGYfz9vMUn5YGFBf_KYzh32aPJh7M";
      const temp = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${match.params.q}&type=video&key=${API_KEY}`
      );
      const data = await temp.json();
      // const jsonString = JSON.stringify(data);
      setItems(data.items);
    };
    retriveData()
    
  }, [match.params.q]);
  document.title= `'${match.params.q}' - Search`;
  return <div className="search-result-page">
    <SearchBar/>
    <div className='videoList'>
    {items && items.map((item) => <Video item={item} key={item.etag}  />)}
    </div>
    </div>;
}
