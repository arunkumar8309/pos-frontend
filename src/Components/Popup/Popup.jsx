import React, { useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import axios from "axios";
import "./PopupStyle.css";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

function Popup(props) {
  const { handleClosePopUp } = props;
  const { fetchData } = props;
  const [showForm, setShowForm] = useState(true);
  const [showblock, setShowBlock] = useState(true);

  function togglePopupVisibility() {
    setShowForm(false);
    handleClosePopUp();

  }

  // Function to delete a product
  const DeleteAllToCart = () => {
    const apiEndpoint = `product-delete`;
    const apiUrl = process.env.REACT_APP_API_BASE_URL + apiEndpoint;

    axios
      .delete(apiUrl)
      .then((response) => {
        if (response.data.status == "200") {
          console.log("inside 200");
          fetchData();
          setShowBlock(false);
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };
  return (
    <>
      {showForm && (
        <section className="popup_form_main_block" id="popup_hide_id">
          <div className="popup_form_sub_block">
            <div className="form_block_card">
              {showblock && (
                <div className="popup_card_banner_block">
                  <ErrorOutlineIcon
                    style={{ color: "orange", fontSize: "50px" }}
                  />
                  <h1>Are you sure ?</h1>
                  <p style={{ padding: "2px 10px", fontSize: "12px" }}>
                    You will not be able to recover the data later !
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <button
                      type="submit"
                      onClick={() => togglePopupVisibility()}
                      style={{
                        backgroundColor: "gray",
                        borderColor: "gray",
                        margin: "0px 10px",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={() => DeleteAllToCart()}
                      style={{
                        backgroundColor: "red",
                        borderColor: "red",
                        margin: "0px 10px",
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              )}

              {!showblock && (
                <div className="popup_card_banner_block">
                  <TaskAltIcon style={{ color: "green", fontSize: "50px" }} />
                  <h1>Erased!</h1>
                  <p style={{ padding: "2px 10px", fontSize: "12px" }}>
                    Data deleted
                  </p>

                  <button
                    type="submit"
                    onClick={() => togglePopupVisibility()}
                    style={{
                      backgroundColor: "lightblue",
                      borderColor: "lightblue",
                      margin: "0px 10px",
                    }}
                  >
                    Ok
                  </button>
                </div>
              )}

            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Popup;
