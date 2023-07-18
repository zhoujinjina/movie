import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Loading from "../../components/loading/Loading";

let filters = {};

const sortByData = [
    { value: "popularity.desc", label: "受欢迎程度降序" },
    { value: "popularity.asc", label: "受欢迎程度升序" },
    { value: "vote_average.desc", label: "评分降序" },
    { value: "vote_average.asc", label: "评分升序" },
    {
        value: "primary_release_date.desc",
        label: "发行日期降序",
    },
    { value: "primary_release_date.asc", label: "行日期升序" },
    { value: "original_title.asc", label: "标题字母顺序" },
];

const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const { mediaType } = useParams();

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(
            `/discover/${mediaType}?page=${pageNum}`,
            filters
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
        filters = {};
        setData(null);
        setPageNum(1);
        setSortBy(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
        if (action.name === "sortBy") {
            setSortBy(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        fetchInitialData();
    };

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "电影"
                            : "电视剧"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="类型"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortBy"
                            value={sortBy}
                            options={sortByData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="排序方式"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {loading && <Loading initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Loading />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                抱歉，未找到相关结果
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;