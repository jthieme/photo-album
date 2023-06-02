import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import data from "../../data/data";

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

const Card = ({ pics, key, editedName, editedTag, onNameChange, onTagChange }) => {
  const { id, name, src, tag, fav } = pics;

  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(fav);
  const [hasClickedEllipsis, setHasClickedEllipsis] = useState(false);

  const handleUpdateData = () => {
    const updatedData = data.data.albums.map((card) => {
      if (card.id === id && card.src == src) {
        return { ...card, fav: !isFavorited, name: editedName, tag: editedTag };
      }
      return card;
    });

    data.data.albums = updatedData;
    console.log("updatedData", updatedData);
  }

  const handleDoubleClick = () => {
    setIsDoubleClicked(true);
    setIsFavorited(!isFavorited);
    handleUpdateData()
  };

  const handleEllipsisClick = () => {
    setHasClickedEllipsis(!hasClickedEllipsis);
    handleUpdateData();
  }

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
              cursor: "pointer",
            }}
            onClick={handleEllipsisClick}
          >
            <FontAwesomeIcon icon={faEllipsis} fontSize={26} />
          </div>
          <img
            src={src}
            alt={"picture " + key}
            width={300}
            style={{ borderRadius: "4% 4% 0 0" }}
          />

          {hasClickedEllipsis ? (
            <div style={{ padding: "1%" }}>
              <input
                type="text"
                value={editedName}
                onChange={(e) => onNameChange(e.target.value)}
                className="text-sm"
                style={{ marginBottom: "-3%", padding: "0", paddingLeft: "1%"}}
              />
              <input
                type="text"
                value={editedTag}
                onChange={(e) => onTagChange(e.target.value)}
                className="text-xs text-blue-700"
                style={{padding: "0", paddingLeft: "1%"}}
              />
            </div>
          ) : (
            <div style={{ padding: "2%" }}>
              <div className="text-sm" style={{ marginBottom: "-3%" }}>
                {editedName}
              </div>
              <div className="text-xs text-blue-700">
                #{editedTag}
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
          )}
        </StyledSrc>
      </StyledContainer>
    </>
  );
};

export default Card;
