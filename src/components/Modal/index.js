import axios from "axios";
import React, { useEffect, useState } from "react";
import { addCard } from "../../data/db";

const Modal = () => {
  document.addEventListener("keyup", function (e) {
    if (e.key === "Escape") {
      const modals = document.querySelectorAll(".modal-overlay");
      for (const modal of modals) {
        modal.click();
      }
    }
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState();
  const [tag, setTag] = useState();
  const [fav, setFav] = useState(false);
  const [newPhotoInfo, setNewPhotoInfo] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        // event.target.result contains the data URL of the selected image
        setSelectedImage(event.target.result);
      };

      reader.readAsDataURL(file); // Read the selected file as a data URL
    }
  };

  const handleSubmit = () => {
    const photo = {
      src: selectedImage,
      name: name,
      tag: tag,
      fav: fav,
    };
    setNewPhotoInfo((prev) => ({
      ...prev,
      ...photo,
    }));
    addNewCard();
  };

  const addNewCard = async () => {
    if (newPhotoInfo != {}) {
      // post to API
      // const headers = {
      //   "Content-Type": "application/json",
      // };
      // await axios
      //   .post("http://localhost:4010/card/add", newPhotoInfo, { headers })
      //   .then(function (response) {
      //     console.log(response);
      //   });
      await addCard("http://localhost:4010/card/add", newPhotoInfo)
    } else {
      console.log("newPhotoInfo", newPhotoInfo);
    }
  };

  return (
    <div className="modal" id="test">
      <a
        href="#searchModalDialog"
        className="modal-overlay close-btn"
        aria-label="Close"
      ></a>
      <div className="modal-content" role="document">
        <div className="modal-header">
          <a href="#components" className="u-pull-right" aria-label="Close">
            <span className="icon">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="times"
                className="svg-inline--fa fa-times fa-w-11 fa-wrapper"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 352 512"
              >
                <path
                  fill="currentColor"
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                ></path>
              </svg>
            </span>
          </a>
          <div className="modal-title">Add a Photo</div>
        </div>
        <div className="modal-body">
          <div className="r">
            <h5 className="font-alt font-light u-text-center">
              Select a photo to add
            </h5>
          </div>
          <div className="space"></div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div
            className="tile tile--center py-1 px-2 my-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.06) 0px 3px 6px, rgba(0, 0, 0, 0.03) 0px 3px 6px",
            }}
          >
            <div className="tile__container">
              <label>Name</label>
              <input onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div
            className="tile tile--center py-1 px-2 my-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.06) 0px 3px 6px, rgba(0, 0, 0, 0.03) 0px 3px 6px",
            }}
          >
            <div className="tile__container">
              <label>Tag</label>
              <input onChange={(e) => setTag(`#${e.target.value}`)} />
            </div>
          </div>
          <div
            className="tile tile--center py-1 px-2 my-1"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.06) 0px 3px 6px, rgba(0, 0, 0, 0.03) 0px 3px 6px",
            }}
          >
            <div className="tile__container">
              <label>Favorite</label>
              <input type="checkbox" onClick={() => setFav(!fav)} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="form-section u-text-right">
            <a href="#components">
              <button className="btn btn--sm u-inline-block">Cancel</button>
            </a>
            <a href="#components">
              <button
                className="btn-info btn--sm u-inline-block"
                onClick={handleSubmit}
              >
                Confirm
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;