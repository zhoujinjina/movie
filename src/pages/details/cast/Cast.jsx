import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({data,loading}) => {
    const {url}=useSelector(state=>state.home)
console.log(url)
 console.log(data)
    return (
       <div style={{height:'100px',width:'100px',borderRadius:"50%"}}>
        <img src={url.profile+data?.[0].profile_path} alt="" />
       </div>
    );
};

export default Cast;
