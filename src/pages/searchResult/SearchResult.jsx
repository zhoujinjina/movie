import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
import useFetch from "../../hooks/useFetch";
const SearchResult = () => {
  const { query } = useParams();
  const [data,setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState();
  const fetchInitialPageDate =async () => {
    setLoading(true)
    const data=await fetchDataFromApi(`/search/multi?query=${query}&page=${page}`)
    console.log(data)
    setData(data.results)
    setPage(page+1)
    setLoading(false)
  }
  const fetchNextPageData=async () => {
    const nextData=await fetchDataFromApi(`/search/multi?query=${query}&page=${page}`)
    setData([...data,...nextData.results])
    console.log(data)
  }
useEffect(()=>{
  

},[query])
  return (
    <div className="searchResultsPage">
     
    </div>
  );
};

export default SearchResult;
