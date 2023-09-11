import React, { Fragment, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import background from "./../../Assets/Images/apple.jpg";
import jwt_decode from "jwt-decode";
import axios from "axios";

function ProductCard({ updateData }) {
  // API hit

  const [apiData, setApiData] = useState([]);
  const [categoryData, setcategoryData] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const HeaderCategory = (value) => {
    console.log(`Clicked with value: ${value}`);
    setcategoryData(value);
  };
  const Search = (value) => {
    setSearchInput(value);
  };

  // Define the API endpoint
  const apiEndpoint = `api/product-master-data?Product_Category=${categoryData}&Product_Name=${searchInput}`;
  const apiUrl = process.env.REACT_APP_API_BASE_URL + apiEndpoint;
  useEffect(() => {
    // Make the API call using Axios
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("response", response.data.result);
        // Handle the successful response
        setApiData(response.data.result);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, [apiUrl]);

  const AddToCart = (product_id) => {
    const token_value = localStorage.getItem("token");
    var decoded = jwt_decode(token_value);

    if (token_value) {
      const apiEndpoint = "product-add-to-cart";
      const apiUrl = process.env.REACT_APP_API_BASE_URL + apiEndpoint;

      axios
        .post(apiUrl, {
          Email: decoded.email,
          Product_Id: product_id,
        })
        .then((response) => {
          // Handle the API response
          if (response.data.status == "200") {
            updateData(product_id);
            console.log("inside 200");
          }
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });
    }
  };

  return (
    <Fragment>
      {/* product card block */}
      <div className="product_main_block">
        <div className="header_block">
          <div
            className={`header_content_block category-block ${
              categoryData === "" ? "matched-category" : "unmatched-category"
            }`}
          >
            <HomeIcon fontSize="10px" onClick={() => HeaderCategory("")} />
          </div>
          <div
            className={`header_content_block category-block ${
              categoryData === "COMPUTER"
                ? "matched-category"
                : "unmatched-category"
            }`}
            onClick={() => HeaderCategory("COMPUTER")}
          >
            COMPUTER
          </div>
          <div
            className={`header_content_block category-block ${
              categoryData === "FRUITS"
                ? "matched-category"
                : "unmatched-category"
            }`}
            onClick={() => HeaderCategory("FRUITS")}
          >
            FRUITS
          </div>
          <div
            className={`header_content_block category-block ${
              categoryData === "CLOTHING"
                ? "matched-category"
                : "unmatched-category"
            }`}
            onClick={() => HeaderCategory("CLOTHING")}
          >
            CLOTHING
          </div>
          <div
            className={`header_content_block category-block ${
              categoryData === "SERVICES"
                ? "matched-category"
                : "unmatched-category"
            }`}
            onClick={() => HeaderCategory("SERVICES")}
          >
            SERVICES
          </div>
          <div
            className={`header_content_block category-block ${
              categoryData === "BURZER"
                ? "matched-category"
                : "unmatched-category"
            }`}
            onClick={() => HeaderCategory("BURZER")}
          >
            BURZER
          </div>
          <div
            className={`header_content_block category-block ${
              categoryData === "PIZZA"
                ? "matched-category"
                : "unmatched-category"
            }`}
            onClick={() => HeaderCategory("PIZZA")}
          >
            PIZZA
          </div>
        </div>
        {/* border radies block */}
        <div
          style={{
            borderBottom: "4px solid #DEDFE4",
            borderRadius: "10px",
            marginTop: "7px",
          }}
        ></div>
        {/* search block */}

        <div className="search_main_block">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchIcon
            onClick={() => Search(searchInput)}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* card block */}
        <div className="card_main_block">
          {/* card data loop */}

          {apiData && apiData.length > 0 ? (
            apiData.map((dataItem, index) => (
              <div
                key={index}
                className="card_block"
                onClick={() => AddToCart(dataItem.Product_Id)}
                style={{
                  backgroundImage: `url(${dataItem.Product_Img})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "90% 90%",
                  backgroundPosition: "center",
                }}
              >
                <h2>{dataItem.Product_Name}</h2>
                <h4>{dataItem.Product_Price}</h4>
                <p>{dataItem.Product_Des}</p>
              </div>
            ))
          ) : (
            <div
              style={{
                width: "100%",
                height: "100px",
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "70%",
                  height: "100px",
                  background: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                <h1> No Product Available !</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default ProductCard;
