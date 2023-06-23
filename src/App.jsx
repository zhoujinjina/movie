import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/counterSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/404/pageNotFound/PageNotFound";
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    apiTest();
  }, []);
  const apiTest = () => {
    fetchDataFromApi("/movie/popular").then((data) => {
      console.log(data);
      dispatch(getApiConfiguration(data));
    });
  };
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
