import React, { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
const HeroBanner = () => {
  const [background,setBackground]=useState('')
  const [query,setQuery]=useState('')
  const navigate=useNavigate()
const searchQueryHandler=(e)=>{
  if(e.key==="Enter"&&query.length>0){
    navigate(`/search/${query}`)
  }
}
  return (
    <div className="heroBanner">
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title">Welcom</span>
          <span className="subTitle">Welcom</span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or a TV show..."
              onChange={(e)=>setQuery(e.target.value)}
              onKeyUp={(e)=>searchQueryHandler(e)}
            />
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
