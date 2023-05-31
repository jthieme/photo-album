import React, { useState } from "react";
import Card from "../Card";
import data from "../../data/data";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const StyledSearch = styled.div`
  width: 30%;
  margin-left: 40%;
  padding-top: 1%;

  @media only screen and (max-width: 600px) {
    width: 50%;
    margin-left: 27%;
    padding-top: 2%;
  }
`;

const StyledButton = styled.button`
  margin-left: 2%;
  display: flex;
  margin-top: 3.5%;
`;

const StyledSaveButton = styled.button`
  margin-left: 2%;
  display: flex;
  margin-top: 3.5%;
`;

const Home = () => {
  const [searchString, setSearchString] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredAlbums = data.data.albums.filter((card) => {
    const lowerTag = card.tag.toLowerCase();
    const lowerSearch = searchString.toLowerCase();
    // if the search is empty
    if (searchString === "") {
      return true;
    // if the tag matches the search
    } else if (lowerTag.includes(lowerSearch)) {
      return true;
    }
    return false;
  });

  return (
    <>
      <div style={{ backgroundColor: "#e1e1e1" }}>
        <StyledSearch className="row level">
          <div className="col-xs-9 level-item">
            <input
              type="search"
              placeholder="Search by #"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            id="select-img"
            style={{ display: "none" }}
            onChange={(e) => {
              setSelectedImage(e.target.files[0]);
              console.log("selectedImage: ", selectedImage);
            }}
          />
          <StyledButton
            htmlFor="select-img"
            onClick={() => document.getElementById("select-img")?.click()}
          >
            <FontAwesomeIcon
              icon={faUpload}
              style={{ paddingRight: "10%", marginTop: "16%" }}
            />
            Upload
          </StyledButton>
          {/* <StyledSaveButton>
            <FontAwesomeIcon
                icon={faUpload}
                style={{ paddingRight: "10%", marginTop: "16%" }}
              />
            Save
          </StyledSaveButton> */}
        </StyledSearch>

        {filteredAlbums.length > 0 ? (
          filteredAlbums.map((pics) => (
            <Card pics={pics} key={pics.id} />
          ))
        ) : (
          <div style={{textAlign: "center"}}>No tags match "{searchString}"</div>
        )}
      </div>
    </>
  );
};

export default Home;
