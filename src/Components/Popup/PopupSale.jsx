import React, { useEffect, useState } from "react";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import axios from "axios";
import "./PopupStyle.css";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";

function Popup(props) {
  const { handleSaleClosePopUp } = props;
  const { apiData } = props;
  const { totalQuantity } = props;
  const { grandTotal } = props;
  const { totalprice } = props;

  const [showslaepopup, setShowSalepopup] = useState(true);
  // const [showblock, setShowBlock] = useState(true);
  console.log("apiData", apiData);

  function togglePopupVisibility() {
    setShowSalepopup(false);
    handleSaleClosePopUp();
  }
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateCurrentDateTime = () => {
      const now = new Date();
      const formattedDateTime = `Date ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCurrentDateTime(formattedDateTime);
    };

    updateCurrentDateTime();

    const timer = setInterval(updateCurrentDateTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {showslaepopup && (
        <section className="popup_form_main_block" id="popup_hide_id">
          <div className="popup_sale_sub_block">
            <div className="popup_sale_card_banner_block">
              <div className="popup_header_block">
                <h1>Receipt</h1>
              </div>
              <div className="popup_content_header_main_block">
                <div className="sale_no_block">Sale No ... 001101</div>
                <div className="date_time_block">{currentDateTime}</div>
                <div className="product_header_popup">
                  <div className="sr_no">#</div>
                  <div className="product_header_content">Product</div>
                  <div className="Quantity_header_content">Quantity</div>
                  <div
                    className="SubTotal_header_content"
                    style={{ paddingLeft: "10px" }}
                  >
                    SubTotal
                  </div>
                </div>

                <div className="sale_popup_content_main_block">
                  {/* block content */}
                  {apiData &&
                    apiData.length > 0 &&
                    apiData.map((dataItem, index) => (
                      <div className="sale_popup_content_sub_block" key={index}>
                        <div className="sr_no">{index + 1}</div>
                        <div className="product_header_content">
                          {dataItem.Product_Name}
                        </div>
                        <div className="Quantity_header_content">
                          {dataItem.Product_Quantity}
                        </div>
                        <div className="SubTotal_header_content">
                          {dataItem.Product_Price * dataItem.Product_Quantity}{" "}
                          INR
                        </div>
                      </div>
                    ))}
                </div>

                {/* total Amount content */}
                <div className="sale_amount_main_block">
                  <div className="sale_amount_heading_block"> Total items</div>
                  <div className="sale_amount_quantity_heading_block">
                    {" "}
                    {totalQuantity} Total
                  </div>
                  <div className="sale_amount_price_heading_block">
                    {" "}
                    {grandTotal} INR
                  </div>
                </div>

                <div className="sale_amount_main_block">
                  <div className="sale_amount_heading_block"> </div>
                  <div className="sale_amount_quantity_heading_block"> VAT</div>
                  <div className="sale_amount_price_heading_block"> 21</div>
                </div>

                <div className="sale_amount_main_block">
                  <div className="sale_amount_heading_block"> Grand items</div>
                  <div className="sale_amount_quantity_heading_block"> </div>
                  <div className="sale_amount_price_heading_block">
                    {" "}
                    {totalprice} INR
                  </div>
                </div>

                <div className="sale_button_block">
                  <button type="submit" onClick={() => togglePopupVisibility()}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Popup;
