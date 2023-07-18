import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const Details = () => {
    const { mediaType, id } = useParams();
    // 获取电影的相关信息
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos?language=zh-CN`);
    //获取该电影的工作人员相关信息
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );
    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            {/* 主要演员 */}
            <Cast data={credits?.cast} loading={creditsLoading} />
            {/* 电影相关片段 */}
            <VideosSection data={data} loading={loading} />
            {/* 相似电影 */}
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;