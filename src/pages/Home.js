import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../images/Netflix";
import {
  ConnectButton,
  Icon,
  TabList,
  Tab,
  Button,
  Modal,
  useNotification,
} from "web3uikit";
import { movies } from "../helpers/Library";
import { useMoralis } from "react-moralis";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState();
  const [myMovies, setMyMovies] = useState();
  const { isAuthenticated, Moralis, account } = useMoralis();

  useEffect(() => {
    async function fetchMyList() {
      const theList = await Moralis.Cloud.run("getMyList", {
        address: account,
      });
      const filteredA = movies.filter(function (e) {
        return theList.indexOf(e.Name) > -1;
      });
      setMyMovies(filterA);
    }
    fetchMyList();
  }, [account]); //it runs every time account changes

  const dispatch = useNotification();
  const handleNewNotification = () => {
    dispatch({
      type: "error",
      message: "please connect your crypto wallet",
      title: "Not Authenticated",
      position: "TopL",
    });

    const handleAddNotification = () => {
      dispatch({
        type: "success",
        message: "Movie added to List",
        title: "success",
        position: "topL",
      });
    };
  };

  return (
    <div>
      <div className="logo">
        <Logo />
      </div>
      <div className="connect">
        <Icon fill="#ffffff" size={24} svg="bell" />
        <ConnectButton />
      </div>
      <div className="topBanner">
        <TabList defaultActiveKey={1} tabStyle="bar">
          <Tab tabKey={1} tabName={"Movies"}>
            <div className="scene">
              <img src={movies[0].Scene} className="sceneImg"></img>
              <img className="sceneLogo" src={movies[0].Logo}></img>
              <p className="sceneDesc">{movies[0].Description}</p>
              <div className="playButton">
                <Button
                  icon="chevronRightXZ"
                  text="Play"
                  theme="secondary"
                  type="button"
                />
                <Button
                  icon="plus"
                  text="Add to My List"
                  theme="translucent"
                  type="button"
                />
              </div>
            </div>
            <div className="title">Movies</div>

            <div className="thumbs">
              {movies &&
                movies.map((e) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img
                      src={e.Thumnbnail}
                      className="thumbnail"
                      onClick={() => {
                        setSelectedFilm(e);
                        setVisible(true);
                      }}
                    />
                  );
                })}
            </div>
          </Tab>
          <Tab tabKey={2} tabName={"Series"} isDisabled={true}></Tab>
          <Tab tabKey={3} tabName={"MyList"}>
            <div className="ownListContent">
              <div className="title">Your Library</div>
              {myMovies && isAuthenticated ? (
                <>
                  <div className="ownThumbs">
                    {myMovies.map((e) => {
                      return (
                        // eslint-disable-next-line jsx-a11y/alt-text
                        <img
                          src={e.Thumnbnail}
                          className="thumbnail"
                          onClick={() => {
                            setSelectedFilm(e);
                            setVisible(true);
                          }}
                        />
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="ownThumbs">
                    you need to authenticate to view your own list
                  </div>
                </>
              )}
            </div>
          </Tab>
        </TabList>
        {selectedFilm && (
          <div className="modal">
            <Modal
              onCloseButtonPressed={() => setVisible(false)}
              isvisible={visible}
              hasFooter={false}
              width="1000px"
            >
              <div className="modalContent">
                <img src={selectedFilm.Scene} className="modalImg"></img>
                <img className="ModalLogo" src={selectedFilm.Logo}></img>
                <div className="modalPlayButton">
                  {isAuthenticated ? (
                    <>
                      <Link to="/player" state={selectedFilm.Movie}>
                        <Button
                          icon="chevronRightXZ"
                          text="Play"
                          theme="secondary"
                          type="button"
                        />
                      </Link>
                      <Button
                        icon="plus"
                        text="Add to My List"
                        theme="translucent"
                        type="button"
                      />
                    </>
                  ) : (
                    <>
                      <>
                        <Button
                          icon="chevronRightXZ"
                          text="Play"
                          theme="secondary"
                          type="button"
                          onClick={handleNewNotification}
                        />
                      </>
                      <>
                        <Button
                          icon="plus"
                          text="Add to My List"
                          theme="translucent"
                          type="button"
                          onClick={handleNewNotification}
                        />
                      </>
                    </>
                  )}
                </div>
                <div className="movieInfo">
                  <div className="description">
                    <div className="details">
                      <span>{selectedFilm.Year}</span>
                      <span>{selectedFilm.Duration}</span>
                    </div>
                    {selectedFilm.Description}
                  </div>
                  <div className="detailsInfo">
                    Genre:
                    <span className="deets">{selectedFilm.Genre}</span>
                    <br />
                    Actors:
                    <span className="deets">{selectedFilm.Actors}</span>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
