import React, { useEffect, useState } from "react";
import Card from "../Card";
import data from "../../data/data";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";
import { getAlbum } from "../../data/db";

const StyledSearch = styled.div`
  width: 54%;
  margin-left: 24%;
  padding-top: 1%;

  @media only screen and (max-width: 600px) {
    width: 60%;
    margin-left: 25%;
    padding-top: 2%;
  }

  @media only screen and (min-width: 752px) {
    width: 53%;
    margin-left: 32%;
    padding-top: 2%;
  }
`;

const StyledButton = styled.button`
  margin-left: 2%;
  display: flex;
  margin-top: 2%;
`;

const StyledSaveButton = styled.button`
  margin-left: 2%;
  display: flex;
  margin-top: 2%;
`;

const Home = () => {
  const [searchString, setSearchString] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState(null);
  const [editedData, setEditedData] = useState(data != null ? data : null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await getAlbum("http://localhost:4010/card/all")
      console.log("response", response)
      setData(response)
    }
    getData()
  }, [])

  console.log("data", data)

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
    const updatedData = editedData.map((card) => {
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

          <StyledButton onClick={handleModal}>
            <FontAwesomeIcon
              icon={faUpload}
              style={{ paddingRight: "10%", marginTop: "16%" }}
              
            />
            <a href="#test">Upload</a>
          </StyledButton>
          <StyledSaveButton>
            <FontAwesomeIcon
              icon={faUpload}
              style={{ paddingRight: "10%", marginTop: "16%" }}
            />
            Save
          </StyledSaveButton>
        </StyledSearch>

        {modal && <Modal />}
        
        {filteredAlbums?.length > 0 ? (
          filteredAlbums.map((pics) => (
            <Card
              pics={pics}
              key={pics.src}
              editedName={
                editedData?.find((card) => card.src === pics.src)?.name || pics.name
              }
              editedTag={
                editedData?.find((card) => card.src === pics.src)?.tag || pics.tag
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
          <div style={{ textAlign: "center" }}>
            No tags match "{searchString}"
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
