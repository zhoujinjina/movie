import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    //获取相似的电影
    console.log()
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar?language=zh-cn`);

    const title = mediaType === "tv" ? "相似电视剧" : "相似电影";

    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Similar;