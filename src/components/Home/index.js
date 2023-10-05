import React, { useEffect, useState } from "react";
import Card from "../Card";
import data from "../../data/data";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";
import { getAlbum } from "../../data/db";
import { BASE_URL } from "../../data/constants";

const StyledTopBar = styled.div`
  background-color: #e1e1e1;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-weight: bold;

  &:hover {
    color: #007bff; /* Change to your desired hover color */
  }

  &.btn {
    margin-bottom: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  top: 0;
  .button-icon {
    margin-right: 5px;
  }
`;

const SearchBoxContainer = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const Home = () => {
  const [searchString, setSearchString] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState(null);
  const [editedData, setEditedData] = useState(data != null ? data : null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
  
    const getData = async () => {
      const response = await getAlbum(`${BASE_URL}/card/all`);
      console.log("response", response);
      if (isMounted) {
        setData(response);
      }
    };
  
    getData();
  
    return () => {
      isMounted = false;
    };
  }, []);
  

  const filteredAlbums = data?.filter((card) => {
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

  const handleUpdateData = (src, updatedName, updatedTag) => {
    const updatedData = data.map((card) => {
      if (card.src === src) {
        return { ...card, name: updatedName, tag: updatedTag };
      }
      return card;
    });

    setEditedData(updatedData);
    console.log("updatedData", updatedData);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <StyledTopBar>
        <SearchBoxContainer>
          <input
            type="search"
            placeholder="Search by #"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </SearchBoxContainer>

        <ButtonContainer>
          <StyledButton onClick={handleModal} className="btn btn-secondary btn-sm">
            <FontAwesomeIcon icon={faUpload} />
            <a href="#test">Upload</a>
          </StyledButton>
        </ButtonContainer>

        <ButtonContainer>
          <StyledButton  className="btn btn-secondary btn-sm">
            <FontAwesomeIcon icon={faUpload} />
            <span>Save</span>
          </StyledButton>
        </ButtonContainer>
      </StyledTopBar>

      <div style={{ backgroundColor: "#e1e1e1" }}>
        {modal && <Modal BASE_URL={BASE_URL} />}

        {filteredAlbums?.length > 0 ? (
          filteredAlbums.map((pics) => (
            <Card
              pics={pics}
              key={pics.src}
              editedName={
                data?.find((card) => card.src === pics.src)?.name ||
                pics.name
              }
              editedTag={
                data?.find((card) => card.src === pics.src)?.tag ||
                pics.tag
              }
              onNameChange={(updatedName) =>
                handleUpdateData(pics.src, updatedName, pics.tag)
              }
              onTagChange={(updatedTag) =>
                handleUpdateData(pics.src, pics.name, updatedTag)
              }
            />
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No tags match "{searchString}"
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
