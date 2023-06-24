import React from "react";
import { FaQq, FaWeixin, FaWeibo, FaTiktok } from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          {/* 电影世界如此精彩， 梦想和现实在其中交错， 影片中的情感如此真实，
          让我们沉浸在其中乐陶陶。 岁月如歌，电影永存， 珍藏经典，重温情感，
          时光荏苒，影迷不变， 热爱电影，心意相传。 让我们一起走进电影的世界，
          感受每一个瞬间的震撼和感动， 在这个充满惊喜和欢笑的世界里，
          我们发现了无限可能和希望。 让我们一起分享这份热爱，
          在电影中找到归属和感动， 让这份激情和热爱，
          在每一个电影爱好者的心中永存。 */}
          <span>
            The movie world is so wonderful, Where dreams and reality intersect,
            The emotions in the film are so real, Let's immerse ourselves in it.
          </span>
          <span>
            Years like songs, movies forever, Treasure classics, relive
            emotions, Time flies, fans remain the same, Love the movie, the
            heart.
          </span>
          <span>
            Let's go into the movie world together, Feel the shock and touch of
            every moment, In a world full of surprises and laughs, We found
            possibilities and hope.{" "}
          </span>
          <span>
            {" "}
            Let's share this love, Finding belonging and being moved in movies,
            Let this passion and love, In the heart of every movie lover
            forever.
          </span>
        </div>
        <div className="socialIcons">
          <span className="icon">
            <FaQq />
          </span>
          <span className="icon">
            <FaWeixin />
          </span>
          <span className="icon">
            <FaWeibo />
          </span>
          <span className="icon">
            <FaTiktok />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
