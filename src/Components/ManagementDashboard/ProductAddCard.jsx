import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import jwt_decode from "jwt-decode";
import Popup from "./../Popup/Popup";
import Popupsale from "./../Popup/PopupSale";

function ProductAddCard({ data }) {
  const [apiData, setApiData] = useState([]);
  const [deleteState, setDeleteState] = useState(null);
  const [showpopup, setShowpopup] = useState(false);
  const [showslaepopup, setShowSalepopup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [adjustedTotal, setAdjustedTotal] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);

  // Function to fetch data and update state
  const fetchData = () => {
    const apiEndpoint = "card-product-get";
    const apiUrl = process.env.REACT_APP_API_BASE_URL + apiEndpoint;
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status == "200") {
          console.log("response card", response.data.products);
          setApiData(response.data.products);
        } else {
          setApiData(response.data.products);
        }
      })
      .catch((error) => {
        setApiData();
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [data]);

  // Function to delete a product
  const DeleteToCart = (product_id) => {
    const apiEndpoint = `product-delete?Product_Id=${product_id}`;
    const apiUrl = process.env.REACT_APP_API_BASE_URL + apiEndpoint;

    axios
      .delete(apiUrl)
      .then((response) => {
        if (response.data.status == "200") {
          console.log("inside 200");
          fetchData();
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  const handleOpenPopUp = () => {
    if (apiData?.length > 0) {
      setShowpopup(true);
    }
  };
  const handleSaleOpenPopUp = () => {
    if (apiData?.length > 0) {
      setShowSalepopup(true);
    }
    // setShowSalepopup(true);
  };
  const handleClosePopUp = () => {
    setShowpopup(false);
  };
  const handleSaleClosePopUp = () => {
    setShowpopup(false);
  };

  //   value
  // Handle quantity for each product
  const handleIncrement = (index, Product_Id) => {
    console.log("index 111", index);
    const updatedApiData = [...apiData];
    updatedApiData[index].Product_Quantity += 1;

    setApiData(updatedApiData);

    const updatedQuantity = updatedApiData.find(
      (product) => product.Product_Id === Product_Id
    )?.Product_Quantity;

    const apiEndpoint = `product-update?Product_Id=${Product_Id}`;
    const apiUrl = process.env.REACT_APP_API_BASE_URL + apiEndpoint;

    axios
      .put(apiUrl, {
        Product_Quantity: updatedQuantity, // Pass the updated quantity here
      })
      .then((response) => {
        if (response.data.status == "200") {
          console.log("inside 200");
          fetchData();
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  const handleDecrement = (index, Product_Id) => {
    console.log("index 222", index);
    if (apiData[index].Product_Quantity > 1) {
      const updatedApiData = [...apiData];
      updatedApiData[index].Product_Quantity -= 1;

      setApiData(updatedApiData);

      const updatedQuantity = updatedApiData.find(
        (product) => product.Product_Id === Product_Id
      )?.Product_Quantity;

      // update Api hit
      const apiEndpoint = `product-update?Product_Id=${Product_Id}`;
      const apiUrl = process.env.REACT_APP_API_BASE_URL + apiEndpoint;

      axios
        .put(apiUrl, {
          Product_Quantity: updatedQuantity,
        })
        .then((response) => {
          if (response.data.status == "200") {
            console.log("inside 200");
            fetchData();
          }
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });
    }
  };

  //   total number of item
  const totalQuantity = apiData?.reduce(
    (total, dataItem) => total + dataItem.Product_Quantity,
    0
  );

  // sub total
  const totalValueForEachProduct = apiData?.map(
    (dataItem) => dataItem.Product_Price * dataItem.Product_Quantity
  );
  const grandTotal = totalValueForEachProduct?.reduce(
    (total, value) => total + value,
    0
  );
  useEffect(() => {
    setTotalPrice(grandTotal);
  }, [grandTotal]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    const number_percentage = event.target.value;
    const percentage = (grandTotal * number_percentage) / 100;
    const total_price = grandTotal - percentage;
    setAdjustedTotal(percentage);
    setTotalPrice(total_price);
  };

  return (
    <Fragment>
      {showslaepopup && (
        <Popupsale
          handleSaleClosePopUp={handleSaleClosePopUp}
          apiData={apiData}
          totalQuantity={totalQuantity}
          grandTotal={grandTotal}
          totalprice={totalprice}
        />
      )}

      {showpopup && (
        <Popup handleClosePopUp={handleClosePopUp} fetchData={fetchData} />
      )}
      {/* selected product */}
      <div className="selected_product_main_block">
        {/* selected product header */}
        <div className="selected_product_header_block">
          <div className="selected_product_header_content_block">PRODUCTS</div>
          <div className="selected_price_header_content_block">PRICE</div>
          <div className="selected_quantity_header_content_block">QUANTITY</div>
          <div className="selected_total_header_content_block">TOTAL</div>
        </div>
        {/* selected product container */}
        <div className="selected_contain_main_block">
          {/* selected content item block */}
          {apiData && apiData.length > 0 ? (
            apiData.map((dataItem, index) => (
              <div className="added_content_contener">
                <div className="cloose_block">
                  <div
                    className="close-icon-container"
                    onClick={() => DeleteToCart(dataItem.Product_Id)}
                  >
                    <CloseIcon
                      style={{
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    />
                  </div>
                </div>
                <div className="product_name">{dataItem.Product_Name}</div>
                <div className="price">{dataItem.Product_Price}</div>
                <div className="quantity">
                  <div
                    className="amount_sub"
                    onClick={() => handleDecrement(index, dataItem.Product_Id)}
                  >
                    -
                  </div>
                  <div className="count">{dataItem.Product_Quantity}</div>
                  <div
                    className="amount_puls"
                    onClick={() => handleIncrement(index, dataItem.Product_Id)}
                  >
                    +
                  </div>
                </div>
                <div className="total">
                  {dataItem.Product_Price * dataItem.Product_Quantity} INR
                </div>
              </div>
            ))
          ) : (
            <div className="empty_card_block">THERE ARE NO PRODUCTS</div>
          )}
        </div>
        {/* product_price_all_type_button_main */}
        <div className="product_price_all_type_button_main">
          {/* price_block_main_block */}
          <div className="price_block_main_block">
            <div className="price_sub_block">
              <div className="price_heading_block"> SubTotal</div>
              <div className="price_value_block">
                <div className="price_value_block_left">
                  {grandTotal}.00 EUR
                </div>
                <div className="price_value_block_right">
                  {totalQuantity} item
                </div>
              </div>
            </div>

            <div className="price_sub_block">
              <div className="price_heading_block"> VAT tax</div>
              <div className="price_value_block">
                <div className="price_value_block_left">N/A</div>
                <div className="price_value_block_right">EUR</div>
              </div>
            </div>

            <div className="price_sub_block">
              <div className="price_heading_block"> Discount</div>
              <div className="price_value_block">
                <div className="price_value_block_left">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      const validCharacters = /[0-9]/;
                      if (
                        !validCharacters.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete" &&
                        e.key !== "ArrowLeft" &&
                        e.key !== "ArrowRight"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "60%", background: "lightgray" }}
                  />
                </div>

                <div className="price_value_block_right">
                  {adjustedTotal} .00EUR
                </div>
              </div>
            </div>

            <div className="price_sub_block">
              <div
                className="price_heading_block"
                style={{ borderBottomLeftRadius: "10px" }}
              >
                {" "}
                Total
              </div>
              <div
                className="price_value_block"
                style={{ borderBottomRightRadius: "10px" }}
              >
                <div
                  className="price_value_block_left"
                  style={{
                    color: "green",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  {totalprice} .00EUR
                </div>
              </div>
            </div>
          </div>
          {/* button_main_block */}
          <div className="button_main_block">
            <div className="cancel_button">
              <button
                onClick={() => handleOpenPopUp()}
                style={{ cursor: "pointer" }}
              >
                CANCEL SALE
              </button>
            </div>
            <div className="process_button">
              <button
                onClick={() => handleSaleOpenPopUp()}
                style={{ cursor: "pointer" }}
              >
                PROCESS SALE
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductAddCard;
