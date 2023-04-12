import React, { useState } from "react";
import Card from "../Card";
import data from "../../data/data";
import styled from "styled-components";

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

const Home = () => {
  const [searchString, setSearchString] = useState("");

  return (
    <>
      <div style={{ backgroundColor: "#e1e1e1" }}>
        <StyledSearch class="row level">
          <div class="col-xs-9 level-item">
            <input
              type="search"
              placeholder="Search by #"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
        </StyledSearch>
        {data.data.albums
          .filter((card) => {
            if (searchString === "") {
              return card;
            } else if (
              card.tag.toLowerCase().includes(searchString.toLowerCase())
            ) {
              return card;
            }
          })
          .map((pics) => {
            return <Card pics={pics} key={pics.id} />
          })}
      </div>
    </>
  );
};

export default Home;
