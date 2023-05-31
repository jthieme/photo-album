import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import data from "../../data/data";

const Card = ({ pics, key }) => {
  const { id, name, src, tag, fav } = pics;

  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(fav);

  const StyledSrc = styled.div`
    border: 1px solid black;
    border-radius: 15px;
    maxwidth: 30%;
    position: relative;
  `;

  const StyledContainer = styled.div`
    display: inline-flex;
    padding: 2%;

    @media only screen and (max-width: 600px) {
      padding-left: 12%;
    }
  `;

  const handleDoubleClick = () => {
    setIsDoubleClicked(true);
    setIsFavorited(!isFavorited);

    const updatedData = data.data.albums.map((card) => {
      if (card.id === id) {
        return { ...card, fav: !isFavorited };
      }
      return card;
    });

    data.data.albums = updatedData;
    console.log("updatedData", updatedData);
  };

  return (
    <>
      <StyledContainer>
        <StyledSrc
          key={key}
          className="u-shadow-xl"
          onDoubleClick={handleDoubleClick}
        >
          <div
            style={{
              marginLeft: "88%",
              color: "purple",
              marginBottom: "-10.8%",
              position: "absolute",
              zIndex: 1,
            }}
            onClick={() => console.log("Edit")}
          >
            <FontAwesomeIcon icon={faEllipsis} fontSize={26} />
          </div>
          <img
            src={src}
            alt={"picture " + key}
            width={300}
            style={{ borderRadius: "4% 4% 0 0" }}
          />

          <div style={{ padding: "2%" }}>
            <div className="text-sm" style={{ marginBottom: "-3%" }}>
              {name}
            </div>
            <div className="text-xs text-blue-700">
              #{tag}
              {isFavorited && (
                <span
                  className="text-sm text-red-700"
                  style={{ marginLeft: "90%" }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </span>
              )}
            </div>
          </div>
        </StyledSrc>
      </StyledContainer>
    </>
  );
};

export default Card;
