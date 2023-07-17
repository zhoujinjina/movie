import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({mediaType,id}) => {
//获取相似的电影
const { data, loading, error } = useFetch(`/${mediaType}/${id}/recommendations?language=zh-CN`);

const title = "猜你喜欢"

return (
    <Carousel
        title={title}
        data={data?.results}
        loading={loading}
        endpoint={mediaType}
    />
);
};

export default Recommendation;
