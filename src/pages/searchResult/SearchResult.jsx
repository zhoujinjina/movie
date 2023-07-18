import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.scss";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Loading from "../../components/loading/Loading";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  // 获取搜索后第一页的电影数据
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(
      `/search/multi?query=${query}&page=${pageNum}&language=zh-CN`
    ).then((res) => {
      setData(res);
      setPageNum((page) => page + 1);

      setLoading(false);
    });
  };
  // 加载后面的数据
  const fetchNextPageData = () => {
    fetchDataFromApi(
      `/search/multi?query=${query}&page=${pageNum}&language=zh-CN`
    ).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    // setPageNum(1);
    fetchInitialData();
  }, [query]);
  console.log(data);
  return (
    <div className="searchResultsPage">
      {loading && <Loading initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`搜索到${data.total_results}个与“${query}”相关的结果`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Loading />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <>
              <span className="resultNotFound">
                抱歉，未找到与“{query}”相关的结果！
              </span>
              <div className="resultNotFoundImg">
                <img src={noResults} alt="" />
              </div>
            </>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
