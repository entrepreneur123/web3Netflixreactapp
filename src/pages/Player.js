import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Player = () => {
  const { state: currentlyPLaying } = useLocation();
  return (
    <>
      <div className="playerPage">
        <video autoPlay controls className="videoPlayer">
          <source src={currentlyPLaying} type="video/mp4"></source>
        </video>
        <div className="backHome">
          <Link to="/">
            <Icon
              className="backButton"
              fill="rgba(255,255,255,0.25)"
              size={60}
              svg="arrowCircleLeft"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Player;
